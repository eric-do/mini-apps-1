# Setup
## Webpack
File structure
```
 your-project
        -> client
            -> dist
                -> index.html
            -> src
                -> components
                    -> Component1.jsx
                    -> Component2.jsx
                    -> Component3.jsx
                -> index.jsx
```

Webpack scripts
```
Erics-MacBook:challenge_4 ericdo$ npm install webpack --save-dev
Erics-MacBook:challenge_4 ericdo$ npm install webpack-cli --save-dev
Erics-MacBook:challenge_4 ericdo$ npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
Erics-MacBook:challenge_4 ericdo$ > webpack.config.js
```

Update package.json to run webpack
```
"scripts": {
    "react-dev": "webpack -d --watch"
  }
```  

Update webpack.config.json to use babel-loader
```javascript
module.exports = {
  entry: __dirname + '/client/src/index.jsx',
     module: {
       rules: [
         {
           test: /\.jsx$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
           }
         }
       ]
     },
    output: {
     filename: 'bundle.js',
     path: __dirname + '/client/dist'
   }
 };
 ```

Run webpack
```
npm run react-dev
```
