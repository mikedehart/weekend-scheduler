
/*****************************************
*     REST API Functions
*	Access to API goes through these functions
*******************************************/

import axios from 'axios';
import * as auth from './auth';
import config from './config/config';


export const getUser = () => {
	return axios.get(`${config.api.server}/api/users/details`, {
		headers: { authorization: 'Bearer ' + auth.getToken() }
	}).then((res) => {
		return res.data;
	}).catch((err) => {
		console.log(err);
	})
};

/*
	Get dates user signed up for
	based on userId
*/
export const getUserDates = (userID) => {
	return axios.get(`${config.api.server}/api/dates/user`, {
		headers: { 
			authorization: 'Bearer ' + auth.getToken() 
		},
		params: {
			id: userID
		}
	})
	.then((res) => {
		console.log(res.data);
		return res.data;
	})
	.catch((err) => {
		console.log(err);
		throw new Error(err.response.data);
	});
};


/*
	Get all usernames in db
	- Used by admin to change users
	- TODO: Filter this by product?
*/
export const getAllUsernames = () => {
	return axios.get(`${config.api.server}/api/users`)
	.then((res) => {
		let objArray = res.data;
		return objArray;
	})
	.catch((err) => {
		console.log(err);
		throw new Error(err.response.data);
	});
};

/*
	Find a user by username
	- Currently returns all users and filters for match
	- TODO: Probably better way to do this for lots of users
*/
export const findUser = (username) => {
	return axios.get(`${config.api.server}/api/users`)
		.then((res) => {
			let userArray = res.data;
			userArray = userArray.filter(usr => usr.username === username);
			return userArray[0];
		})
		.catch((err) => {
			console.log(err);
			throw new Error(err.response.data);
		});
};

/**********************************
 *
 *	Add / Remove User/Date Functions
 *
 *	- Used for manipulating date assignment
 *
 **********************************/


/*
	Add user to a date
	- Used onClick() of table cells
*/
export const addUser = (userID, designation, dateID) => {
	return axios.put(`${config.api.server}/api/dates/user/${dateID}`, {
		id: userID,
		designation: designation
	}, 
	{
		headers: { authorization: 'Bearer ' + auth.getToken() },
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	})
};


/*
	Same as above, for holiday table
	- TODO: combine these into one function?
*/
export const addHolidayUser = (userID, designation, dateID) => {
	return axios.put(`${config.api.server}/api/holidays/user/${dateID}`, {
		id: userID,
		designation: designation
	}, 
	{
		headers: { authorization: 'Bearer ' + auth.getToken() },
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	})
};


/*
	Remove user from selected date
	- Used to back-out by users or for admins
	-NOTE: Need to use 'data' for DELETE: 
		https://github.com/axios/axios/issues/897#issuecomment-343715381
*/
export const deleteUser = (userID, dateID) => {
	return axios.delete(`${config.api.server}/api/dates/user/${dateID}`, {
		headers: { 
			authorization: 'Bearer ' + auth.getToken() 
		},
		data: {
			id: userID
		}
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	})
};

/*
	Same as above, but for holiday dates
	- TODO: combine these into one function?
*/
export const deleteHolidayUser = (userID, dateID) => {
	return axios.delete(`${config.api.server}/api/holidays/user/${dateID}`, {
		headers: { 
			authorization: 'Bearer ' + auth.getToken() 
		},
		data: {
			id: userID
		}
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	})
};


/**********************************
 *
 *	User Functions
 *
 *	- Used to add/modify/delete users
 *
 **********************************/

/*
	Create user in the system
	- Used when client creates a user
*/
export const createUser = (inum, username, product, email, mgr) => {
	return axios.post(`${config.api.server}/api/users`, {
		inum: inum,
		username: username,
		product: product,
		email: email,
		mgr_email: mgr
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	});
};


/**********************************
 *
 *	Date Functions
 *
 *	- Used for getting and changing dates
 *
 **********************************/

/*
	Get dates based on quarter/year
	- If qtr===5 then its holiday calendar
*/
export const getQtrDates = (qtr, year, product) => {
	const _qtr = parseInt(qtr, 10);
	const _year = parseInt(year, 10);
	const _product = product.toUpperCase();
	if (_qtr !== 5) {
		return axios.get(`${config.api.server}/api/dates`, {
			params: {
				qtr: _qtr,
				year: _year,
				product: _product
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data);
		});
	} else {
		return axios.get(`${config.api.server}/api/holidays`, {
			params: {
				year: _year,
				product: _product
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data);
		});
	}
};


