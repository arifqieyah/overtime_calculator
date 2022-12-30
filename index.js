const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const func = require("./functions.js");
const app = express();
dotenv.config();
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.route('/calculate-overtime').post(func.overtime.calculate);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}`));

module.exports = app; //for testing