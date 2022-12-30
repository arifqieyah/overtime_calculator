const overtime = {
	holidays: [
		"2022-06-01",
		"2022-08-17"
	],
	getOvertimeHours: function(data) {
		let date1 = new Date(data.date + " " + data.start);
		let date2 = new Date(data.date + " " + data.end);      
		return (date2.getTime() - date1.getTime())/(3600 * 1000);
	},
	isDayOff: function(date) {
		let isHoliday = overtime.holidays.includes(date);
		date = new Date(date);
		return (date.getDay() === 0 || date.getDay() === 6 || isHoliday);
	},
	roundNumber: function(num) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	},
	calculate: function(req, res) {
		let data = req.body;
		let salary = data.salary;
		let salaryPerHour = salary/173;
		data.total = 0;
		data.overtimes.forEach(row => {
			let hour = overtime.getOvertimeHours(row)
			let multiplier = 0;
			if(!overtime.isDayOff(row.date)) {
				//------- weekday ----------
				let firstHour = 1 * 1.5;
				if(hour > 1) {
					multiplier = firstHour + ((hour - 1) * 2);
				} else if (hour == 1) {
					multiplier = firstHour;
				}
			} else {
		        //------- weekend or day off ------------
				let firstEightHours = 8 * 2;
				let ninthHour = 1 * 3;
				if(hour > 9) {
					multiplier = firstEightHours + ninthHour + ((hour - 9) * 4);
				} else if(hour == 9) {
					multiplier = firstEightHours + ninthHour;
				} else if (hour <= 8) {
					multiplier = hour * 2;
				}
			}
			row.subtotal =  overtime.roundNumber(multiplier * salaryPerHour);
			data.total = overtime.roundNumber(data.total + row.subtotal);
		});
		res.json(data);
	}
}

module.exports = { overtime }