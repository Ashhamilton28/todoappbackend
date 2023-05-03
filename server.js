const express = require ('express')
const mongoose = require('mongoose')
const Cors = require('cors')

require('dotenv').config()


//auth
require('./config/database'); // connects to db
const path = require('path'); // node module
const favicon = require('serve-favicon');
const logger = require('morgan');

const {
getTodos, createTodo, updateTodo, deleteTodo,
} = require('./controllers/todoController')



// configuration
const app = express()
const PORT = process.env.PORT || 3001



//middleware
app.use(express.json())
app.use(Cors())

//auth middle ware
//* Config
// Logger middleware
app.use(logger('dev'));
// JSON payload middleware (for data coming from frontend functions)
// app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));
// checks if token was sent and sets a user data on the req (req.user)
app.use(require('./config/checkToken'));
//auth
// * All other routes
app.use('/api/users', require('./routes/api/users'));
//auth

// Put API routes here, before the "catch all" route
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })


//Get Todos
app.get('/todos', getTodos)

//Create Todos
app.post('/todos', createTodo)

//Update Todo
app.put('/todos/:id', updateTodo)

//delete Todo
app.delete('/todos/:id', deleteTodo)

// Tell the app to listen on port 3000
app.listen(3001, () => {
    console.log(`Server running on  port: ${PORT}`);
    // mongoose.set('strictQuery', true)
    // // connect to mongodDB
    // mongoose.connect(process.env.DATABASE_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // })
    // mongoose.connection.once('open', () => {
    //     console.log('Connected to MongoDB!')
    // })
})