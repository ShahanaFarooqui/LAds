# Liquidity Ads
This product provides an interface to view, manage and accept liquidity ads available via C-Lightning.

## How to run
1) Clone/pull the repository to your local machine.
2) Go into the cloned local folder and run `npm install --prod`.
3) Execute command `node lads` in the same folder once the step two is complete.
4) The server is designed to read the default lightning rpc path. However it can be updated by passing `LN_PATH`'s value to the node environment. For example, replace step 3's command as `LN_PATH=/your/ln/path node lads`.
5) Open the UI in any browser on port 3030 (http://localhost:3030).

## Prerequisites
These instructions are based on assumption that you already are running:
  1) bitcoind
  2) clightning
  3) Nodejs >= v14 & npm >= v7

## Screenshots
### <a name="lease"></a>Ads
Ads for the nodes offering liquidity on the network

![](./screenshots/photos/Lease.png)



### <a name="lease-sort"></a>Ads Sort
The Ads can be sorted by any of the available columns

![](./screenshots/photos/Lease-sort.png)



### <a name="lease-filter"></a>Ads Filter
Search filter can be applied to search on any text on the grid

![](./screenshots/photos/Lease-filter.png)



### <a name="node"></a>Node Details
Details of the node offering liquidity

![](./screenshots/photos/Node-detail.png)



### <a name="openchannel"></a>Leasing Liquidity
Requesting channel liquidity from the ad

![](./screenshots/photos/Open-channel.png)



### <a name="dual-validate"></a>Open Channel Validation
Open channel form showing error on the incorrect value

![](./screenshots/photos/Open-channel-validation.png)



### <a name="funding"></a>View Funding Policy
View your node's funding policy

![](./screenshots/photos/Funding-get.png)



### <a name="funding-form"></a>Funding Update
Update your node's funding policy

![](./screenshots/photos/Funding-update-form.png)



### <a name="funding-updated"></a>Funding Updated
Updated node's funding policy (Returns `Compact Lease` parameter)

![](./screenshots/photos/Funding-updated.png)
