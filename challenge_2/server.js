var express = require('express');
var parser = require('body-parser');

const port = 3000;
var app = express();
app.set('port', port);

/* Middleware for app */
app.use(express.static('client'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


/* Routing methods */
app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Hello World');
});

app.post('/upload_json', (req, res) => {
  //console.log(req.body.json);
  convertToCSV(req, res, (err, data) => {
    if (err) { console.log(err); }
    res.send(data);
  })
  res.end();
});

app.post('/', (req, res) => {
  console.log('hi');
});

app.listen(port, () => {
  console.log('App is listening on ' + port);
});

/* Model methods */
var convertToCSV = (req, res, next) => {
  console.log(req.body.json);
}