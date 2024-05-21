import express from 'express'
import { tasksRouter } from './routes/tasks.js'
const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use('/tasks', tasksRouter)

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000')
})
