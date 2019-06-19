(async () => {
  const mysql = require('mysql2/promise')
  // 连接配置
  const cfg = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'wqq123',
    database: 'kaikeba'
  }
  // create the connection
  const connection = await mysql.createConnection(cfg);
  // console.log('conn:',connection)

  // 创建表
  let ret = await connection.execute(`
  CREATE TABLE IF NOT EXISTS test (
      id INT NOT NULL AUTO_INCREMENT,
      message VARCHAR(45) NULL,
  PRIMARY KEY (id))
`)
  // console.log('ret:',ret)

  // 插入一条数据
  // ret = await connection.execute(`
  //   INSERT INTO test(message) VALUE(?)
  // `,['abc'])

  // 查询
  const [rows, fields] = await connection.execute(`
    SELECT * FROM test
  `)
  console.log('select:', JSON.stringify(rows))
})()