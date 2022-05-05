export const getinfo = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);
    ln.getinfo().then(data => {
        console.log('getinfo success');
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        console.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

export const listLiquidityNodes = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);
    ln.listnodes().then(data => {
        console.log('listLiquidityNodes success');
        const filteredLQNodes = data.nodes.filter(node => {
            if (node.hasOwnProperty('option_will_fund')) {
                node.option_will_fund.lease_fee_base_msat = node.option_will_fund.lease_fee_base_msat.slice(0, -4);
                node.option_will_fund.channel_fee_max_base_msat = node.option_will_fund.channel_fee_max_base_msat.slice(0, -4);
                return node;
            }
        });
        console.log(filteredLQNodes);
        res.status(200).json(filteredLQNodes);
    }).catch(err => {
        console.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

export const fundChannel = (req,res) => {
    console.log('fundchannel initiated...');
    function connFailed(err) { throw err }
    ln.on('error', connFailed);
    var id = req.body.id;
    var compact_lease = req.body.compactLease;
    var request_amount = req.body.requestAmount + 'sat';
    var feerate = (req.body.feeRate) ? req.body.feeRate : null;
    var amount = (req.body.amount) ? (req.body.amount + 'sat') : 0;
    ln.fundchannel(id, amount, feerate, null, null, null, null, null, request_amount, compact_lease).then(data => {
        console.log('fundchannel success');
        console.log(data);
        res.status(201).json(data);
    }).catch(err => {
        console.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

export const funderUpdate = (req,res) => {
    console.log('funderupdate initiated...');
    function connFailed(err) { throw err }
    ln.on('error', connFailed);
    var policy = req.body.policy ? req.body.policy : null;
    var policy_mod = req.body.policyMod ? req.body.policyMod : null;
    var lease_fee_base_msat = req.body.leaseFeeBaseMsat ? req.body.leaseFeeBaseMsat : null;
    var lease_fee_basis = req.body.leaseFeeBasis ? req.body.leaseFeeBasis : null;
    var channel_fee_max_base_msat = req.body.channelFeeMaxBaseMsat ? req.body.channelFeeMaxBaseMsat : null;
    var channel_fee_max_proportional_thousandths = req.body.channelFeeMaxProportional ? req.body.channelFeeMaxProportional : null;
    ln.funderupdate(policy, policy_mod, null, null, null, null, null, null, null, null, lease_fee_base_msat, lease_fee_basis, null, channel_fee_max_base_msat, channel_fee_max_proportional_thousandths).then(data => {
        console.log('funderupdate success');
        data.min_their_funding_msat = data.min_their_funding_msat ? data.min_their_funding_msat.slice(0, -4) : null;
        data.max_their_funding_msat = data.max_their_funding_msat ? data.max_their_funding_msat.slice(0, -4) : null;
        data.per_channel_min_msat = data.per_channel_min_msat ? data.per_channel_min_msat.slice(0, -4) : null;
        data.per_channel_max_msat = data.per_channel_max_msat ? data.per_channel_max_msat.slice(0, -4) : null;
        data.reserve_tank_msat = data.reserve_tank_msat ? data.reserve_tank_msat.slice(0, -4) : null;
        data.lease_fee_base_msat = data.lease_fee_base_msat ? data.lease_fee_base_msat.slice(0, -4) : null;
        data.channel_fee_max_base_msat = data.channel_fee_max_base_msat ? data.channel_fee_max_base_msat.slice(0, -4) : null;
        console.log(data);
        res.status(201).json(data);
    }).catch(err => {
        console.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

export const connectPeer = (req,res) => {
    console.log('connectPeer initiated...');
    function connFailed(err) { throw err }
    ln.on('error', connFailed);
    ln.connect(req.body.id).then(data => {
        console.log('id -> '+ data.id);
        console.log('connectPeer success');
        res.status(201).json(data);
    }).catch(err => {
        console.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}
