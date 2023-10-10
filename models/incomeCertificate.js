const mongoose = require('mongoose');

const incomeCertificateSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
},
{
    timestamp: true,
})

module.exports = mongoose.model('incomeCertificate', incomeCertificateSchema);