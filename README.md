# Liquidity Ads
This project can be used to adverstize your node's liquidity to the netwrok and to dual fund channels with lease options.

## How to run
1) Clone/pull the repository to your local machine.
2) Go into the cloned local folder and run `npm install --prod`.
3) Execute command `node lads` in the same folder once the step two is complete.
4) The server is designed to read the default lightning rpc path. However it can be updated by passing `LN_PATH`'s value to the node environment. For example, replace step 3's command as `LN_PATH=/your/ln/path node lads`.
5) Open the UI in any browser on port 3030 (http://localhost:3030).

## Prerequisites
These instructions are based on assumption that you already are running/installed:
  1) bitcoind,
  2) clightning,
  3) Nodejs >= v14 & npm >= v7

## Screenshots
### <a name="lease"></a>Lease
![](./screenshots/photos/Lease.png)

### <a name="lease-sort"></a>Lease Sort
![](./screenshots/photos/Lease-sort.png)

### <a name="lease-filter"></a>Lease Filter
![](./screenshots/photos/Lease-filter.png)

### <a name="node"></a>Node Details
![](./screenshots/photos/Node-detail.png)

### <a name="dual"></a>Dual Funding
![](./screenshots/photos/Open-channel.png)

### <a name="dual-validate"></a>Open Channel Validation
![](./screenshots/photos/Open-channel-validation.png)

### <a name="funding"></a>Funding Home
![](./screenshots/photos/Funding-get.png)

### <a name="funding-form"></a>Funding Update
![](./screenshots/photos/Funding-update-form.png)

### <a name="funding-updated"></a>Funding Updated
![](./screenshots/photos/Funding-updated.png)

### <a name="funding-video"></a>Funding Video
![](./screenshots/videos/Funding.webm)