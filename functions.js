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
			let subtotal = 0;
			if(!overtime.isDayOff(row.date)) {
				//------- weekday ----------

				//the first one hour
				let firstHour = 1 * 1.5 * salaryPerHour;
				//the last remaining hours
				let lastHours = (hour - 1) * 2 * salaryPerHour;
		        //sum up all
		        row.subtotal =  overtime.roundNumber(firstHour + lastHours);
			} else {
		        //------- weekend or day off ------------

				//the first eight hours
		        let firstEightHour = (hour > 8 ? 8 : hour) * 2 * salaryPerHour;
		        //the ninth hour
		        let ninthHour = ((hour > 8 && hour >= 9) ? 1 : 0) * 3 * salaryPerHour;
		        //all the remaining hours
				let remainingHours = hour - 9;
		        let lastHours = (remainingHours > -1) ? (remainingHours * 4 * salaryPerHour) : 0;
		        //sum up all
		        row.subtotal =  overtime.roundNumber(firstEightHour + ninthHour + lastHours);
			}
			data.total = overtime.roundNumber(data.total + row.subtotal);
		});
		return data;
	}
}

module.exports = { overtime }