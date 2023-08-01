# Quality Wines Web project

This project is an app to manage wines measures. The user is able to register, login, and apply operations to wines (add, edit, delete, list).

The project is compose of the frontend (React), backend (Nodejs) the server in node connects to a database in mongodb.


## To install and run the project
Once cloned, enter the root folder of the project and run
### `npm install`

## Adding .env file
Use the server\.env.sample file to add the values of the mongodb username, mongodb pass and a string for the secret. Basically once the project is downloaded and installed, then copy the file server\.env.sample and rename it to "server\.env" and add the values.

## Adding connecting to a mongo database
In order to connect to a database, should be added the mongodb user name and password, this should be done in the " server\.env". This will allow to connect to the database to save the data of the wines.
In the "server\constants.ts" file is the MONGO_URL that can be changed too if needed.


## Some of the used tecnologies 
Client:
* State Management React Redux and Redux toolkit query
* UI component library Material UI
* React router dom to manage the routing
* To test used the library testing-library/react

Server:
* NodeJS
* Express
* Mongoose


## Using the app
* User can register in the route /login
* User can login and logout in the route /login 
* User can logout using the settings button in the navbar
* User can see the list of the wines in the route /measurements
* User can add a new wine from the wines table at the route /measurements by clicking the button +.
* User can edit a wine from the wines table at the route /measurements by clicking the pencil button of one of the rows.
* User can delete a wine from the wines table at the route /measurements by clicking the trash button of one of the rows.


## Regarding the tests
The feature to list the wines and open the new Wine form is tested, the tests are placed at "client\quality-wines-web\src\pages\___tests___\Measurements.test.ts", to run it use the script "npm test" in the root folder of the client folder "client\quality-wines-web"

## Regarding branches
* master, it is the initial state of the project
* develop, it has the last version of the project


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.




### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
