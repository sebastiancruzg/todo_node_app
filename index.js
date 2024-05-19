import express from 'express'
import { sql } from './postgresql/db_connection.js'
const app = express()


app.get('/todos', (req, res) => {
  console.log('Antes de hacer el query')
  const result = sql`
  SELECT *
  FROM todos`
  console.log('Despues de hacer el query')
  res.send(result)
})

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
