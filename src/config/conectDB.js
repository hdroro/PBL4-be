const mysql = require("mysql2");

const conectDB = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "sa123",
  database: "pbl_4",
});

conectDB.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});

module.exports = conectDB;
