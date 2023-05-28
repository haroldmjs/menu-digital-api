const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(express.json())

app.use(logger)

app.use(cors())

let notes = [
  {
    id: 1,
    content: 'Tengo Hambre',
    content: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 2,
    content: 'Tengo Sueño',
    content: '2019-05-30T18:39:34.091Z',
    'impo,rtant': false
  },
  {
    id: 3,
    content: 'Tengo Hambre otra vez',
    content: '2019-05-30T18:39:34.091Z',
    important: false
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(el => el.id === Number(id))

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(el => el.id !== Number(id))
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  res.json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`)
})
