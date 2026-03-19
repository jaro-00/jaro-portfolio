const express = require('express');
/** @type {import('express').Router} */
const router = express.Router();

const authController = require("../controllers/authController");

/**
 * Auth routes.
 *
 * Mounted at `/api/auth` by `server.js`.
 */
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;