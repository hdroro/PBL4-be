const mysql = require('mysql2');

const conectDB = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '751359',
  database: 'pbl4',
});

conectDB.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})

module.exports = conectDB;