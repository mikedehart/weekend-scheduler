*****************
Weekend Scheduler
*****************
Author: Mike DeHart

- Internal tool used to schedule weekend shifts
- Covers:
	- Admin panel to add/remove users
	- Sign up for shifts with single click
	- Tracking for user shifts and alt days
	- Scheduling of alt days
	- Ability to switch shifts (?)

Installation:

- Clone the repository
- npm install
	- make sure NODE_ENV is not set to production in order to install dev dependencies
- npm run build -- builds the app for production using webpack-cli
- npm start -- starts the webpack dev server on port 9000
