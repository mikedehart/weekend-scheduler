/*
	Configuration options
	- Based on value of NODE_ENV, imports either production or development configs
	- NOT added to git to prevent URL information on github
*/

import _ from 'lodash';
import prodConfig from './production';
import devConfig from './development';

const config = {
	dev: 'development',
	prod: 'production',
	port: process.env.NODE_PORT || 9000,
};

let nodeEnv = process.env.NODE_ENV || config.dev;

let envConfig;
if(nodeEnv === 'production') {
	envConfig = prodConfig;
} else {
	envConfig = devConfig;
}

const fullConfig = _.merge(config, envConfig);
export default fullConfig;