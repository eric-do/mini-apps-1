var express = require('express');
var parser = require('body-parser');
var fs = require('fs').promises;
var _ = require('underscore');

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
  res.send(index({csv_string: null}));
  console.log('Hello World');
});

app.post('/upload_json', (req, res) => {
  // Delegate parsing to convertToCSV
  // Pass callback to convertToCSV, which responds with CSV to client
  console.log(req.body.json);
  convertToCSV(req, res, (err, data) => {
    if (err) { console.log(err); }
    console.log(typeof csvHTML({csv_string: data}));

    res.send(csvHTML({csv_string:data}));
    // fs.writeFile(__dirname + '/home.html', index({csv_string: data}))
    // .then(() => {
    //   console.log('wrote file');
    //   res.status(200);
    //   res.send(csvHTML({csv_string: data}));
    // })
    // .catch(e => {
    //   console.log(e);
    // });

      // res.send(index({csv_string: data}), (err) => {
      //   if (err) { 
      //     console.log("Error: " + err); 
      //     res.end();
      //   } else {
      //     console.log('Sent file'); 
      //     res.end();
      //   }
      // });
    });
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
  fs.writeFile('new_csv.csv', values.join('\n'))
  .then(() => {
    callback(null, values.join('<br>'));
  })
  .catch(e => {
    console.log(e);
  });
  
}

var flattenObject = (object) => {
  // Input: an object to flatten
  // Return a flattened array
  // Recursively traverse the object and all its children
  // Push each employee to an array
  var flatArray = [];
  console.log(typeof(object));
  //var json = JSON.parse(object);
  addObjects(object);

  return flatArray;

  function addObjects(object) {
    flatArray.push(object);
    console.log(object.firstName);
    if (!object.children || object.children.length === 0) { return; }
    if (object.children.length > 0){
      object.children.forEach(child => {
        addObjects(child);
      });
    }
    //console.log(flatArray);
  }
}

var index = _.template(
`<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
   <form name="json-submit" action="/upload_json" method="post">
    <label for="json">Enter your JSON</label>
    <textarea name="json">

     </textarea>
     <input type="submit" value="Submit">
   </form>
   <form name="json-upload" action="/upload_json" method="post" enctype="multipart/form-data">
     <input id="file-select" type="file" value="Submit" name="json" accept=".json">
     <input type="submit" value="Submit">
   </form>
   <div id="csv-output">
      <%= csv_string %>
   </div>
    <script src='./app.js'></script>
  </body>
</html>`);

var csvHTML = _.template(`<%= csv_string %>`);