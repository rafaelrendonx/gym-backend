require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Equipamiento = require('./models/equipamiento')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/info', (request, response) => {
    let info = `<p>Home</p>`
    response.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})