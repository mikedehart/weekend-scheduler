import config from './config/config';

// Save token to localStorage
export const setToken = (idToken) => {
	if( typeof window !== 'undefined') {
		localStorage.setItem('scheduler_token', idToken);
	} else {
		console.log('localStorage undefined!');
	}
};

// Get token from localStorage
export const getToken = () => {
	if( typeof window !== 'undefined') {
		return localStorage.getItem('scheduler_token');
	}
	else {
		return null;
	}
};

export const checkToken = () => {
	const authToken = getToken();
	if (!authToken) {
		const newToken = getCookie('token');
		if(!newToken) {
			console.log('No token or cookie!');
			return false;
		} else {
			setToken(newToken);
			setCookie('token', '', -1); // delete cookie now
		}
	}
	return true;
};

// Clear token, is cases of expiration
export const deleteToken = () => {
	if(typeof window !== 'undefined') {
		return localStorage.removeItem('scheduler_token');
	} else {
		return false;
	}
};

export const getINum = () => {
	let inum = getCookie('inum');
	setCookie('inum', '', -1);
	return inum;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    if (typeof document !== 'undefined') {
    	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    let ca;
    if (typeof document !== 'undefined') {
    	ca = document.cookie.split(';');
    }
    else {
    	ca = "";
    }
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}