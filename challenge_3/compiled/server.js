const db = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//   res.send(`Hello world!`);
// });


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJkYiIsInJlcXVpcmUiLCJleHByZXNzIiwiYXBwIiwicG9ydCIsInVzZSIsInN0YXRpYyIsIl9fZGlybmFtZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEtBQUtDLFFBQVEsT0FBUixDQUFYO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxTQUFSLENBQWhCO0FBQ0EsTUFBTUUsTUFBTUQsU0FBWjtBQUNBLE1BQU1FLE9BQU8sSUFBYjs7QUFFQUQsSUFBSUUsR0FBSixDQUFRSCxRQUFRSSxNQUFSLENBQWVDLFNBQWYsQ0FBUjs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBSixJQUFJSyxNQUFKLENBQVdKLElBQVgsRUFBaUIsTUFBTTtBQUNyQkssVUFBUUMsR0FBUixDQUFhLGdCQUFlTixJQUFLLEVBQWpDO0FBQ0QsQ0FGRCIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYiA9IHJlcXVpcmUoJ215c3FsJylcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBwb3J0ID0gMzAwMDtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhfX2Rpcm5hbWUpKTtcblxuLy8gYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuLy8gICByZXMuc2VuZChgSGVsbG8gd29ybGQhYCk7XG4vLyB9KTtcblxuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYExpc3RlbmluZyBvbiAke3BvcnR9YCk7XG59KSJdfQ==