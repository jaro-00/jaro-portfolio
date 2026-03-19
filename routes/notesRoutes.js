const express = require('express');
/** @type {import('express').Router} */
const router = express.Router();

const noteController = require('../controllers/noteController');
const { authToken } = require('../middleware/authmiddleware');

/**
 * Notes routes.
 *
 * Mounted at `/api/notes` by `server.js` and protected by `authToken`.
 */
router.post('/', authToken, noteController.createNote);
router.get('/', authToken, noteController.notes);
router.put('/:id', authToken, noteController.updateNote);
router.delete('/:id', authToken, noteController.deleteNote);

module.exports = router;
