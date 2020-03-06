import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import config from './config/config';
import * as auth from './auth';
import * as api from './api';

if (auth.checkToken()) {
	api.getUser()
	.then(user => {
		if(!user) { // Verified I-number, but not in database
			let inum = auth.getINum();
			if (typeof document !== 'undefined') {
				ReactDOM.render(<AppContainer  
					authenticated={false} inum={inum} />, document.getElementById('root'));
			}
		} else {
			if (typeof document !== 'undefined') {
				ReactDOM.render(<AppContainer 
					inum={user.inum}
					username={user.username}
					product={user.product}
					designation={user.designation}
					authenticated={true}
					userID={user._id}
					/>, document.getElementById('root'));
			}
		}
	})
	.catch(err => {
		console.log('data: ', err.response.data);
		console.log('status: ', err.response.status);
		//If error code is 401, possibly faulty token. Delete and reload
		if(err.response.status === 401) {
			auth.deleteToken();
			if(typeof window !== 'undefined') window.location.reload(true);
		}
		
	});
} else {
	// No valid token set or in cookie. Check for inum cookie or redirect to auth
	console.log("no token or cookie");
	let inum = auth.getINum();
	console.log("inum: ", inum);
	if(!inum) {
		if(typeof window !== 'undefined') {
			window.location.replace(`${config.api.server}/auth/signin`);
		}
		else {
			console.log('Window undefined!');
		}
	} else {
		// Product is required by MainTable. Defaulting to ASE for now.
		if (typeof document !== 'undefined') {
			ReactDOM.render(<AppContainer  
				authenticated={false} inum={inum} product="ASE" />, document.getElementById('root'));
		}
	}

}