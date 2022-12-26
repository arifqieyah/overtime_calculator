const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/calculate-overtime', (req, res) => {

	let data = req.body;
	let salary = data.salary;
	let salaryPerHour = salary/173;
	let overtimes = data.overtimes;
   	data.total = 0;

	overtimes.forEach(overtime => {
		let date1 = new Date(overtime.date + " " + overtime.start);
		let date2 = new Date(overtime.date + " " + overtime.end);      
    	let hour = (date2.getTime() - date1.getTime())/(3600 * 1000);
    	let overtimeDate = new Date(overtime.date);
    	let isWeekend = (overtimeDate.getDay() === 0 || overtimeDate.getDay() === 6);
    	let subtotal = 0;

    	if(!isWeekend) {
    		//weekday
    		let firstHour = 1 * 1.5 * salaryPerHour;
			let remainingHour = (hour - 1) * 2 * salaryPerHour;
            overtime.subtotal =  firstHour + remainingHour;
    	} else {
            //weekend
    		let sisa = hour;
            let firstHour = (hour > 8 ? 8 : hour);
            sisa -= 8;
            let secondHour = (hour > 8 && hour >= 9) ? 1 : 0;
            sisa -= 1;
            let firstEightHour = firstHour * 2 * salaryPerHour;
            let afterNineHour = secondHour * 3 * salaryPerHour;
            let remainingHour = (sisa > -1) ? (sisa * 4 * salaryPerHour) : 0;
            overtime.subtotal =  firstEightHour + afterNineHour + remainingHour;
    	}
    	data.total = data.total + overtime.subtotal;
	});
	res.json(data);
});


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port ${port}`));