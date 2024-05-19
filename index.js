import express from 'express'
import postgres from 'postgres'
import 'dotenv/config'
const app = express()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require'
})

;(async () => {
  const result = await sql`select version()`
  console.log(`DB connection to ${result[0].version}`)
})()


app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
