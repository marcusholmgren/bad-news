![Node.js CI](https://github.com/marcusholmgren/bad-news/workflows/Node.js%20CI/badge.svg)

The app is hopefully available at [https://bad-news-app.web.app](https://bad-news-app.web.app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Add ESLint airbnb rules

````cli
npx install-peerdeps --dev eslint-config-airbnb && yarn add eslint
````

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### Configure Firebase

You must edit the configuration file with your [Firebase](https://firebase.google.com) setting `src/firebase/config.js`.

You need to also configure and export `firebaseEndpoints` with the correct URLs

```javascript
const firebaseEndpoints = {
    linksPagination: "https://localhost/linksPagination"
};
export {firebaseEndpoints};
```

After you have changed your setting you should run git to ignore any changes made (to not accidentally commit changes to your repository)

```cli
git update-index --assume-unchanged src/firebase/config.js
```
