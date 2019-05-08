# Setup
## TL;DR
Ulimately you'll want these running concurrently:
* Nodemon
* Live-server
* MySQL

We'll walk through how to make that happen.

## Install dependencies
Note that the TA package.json file will have dependencies listed for npm install. You should install from there rather than trusting any global installs, but this is included for reference in case it's needed for this week's projects.
```
  "dependencies": {
    "babel-cli": "^6.26.0",
    "nodemon": "^1.19.0",
    "react": "^16.8.6",
    "babel-plugin-react": "1.0.0",
    "babel-preset-react": "^6.5.0",
    "jquery": "^2.2.1",
    "live-server": "^1.2.1",
    "react-dom": "^0.14.7"
  }
```


## Run environments
### Babel
* Install locally if your global installation is having problems
* Include --watch at the end of the script
```
babel . --out-dir compiled --presets=react --ignore=node_modules,compiled --source-maps inline --watch
```

### live-server
Live server looks for an index.html file _in the directory you run it from_. **Make sure to link your compiled component(s) in your index.html**.
```
live-server
```
```html
  <body>
    <script type="module" src="compiled/client/app.js"></script>
  </body>
```

### Nodemon
Run your server with:
```
nodemond server.js
```

You can do a quick Hello World with the code below. Going to your localhost:3000 should trigger the hello world message in your client.
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello world!`);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
```

## SQL
Load your schema with this script
```
mysql -u root < path/to/schema.sql
```

## React
Include React in your index.html so it's available globally.
```html
  <head>
    <script src="node_modules/react/dist/react.js"></script>
    <script src="node_modules/react-dom/dist/react-dom.js"></script>
  </head>
  <body>
    <script type="module" src="compiled/client/app.js"></script>
  </body>
```