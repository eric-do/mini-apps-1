var express = require('express');
var app = express();
const port = 3000;

app.use(express.static(__dirname + '/client/dist/'));

// app.get('/', (req, res) => {
//   res.send('hello world!');
// });

app.listen(port, () => {
  console.log('listening on port ' + port);
})