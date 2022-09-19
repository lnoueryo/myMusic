const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'tech_blog',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password'
  }
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

exports.transaction = async queries => {
  let tx = await db.transaction()
  queries.forEach(query => {
    tx.query(query)
  });
  tx.rollback(e => { console.log(e) }).commit() // execute the queries
  return tx;
}
