var express = require('express');
var parser = require('body-parser');
var fs = require('fs').promises;

const port = 3000;
var app = express();
app.set('port', port);

/* Middleware for app */
app.use(express.static('client'));
  app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

const ATTRIBUTES = ["firstName","lastName","county","city","role","sales"];

/* Routing methods */
app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Hello World');
});

app.post('/upload_json', (req, res) => {
  // Delegate parsing to convertToCSV
  // Pass callback to convertToCSV, which responds with CSV to client
  console.log(req.form);
  convertToCSV(req, res, (err, data) => {
    if (err) { console.log(err); }
    //res.writeHead(200);
    console.log(data);
    fs.writeFile('new_csv.csv', data)
    .then(() => {
      console.log(__dirname + '/new_csv.csv');
      res.sendFile(__dirname + '/new_csv.csv', (err) => {
        if (err) { 
          console.log(err); 
        } else {
          console.log('Sent file'); 
        }

      });
    })
    .catch((e) => {
      console.log(e);
    });
  })
});

app.post('/', (req, res) => {
  console.log('hi');
});

app.listen(port, () => {
  console.log('App is listening on ' + port);
});

/* Model methods */
var convertToCSV = (req, res, callback) => {
  // Flatten the object into an array
  // Create a new array and push ATTRIBUTES to it
  // Map each element in the array
  //  Create a new array
  //  For each key in ATTRIBUTES, push value to new array (preserve order)
  //  Join array with ',' and return the new string
  // Join main array with \n
  // Call callback, passing in CSV text
  //console.log(req.body.json);
  var flatArray = flattenObject(req.body.json);
  var values = flatArray.map(employee => {
    var tempArr = [];
    ATTRIBUTES.forEach(attribute => {
      tempArr.push(employee[attribute] || ' ');
    });
    return tempArr.join(',');
  });
  values.unshift(ATTRIBUTES);
  callback(null, values.join('\n'));
}

var flattenObject = (object) => {
  // Input: an object to flatten
  // Return a flattened array
  // Recursively traverse the object and all its children
  // Push each employee to an array
  var flatArray = [];
  var json = JSON.parse(object);
  addObjects(json);

  return flatArray;

  function addObjects(object) {
    flatArray.push(object);
    if (object.children.length === 0) { return; }
    if (object.children.length > 0){
      object.children.forEach(child => {
        addObjects(child);
      });
    }
    console.log(flatArray);
  }
}