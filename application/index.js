const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`> App listening on port ${port}`);
});
