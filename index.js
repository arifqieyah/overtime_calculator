const express = require("express");
const dotenv = require("dotenv");
const func = require("./functions.js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/calculate-overtime', (req, res) => {
	res.json(func.overtime.calculate(req, res));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}`));

module.exports = app; //for testing