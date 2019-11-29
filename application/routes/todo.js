const express = require('express');
const router = express.Router();

const db = require('../models');

router.use(express.json());
router.get('/', async (req, res) => {
  try {
    console.log(await db.find());
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  const { id, name, email, todo } = req.body;
  db.save(id, name, email, todo);
});

router.delete('/', async (req, res) => {
  db.delete();
});

module.exports = router;
