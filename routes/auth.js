const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post('/registation', (req, res, next) => authController.auth(req, res, next));
router.post('/login', (req, res, next) => authController.Login(req, res, next));

module.exports = router