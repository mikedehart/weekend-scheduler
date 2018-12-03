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
export const getUserDates = () => {
	//return axios.
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
		throw new Error(err.response.data);
	});
};


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