/*
	Used to get relevant quarter
	based on month.
	- Mostly used in conjunction with Date() obj
*/
export const getQtr = (month) => {
	let _month = parseInt(month, 10);
	switch(_month) {
		case 0:
		case 1:
		case 2:
			return 1;
			break;
		case 3:
		case 4:
		case 5:
			return 2;
			break;
		case 6:
		case 7:
		case 8:
			return 3;
			break;
		case 9:
		case 10:
		case 11:
			return 4;
			break;
		default:
			return null;
	}
};


/**********************************
 *
 *	Quarter Functions
 *
 *	- Used for REST calls on quarters table.
 *
 **********************************/

/*
	Get all quarters in the database
*/
export const getAllQtrs = () => {
	return axios.get(`${config.api.server}/api/quarters`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data);
		})
};

/*
	Lock/Unlock a quarter
	- Only used by admins!
*/

export const toggleLockQtr = (qtr_id, lock_bool) => {
	return axios.put(`${config.api.server}/api/quarters/${qtr_id}`, {
			locked: lock_bool
		},
		{
			headers: {
				authorization: 'Bearer ' + auth.getToken() 
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data);
		})
};


/**********************************
 *
 *	Alt-Day Functions
 *
 *	- Used for REST calls on alternative days
 *  - TODO: Try to move add/remove calls to backend?
 *
 **********************************/

/*
	Get alternative days for specific user
*/
export const getUserAltDays = (user_id) => {
	return axios.get(`${config.api.server}/api/altdays`, {
		params: {
			userId: user_id
		}
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		throw new Error(err.response.data);
	})
};

/*
	Add an alternative day (NOT USED. MOVED TO BACKEND)
	- Used when selecting a date
*/
// export const addAltDay = (date_id, user_id, qtr, yr) => {
// 	return axios.post(`${config.api.server}/api/altdays`, {
// 		dateId: date_id,
// 		userId: user_id,
// 		qtr: qtr,
// 		year: yr
// 	})
// 	.then((res) => {
// 		return res.data;
// 	})
// 	.catch((err) => {
// 		throw new Error(err.response.data);
// 	})
// };

/*
	Add 'alternative' date for altday
*/
export const updateAltDay = (alt_id, altdate) => {
	return axios.put(`${config.api.server}/api/altdays/${alt_id}`, {
		alternative: altdate
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		throw new Error(err.response.data);
	})
};

/*
	Add pager pay for altday
*/
export const updatePagerPay = (alt_id, pager) => {
	return axios.put(`${config.api.server}/api/altdays/${alt_id}`, {
		pay: pager
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		throw new Error(err.response.data);
	})
};


/*
	Delete alt day. (NOT USED. MOVED TO BACKEND)
	- Used when user is removed from a date
*/
// export const deleteAltDay = (altday_id) => {
// 	return axios.delete(`${config.api.server}/api/altdays/${altday_id}`)
// 		.then((res) => {
// 			return res.data;
// 		})
// 		.catch((err) => {
// 			throw new Error(err.response.data);
// 		})
// };

/*
	Get an alt day based on userId / dateId.
	- Used when need to get altday and the ID is not available.
*/
export const getSpecificAltDay = (_userId, _dateId) => {
	return axios.get(`${config.api.server}/api/altdays`, {
		params: {
			userId: _userId,
			dateId: _dateId
		}
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		throw new Error(err.response.data);
	})
}

/** Currently not used. Calling URL directly in new window to prompt download
	( see CalBuilder ) **/
// export const downloadiCal = (startTime, endTime, user, date, email, mgr, id) => {
// 	return axios.get(`${config.api.server}/api/users/download`, {
// 		params: {
// 			start: startTime,
// 			end: endTime,
// 			user: user,
// 			date: date,
// 			email: email,
// 			mgr: mgr,
// 			id: id
// 		}
// 	})
// 	.then((res) => {
// 		return res.data;
// 	})
// 	.catch((err) => {
// 		throw new Error(err.response.data);
// 	})
// };

/*
	Send data to API to write temp iCal file.
	Filename returned. Can be downloaded at the filename link:
	apiserver:port/api/users/download/filename.ics
*/

export const writeiCal = (startTime, endTime, user, date, email, mgr, id) => {
	return axios.get(`${config.api.server}/api/users/write`, {
		params: {
			start: startTime,
			end: endTime,
			user: user,
			date: date,
			email: email,
			mgr: mgr,
			id: id
		}
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		throw new Error(err.response.data);
	})
};



// Example of including the authorization header for token

// https://stackoverflow.com/questions/41996167/how-to-provide-frontend-with-json-web-token-after-server-authentication
// axios.get(`${ROOT_URL}/api/blog/${blogId}`, {
//         headers: { authorization: localStorage.getItem('token') } 
// //take the token from localStorage and put it on headers ('authorization is my own header')
//     })
//         .then(response => {
//             dispatch({
//                 type: FETCH_BLOG,
//                 payload: response.data
//             });
//         })
//         .catch(error => {
//             console.log(error);
//         });