const mysql = require('serverless-mysql')
// const mysql = require('serverless-mysql')

const config = {
  host: 'localhost',
  database: process.env.MYSQL_DATABASE || 'tech_blog',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password'
}

if(process.env?.MYSQL_SOCKET) {
  config['socketPath'] = process.env.MYSQL_SOCKET;
}

const db = mysql({
  config
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
// Expression #5 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'tech_blog.bl.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
exports.transaction = async queries => {
  let tx = await db.transaction()
  queries.forEach(query => {
    tx.query(query)
  });
  tx.rollback(e => { console.log(e) }).commit() // execute the queries
  return tx;
}
