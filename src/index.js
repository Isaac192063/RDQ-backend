const express = require('express')
const patch = require('path');
const morgan = require('morgan');
const cors = require('cors')
const routesUsers = require('./routes/user.routes')
const PORT = require('./config/port')
const app = express()

console.log(PORT)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(cors())

app.use(express.static(patch.join(__dirname, 'public')))

app.use('/api/user',routesUsers)


app.listen(PORT)
console.log(`puerto: ${PORT}`)