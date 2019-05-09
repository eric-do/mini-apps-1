const db = require('mysql')
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log(req.body.user);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})