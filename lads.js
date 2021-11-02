const express = require('express');
const app = require('express')();
const path = require('path');
const bodyparser = require('body-parser');
var router = require('express').Router();
var cltController = require('./clt.controller');

const cdir = process.env.CL_REST_STATE_DIR ? process.env.CL_REST_STATE_DIR : __dirname;
console.log("cl-rest state dir: " + cdir);
process.chdir(cdir);

let lnpath = process.env.LN_PATH;
global.ln = require('./clt-client')(lnpath);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, filePath, macaroon, encodingtype"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


router.get('/getInfo', cltController.getinfo);
router.get('/listLiquidityNodes', cltController.listLiquidityNodes);
router.post('/connectPeer', cltController.connectPeer);
router.post('/fundChannel', cltController.fundChannel);
router.post('/funderUpdate', cltController.funderUpdate);

app.use('/api', router);
app.use('', express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

console.warn('--- Starting the cl-rest server ---');
server = require('http').createServer( app );

server.listen('3030', function() {
    console.warn('--- cl-rest api server is ready and listening on port: 3030 ---');
})

