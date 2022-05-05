import http from 'http';
import express from 'express';
import bodyparser from 'body-parser';
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
const app = express();

const router = express.Router();
import { getinfo, listLiquidityNodes, fundChannel, funderUpdate, connectPeer } from './clt.controller.js';

const cdir = process.env.CL_REST_STATE_DIR ? process.env.CL_REST_STATE_DIR : dirname(fileURLToPath(import.meta.url));
console.log("cl-rest state dir: " + cdir);
process.chdir(cdir);

let lnpath = process.env.LN_PATH;
import { LightningClient } from './clt-client.cjs';
global.ln = new LightningClient(lnpath);

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


router.get('/getInfo', getinfo);
router.get('/listLiquidityNodes', listLiquidityNodes);
router.post('/connectPeer', connectPeer);
router.post('/fundChannel', fundChannel);
router.post('/funderUpdate', funderUpdate);

app.use('/api', router);
app.use('', express.static(join(dirname(fileURLToPath(import.meta.url)), 'dist')));
app.use((req, res, next) => {
  res.sendFile(join(dirname(fileURLToPath(import.meta.url)), 'dist', 'index.html'));
});

console.warn('--- Starting the cl-rest server ---');
let server = http.createServer( app );

server.listen('3030', function() {
    console.warn('--- cl-rest api server is ready and listening on port: 3030 ---');
})


// Use JSON file for storage
const file = join(dirname(fileURLToPath(import.meta.url)), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
db.data ||= { posts: [] }
// db.data = db.data || { posts: [] } // for node < v15.x

// Create and query items using plain JS
db.data.posts.push('hello world')
db.data.posts[0]

// You can also use this syntax if you prefer
const { posts } = db.data
posts.push('hello world')

// Write db.data content to db.json
await db.write()