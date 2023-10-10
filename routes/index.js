const express = require("express");
const router = express.Router();
const incomeCertificate = require('./incomeCertificate');


router.use('/incomeCertificate', incomeCertificate)

module.exports = router