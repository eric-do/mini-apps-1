const mysql = require('mysql2');
const Sequelize = require('sequelize');
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

var db = new Sequelize('shopping', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate().then(() => {
  console.log('Connection established');
}).catch(err => {
  console.log('Error connecting to DB: ' + err);
});

const User = db.define('user', {
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  creditcard: { type: Sequelize.STRING },
  expiration: { type: Sequelize.DATEONLY },
  cvv: { type: Sequelize.STRING },
  zip: { type: Sequelize.STRING },
  address1: { type: Sequelize.STRING },
  address2: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  billing_zip: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING }
});

User.sync().then(() => {
  console.log('User table synced');
});

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
  User.findByPk(user.id).then(data => {
    console.log('user found: ' + JSON.stringify(data.get()));
    res.send(data.get());
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJteXNxbCIsInJlcXVpcmUiLCJTZXF1ZWxpemUiLCJwYXJzZXIiLCJleHByZXNzIiwiYXBwIiwicG9ydCIsImRiIiwiaG9zdCIsImRpYWxlY3QiLCJhdXRoZW50aWNhdGUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIiwiVXNlciIsImRlZmluZSIsInVzZXJuYW1lIiwidHlwZSIsIlNUUklORyIsImVtYWlsIiwicGFzc3dvcmQiLCJjcmVkaXRjYXJkIiwiZXhwaXJhdGlvbiIsIkRBVEVPTkxZIiwiY3Z2IiwiemlwIiwiYWRkcmVzczEiLCJhZGRyZXNzMiIsImNpdHkiLCJzdGF0ZSIsImJpbGxpbmdfemlwIiwicGhvbmUiLCJzeW5jIiwidXNlIiwic3RhdGljIiwiX19kaXJuYW1lIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsInBvc3QiLCJyZXEiLCJyZXMiLCJ1c2VyIiwiYm9keSIsImNyZWF0ZSIsImRhdGEiLCJpZCIsInNlbmQiLCJ0b1N0cmluZyIsInVwc2VydCIsInN0YXR1cyIsImZpbmRCeVBrIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldCIsImxpc3RlbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsUUFBUUMsUUFBUSxRQUFSLENBQWQ7QUFDQSxNQUFNQyxZQUFZRCxRQUFRLFdBQVIsQ0FBbEI7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGFBQVIsQ0FBZjtBQUNBLE1BQU1HLFVBQVVILFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1JLE1BQU1ELFNBQVo7QUFDQSxNQUFNRSxPQUFPLElBQWI7O0FBRUEsSUFBSUMsS0FBSyxJQUFJTCxTQUFKLENBQWMsVUFBZCxFQUEwQixNQUExQixFQUFrQyxJQUFsQyxFQUF3QztBQUMvQ00sUUFBTSxXQUR5QztBQUUvQ0MsV0FBUztBQUZzQyxDQUF4QyxDQUFUOztBQUtBRixHQUFHRyxZQUFILEdBQ0NDLElBREQsQ0FDTSxNQUFNO0FBQ1ZD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SW9ELE1BQUosQ0FBV25ELElBQVgsRUFBaUIsTUFBTTtBQUNyQk0sVUFBUUMsR0FBUixDQUFhLGdCQUFlUCxJQUFLLEVBQWpDO0FBQ0QsQ0FGRCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBteXNxbCA9IHJlcXVpcmUoJ215c3FsMicpXG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IHBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IDMwMDA7XG5cbnZhciBkYiA9IG5ldyBTZXF1ZWxpemUoJ3Nob3BwaW5nJywgJ3Jvb3QnLCBudWxsLCB7XG4gIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0OiAnbXlzcWwnXG59KTtcblxuZGIuYXV0aGVudGljYXRlKClcbi50aGVuKCgpID0+IHtcbiAgY29uc29sZS5sb2coJ0Nvbm5lY3Rpb24gZXN0YWJsaXNoZWQnKTtcbn0pXG4uY2F0Y2goZXJyID0+IHtcbiAgY29uc29sZS5sb2coJ0Vycm9yIGNvbm5lY3RpbmcgdG8gREI6ICcgKyBlcnIpO1xufSk7XG5cbmNvbnN0IFVzZXIgPSBkYi5kZWZpbmUoJ3VzZXInLCB7XG4gIHVzZXJuYW1lOiAgIHsgdHlwZTogU2VxdWVsaXplLlNUUklORyB9LFxuICBlbWFpbDogICAgICB7IHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcgfSwgXG4gIHBhc3N3b3JkOiAgIHsgdHlwZTogU2VxdWVsaXplLlNUUklORyB9LFxuICBjcmVkaXRjYXJkOiB7IHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcgfSxcbiAgZXhwaXJhdGlvbjogeyB0eXBlOiBTZXF1ZWxpemUuREFURU9OTFkgfSxcbiAgY3Z2OiAgICAgICAgeyB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HIH0sXG4gIHppcDogICAgICAgIHsgdHlwZTogU2VxdWVsaXplLlNUUklORyB9LFxuICBhZGRyZXNzMTogICB7IHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcgfSxcbiAgYWRkcmVzczI6ICAgeyB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HIH0sXG4gIGNpdHk6ICAgICAgIHsgdHlwZTogU2VxdWVsaXplLlNUUklORyB9LCBcbiAgc3RhdGU6ICAgICAgeyB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HIH0sXG4gIGJpbGxpbmdfemlwOnsgdHlwZTogU2VxdWVsaXplLlNUUklORyB9LFxuICBwaG9uZTogICAgICB7IHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcgfVxufSk7XG5cblVzZXIuc3luYygpLnRoZW4oKCkgPT4ge1xuICBjb25zb2xlLmxvZygnVXNlciB0YWJsZSBzeW5jZWQnKTtcbn0pXG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lKSk7XG5hcHAudXNlKHBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShwYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcblxuYXBwLnBvc3QoJy8nLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgdXNlciA9IHJlcS5ib2R5LnVzZXI7XG4gIGNvbnNvbGUubG9nKHVzZXIpO1xuICBpZiAoIXVzZXIpIHtcbiAgICBVc2VyLmNyZWF0ZSh1c2VyKS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1JlY29yZCBJRCBpczogJyArIGRhdGEuaWQpO1xuICAgICAgcmVzLnNlbmQoZGF0YS5pZC50b1N0cmluZygpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBVc2VyLnVwc2VydCh1c2VyKS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1VzZXIgdXBkYXRlZCcpO1xuICAgICAgcmVzLnN0YXR1cygyMDApO1xuICAgIH0pO1xuICB9XG59KTtcblxuYXBwLnBvc3QoJy9jb25maXJtYXRpb24nLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgdXNlciA9IHJlcS5ib2R5LnVzZXI7XG4gIGNvbnNvbGUubG9nKHVzZXIpO1xuICBVc2VyLmZpbmRCeVBrKHVzZXIuaWQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZygndXNlciBmb3VuZDogJyArIEpTT04uc3RyaW5naWZ5KGRhdGEuZ2V0KCkpKTtcbiAgICByZXMuc2VuZChkYXRhLmdldCgpKTtcbiAgfSlcbn0pO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYExpc3RlbmluZyBvbiAke3BvcnR9YCk7XG59KVxuXG4iXX0=