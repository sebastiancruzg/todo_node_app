import express from 'express'
import { sql } from '../postgresql/db_connection.js'

export const tasksRouter = express()

tasksRouter.route('/')
  .get(async (req, res) => {
    const result = await sql`
      SELECT *
      FROM tasks
    `
    res.send(result)
  })

  .post(async (req, res) => {
    const { title, description, complete } = req.body

    if (!title || title === '') {
      return res.status(400).send('title not valid')
    }
    if (!description || description === '') {
      return res.status(400).send('description not valid')
    }
    if (complete && ![0, 1].includes(complete)) {
      return res.status(400).send('complete not valid')
    }
    try {
      const insert = await sql`
        INSERT INTO tasks
        (title, description, complete)
        VALUES (${title}, ${description}, ${complete ?? 0})
        RETURNING *
      `
      return res.status(201).send(insert)
    } catch (error) {
      res.status(500).send({ error: 'Error saving the data in the database', details: error.message })
    }
  })

tasksRouter.route('/:id')

  .delete(async (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).send('invalid id')
    }

    try {
      await sql`
        DELETE
        FROM tasks
        WHERE id = ${id}
      `
      return res.status(200).send('Task deleted succesfuly')
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete the record from the database.', details: error.message })
    }
  })


