const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

const port = process.env.PORT || 8080;

const httpsOptions = {
  key: fs.readFileSync('./ssl/selfsigned.key'),
  cert: fs.readFileSync('./ssl/selfsigned.crt')
}

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`> App listening on port ${port}`);
});
