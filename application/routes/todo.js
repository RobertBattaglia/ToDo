const express = require('express');

const router = express.Router();

router.post('/:hash', async (req, res) => {
  //TODO
  console.log('received');
  console.log(process.env.MONGO_URI);
});

module.exports = router;
