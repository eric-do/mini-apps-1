const mysql = require('mysql2')
const Sequelize = require('sequelize');
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

var db = new Sequelize('shopping', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate()
.then(() => {
  console.log('Connection established');
})
.catch(err => {
  console.log('Error connecting to DB: ' + err);
});

const User = db.define('user', {
  username:   { type: Sequelize.STRING },
  email:      { type: Sequelize.STRING }, 
  password:   { type: Sequelize.STRING },
  creditcard: { type: Sequelize.STRING },
  expiration: { type: Sequelize.DATEONLY },
  cvv:        { type: Sequelize.STRING },
  zip:        { type: Sequelize.STRING },
  address1:   { type: Sequelize.STRING },
  address2:   { type: Sequelize.STRING },
  city:       { type: Sequelize.STRING }, 
  state:      { type: Sequelize.STRING },
  billing_zip:{ type: Sequelize.STRING },
  phone:      { type: Sequelize.STRING }
});

User.sync().then(() => {
  console.log('User table synced');
})

app.use(express.static(__dirname));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const user = req.body.user;
  console.log(user);
  if (!user) {
    User.create(user).then(data => {
      console.log('Record ID is: ' + data.id);
      res.send(data.id.toString());
    });
  } else {
    User.upsert(user).then(data => {
      console.log('User updated');
      res.status(200);
    });
  }
});

app.post('/confirmation', (req, res) => {
  const user = req.body.user;
  console.log(user);
  User.findByPk(user.id).then((data) => {
    console.log('user found: ' + JSON.stringify(data.get()));
    res.send(data.get());
  })
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})

