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
}



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