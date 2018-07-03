import config from './config/config';

// Save token to localStorage
export const setToken = (idToken) => {
	localStorage.setItem('scheduler_token', idToken);
};

// Get token from localStorage
export const getToken = () => {
	return localStorage.getItem('scheduler_token');
};

export const checkToken = () => {
	const authToken = getToken();
	console.log(`Token: ${authToken}`);
	if (!authToken) {
		console.log("Checking cookie...");
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

export const getINum = () => {
	let inum = getCookie('inum');
	setCookie('inum', '', -1);
	return inum;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
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