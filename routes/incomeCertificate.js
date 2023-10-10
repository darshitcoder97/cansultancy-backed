const express = require("express");
const router = express.Router();
const incomeCertificate = require('../models/incomeCertificate')

router.post('/',async (req,res,next)=>{
    try {
        const data = req.body;
        console.log(data);
        const incomeCertificateObj = new incomeCertificate(data)
        await incomeCertificateObj.save();
        res.status(201).send("Data created successfully")
    } catch (error) {
        res.status(400).send(error)
    }
} )

module.exports = router