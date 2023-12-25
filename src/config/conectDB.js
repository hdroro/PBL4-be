const mysql = require("mysql2");
require("dotenv").config();

let dbConfig;

if (process.env.NODE_ENV === "development") {
  dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "sa123",
    database: "pbl_4",
  };
} else {
  dbConfig = {
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
  };
}

const conectDB = mysql.createConnection(dbConfig);

conectDB.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
});

module.exports = conectDB;
