const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({

    text:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    }

    
},
{timestamps: true}
)

// const Todos = mongoose.model('Todos', todoSchema)
// module.exports = Todos

module.exports = mongoose.model('todos', todoSchema)