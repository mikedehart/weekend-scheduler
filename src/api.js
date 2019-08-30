import axios from 'axios';
import * as auth from './auth';
import config from './config/config';

export const getUser = () => {
	return axios.get(`${config.api.server}/api/users/details`, {
		headers: { Authorization: 'Bearer ' + auth.getToken() }
	}).then((res) => {
		return res.data;
	}).catch((err) => {
		console.log(err);
	})
};

// TODO: Get dates user signed up for
export const getUserDates = (userID) => {
	//return axios.
	return axios.get(`${config.api.server}/api/dates/user`, {
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


// TODO: Filter this by product?
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

// Find a user by username:
// Currently, return all users and filter by username
// Probably a better way to do this
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


// ==== Add / Remove user functions ====

// Add user to the selected date
export const addUser = (userID, dateID) => {
	return axios.put(`${config.api.server}/api/dates/user/${dateID}`, {
		id: userID
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	})
};

// Remove user from selected date
// NOTE: Need to use data for DELETE:
// https://github.com/axios/axios/issues/897#issuecomment-343715381
export const deleteUser = (userID, dateID) => {
	return axios.delete(`${config.api.server}/api/dates/user/${dateID}`, {
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



export const createUser = (inum, username, product) => {
	return axios.post(`${config.api.server}/api/users`, {
		inum: inum,
		username: username,
		product: product
	})
	.then((res) => {
		return res.data;
	})
	.catch((err) => {
		console.error(err);
		throw new Error(err.response.data);
	});
};


// ======== Date functions ========

export const getQtrDates = (qtr, year, product) => {
	const _qtr = parseInt(qtr, 10);
	const _year = parseInt(year, 10);
	const _product = product.toUpperCase();
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
};

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

// ======== Quarter functions ========

export const getAllQtrs = () => {
	return axios.get(`${config.api.server}/api/quarters`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw new Error(err.response.data);
		})
};

export const toggleLockQtr = (qtr_id, lock_bool) => {
	return axios.put(`${config.api.server}/api/quarters/${qtr_id}`, {
		locked: lock_bool
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