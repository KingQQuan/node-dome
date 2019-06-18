const mysql = require('mysql');

const cfg = {
  host:'localhost',
  user:'kaikeba_admin',
  password:'wang498.',
  database:'kaikeba'
}

module.exports = {
  query: function(sql, value, callback){
    const conn = mysql.createConnection(cfg);
    conn.connect();
    conn.query(sql, value, callback)
    conn.end();
  }
}