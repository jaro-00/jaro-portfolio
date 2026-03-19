const express = require('express');
/** @type {import('express').Router} */
const router = express.Router();

const taskController = require('../controllers/taskController');
const { authToken } = require('../middleware/authmiddleware');

/**
 * Tasks routes.
 *
 * Mounted at `/api/tasks` by `server.js` and protected by `authToken`.
 */
router.post('/', authToken, taskController.tasks);
router.get('/', authToken, taskController.tasks);
router.put('/:id', authToken, taskController.updateTask);
router.delete('/:id', authToken, taskController.deleteTask);

module.exports = router;