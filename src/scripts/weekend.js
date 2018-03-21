/*****
	Weekend Calculator
	- Mike DeHart

	- This is a set of JS functions used to calculating weekends given
		a set of parameters.
*/


/* Returns all the Sat/Sun dates for a given month.

	Parameters:
	month = int representation of month to search (actual month - 1)
	year = int value of year to search

	Follows JS Date conventions: 0 = Jan, 1 = Feb, ..., 11 = Dec

	Returns:
	weekends = array of weekend dates for the month in the form: MM/dd/yyyy
*/

function getWeekendsinMonth(month, year) {
	let _year = parseInt(year);
	let _month = parseInt(month);
	let currentMonth = _month;
	let initialDate = new Date(_year, _month, 1);
	let weekends = [];

	while (initialDate.getMonth() === currentMonth) {
		if(initialDate.getDay() === 0 || initialDate.getDay() === 6) {
			weekends.push(''+(initialDate.getMonth()+1)+"/"+initialDate.getDate()+"/"+initialDate.getFullYear());
		}
		initialDate.setDate(initialDate.getDate() + 1);
	}
	return weekends;
}


