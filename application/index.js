const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

const todoRoute = require('./routes/todo');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use('/todo', todoRoute);

const port = process.env.PORT || 8080;

const httpsOptions = {
  key: fs.readFileSync('./ssl/selfsigned.key'),
  cert: fs.readFileSync('./ssl/selfsigned.crt')
}

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`> App listening on port ${port}`);
});
