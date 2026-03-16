const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');
const { authToken } = require('../middleware/authmiddleware');

// Protect all note routes behind authentication
router.post('/', authToken, noteController.createNote);
router.get('/', authToken, noteController.notes);
router.put('/:id', authToken, noteController.updateNote);
router.delete('/:id', authToken, noteController.deleteNote);

module.exports = router;
