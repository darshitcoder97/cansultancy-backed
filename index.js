require('dotenv').config()
const express = require('express');
const app = express();
require('./config/db')
const route = require('./routes/index');

const appConfig = require('./lib/appConfig');

app.use(express.urlencoded({static:false}))

app.use('/api', route)
app.use(appConfig.handleError);

app.listen(3000,()=>{
    console.log("server start in poort 3000");
})