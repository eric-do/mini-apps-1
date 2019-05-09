const mysql = require('mysql')
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shopping'
});

db.connect();

app.use(express.static(__dirname));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  //console.log(req.body.user);
  const user = req.body.user;
  console.log(user);
  if (!req.cookies) {
    var insert = `INSERT INTO users (username, email, pswd, address1) 
             VALUES ('${user.name}', '${user.email}', '${user.password}', '${user.line1}')`;

    var findUser = `SELECT * from users WHERE email = '${user.email}'`;
    db.query(insert, (err, data) => {
      if (err) { console.log(err); }
      console.log('Insertion successful, updating cookie with ' + data.insertId);
      res.cookie('user_id', data.insertId);
      res.send('user inserted');
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})

