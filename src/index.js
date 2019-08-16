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
			ReactDOM.render(<AppContainer  
				authenticated={false} inum={inum} />, document.getElementById('root'));
		} else {
			ReactDOM.render(<AppContainer 
				inum={user.inum}
				username={user.username}
				product={user.product}
				designation={user.designation}
				authenticated={true}
				userID={user._id}
				/>, document.getElementById('root'));
		}
	})
	.catch(err => console.error(err));
	
} else {
	// No valid token set or in cookie. Check for inum cookie or redirect to auth
	let inum = auth.getINum();
	if(!inum) {
		window.location.replace(`${config.api.server}/auth/signin`);
	} else {
		// Product is required by MainTable. Defaulting to ASE for now.
		ReactDOM.render(<AppContainer  
			authenticated={false} inum={inum} product="ASE" />, document.getElementById('root'));
	}

}