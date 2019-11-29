const express = require('express');
const router = express.Router();

const db = require('../models');

router.use(express.json());

router.post('/', async (req, res) => {
  const { id, name, email, todo } = req.body;
  try {
    await db.saveTodo(id, name, email, todo);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    res.status(200).send(await db.getUserTodos(userId));
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/:userId/:todoId', async (req, res) => {
  const { userId, todoId } = req.params;
  try {
    await db.deleteTodo(userId, todoId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/:userId/:todoId', async (req, res) => {
  const { userId, todoId } = req.params;
  try {
    await db.completeTodo(userId, todoId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  res.send(await db.getAll());
});

module.exports = router;
