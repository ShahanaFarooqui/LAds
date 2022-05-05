'use strict';
const path = require('path');
const net = require('net');
const fs = require('fs');
const JSONParser = require('jsonparse');
const { EventEmitter } = require('events');

const defaultRpcPath = path.join(require('os').homedir(), '.lightning')
    , fStat = (...p) => fs.statSync(path.join(...p))
    , fExists = (...p) => fs.existsSync(path.join(...p));


class LightningClient extends EventEmitter {
    constructor(rpcPath=defaultRpcPath) {
        console.log("rpcPath -> " + rpcPath);

        if (!path.isAbsolute(rpcPath)) {
            throw new Error('The rpcPath must be an absolute path');
        }
        
        if (!fExists(rpcPath) || !fStat(rpcPath).isSocket()){
            if (fExists(rpcPath, 'lightning-rpc')) {
                rpcPath = path.join(rpcPath, 'lightning-rpc');
            } else if (fExists(rpcPath, 'bitcoin', 'lightning-rpc')) {
                console.error(`WARN: ${rpcPath}/lightning-rpc is missing, using the bitcoin mainnet subdirectory at ${rpcPath}/bitcoin instead.`)
                rpcPath = path.join(rpcPath, 'bitcoin', 'lightning-rpc')
            } else if (fExists(rpcPath, 'testnet', 'lightning-rpc')) {
                console.error(`WARN: ${rpcPath}/lightning-rpc is missing, using the bitcoin testnet subdirectory at ${rpcPath}/testnet instead.`)
                rpcPath = path.join(rpcPath, 'testnet', 'lightning-rpc')
            } else if (fExists(rpcPath, 'signet', 'lightning-rpc')) {
                console.error(`WARN: ${rpcPath}/lightning-rpc is missing, using the bitcoin signet subdirectory at ${rpcPath}/signet instead.`)
                rpcPath = path.join(rpcPath, 'signet', 'lightning-rpc')
            }
        }

        console.log(`Connecting to ${rpcPath}`);

        super();
        this.rpcPath = rpcPath;
        this.reconnectWait = 0.5;
        this.reconnectTimeout = null;
        this.reqcount = 0;
        this.parser = new JSONParser;

        const _self = this;

        this.client = net.createConnection(rpcPath);
        this.clientConnectionPromise = new Promise(resolve => {
            _self.client.on('connect', () => {
                console.log(`Lightning client connected`);
                _self.reconnectWait = 1;
                resolve();
            });

            _self.client.on('end', () => {
                console.error('Lightning client connection closed, reconnecting');
                _self.increaseWaitTime();
                _self.reconnect();
            });

            _self.client.on('error', error => {
                console.error(`Lightning client connection error`, error);
                _self.emit('error', error);
                _self.increaseWaitTime();
                _self.reconnect();
            });
        });

        this.client.on('data', data => _self._handledata(data));

        this.parser.onValue = function(val) {
            if (this.stack.length) return; // top-level objects only
            // console.log('#%d <-- %O', val.id, val.error || val.result);
            _self.emit('res:' + val.id, val);
        }
    }

    increaseWaitTime() {
        if (this.reconnectWait >= 16) {
            this.reconnectWait = 16;
        } else {
            this.reconnectWait *= 2;
        }
    }

    reconnect() {
        const _self = this;

        if (this.reconnectTimeout) {
            return;
        }

        this.reconnectTimeout = setTimeout(() => {
            console.log('Trying to reconnect...');

            _self.client.connect(_self.rpcPath);
            _self.reconnectTimeout = null;
        }, this.reconnectWait * 1000);
    }

    call(method, args = []) {
        const _self = this;

        const callInt = ++this.reqcount;
        const sendObj = {
            jsonrpc: "2.0",
            method,
            params: args,
            id: ''+callInt
        };

        return this.clientConnectionPromise
            .then(() => new Promise((resolve, reject) => {
                _self.client.write(JSON.stringify(sendObj));
                this.once('res:' + callInt, res => res.error == null
                  ? resolve(res.result)
                  : reject(res.error)
                );
            }));
    }

    _handledata(data) {
        this.parser.write(data);
    }
}

const protify = s => s.replace(/-([a-z])/g, m => m[1].toUpperCase());

["getinfo", "listnodes", "connect", "fundchannel", "funderupdate"].forEach(k => {
    LightningClient.prototype[protify(k)] = function (...args) {
        return this.call(k, args);
    };
});

module.exports = rpcPath => new LightningClient(rpcPath);
module.exports.LightningClient = LightningClient;
