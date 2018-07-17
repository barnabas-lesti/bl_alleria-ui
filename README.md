# bl_alleria-ui
Simple lightweight UI starter template for building CSS and JavaScript.

# Prerequisites
- [NodeJS](https://nodejs.org/en/)
- _[Yarn](https://yarnpkg.com/lang/en/) - If you want faster package installs ;)_

# Setup and workflow

Install required dependencies:
```
# With NPM
npm install

# With YARN
yarn
```

Start the development server (server will start at http://localhost:8080):
```
# With NPM 
npm run serve

# With YARN
yarn serve
```

Build UI resources (this will build the end CSS and JavaScript files):
```
# With NPM 
npm run build

# With YARN
yarn build
```

Watch for file changes (*.scss and *.js), run the appropriate build for them and reload the browser window (_Bare in mind that two terminals needs to be used if we serve the server and run other commands like build and watch_):
```
# With NPM 
npm run watch

# With YARN
yarn watch
```