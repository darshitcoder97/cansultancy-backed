const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    Password:{
        type: String,
        required: true,
    },
    ProfileImage: {
        type: String,
        required: false,
    }
},
{
    timestamp: true,
})

module.exports = mongoose.model('User', userSchema);