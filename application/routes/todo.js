const express = require('express');
const router = express.Router();

const db = require('../models');

router.use(express.json());

router.post('/', async (req, res) => {
  const { id, name, email, todo } = req.body;
  try {
    await db.saveTodo(id, name, email, todo);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    res.status(200).send(await db.getUserTodos(userId));
  } catch (err) {
    console.error(err);
  }
});

router.delete('/', async (req, res) => {
  db.delete();
});

module.exports = router;
