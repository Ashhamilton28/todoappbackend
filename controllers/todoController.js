mongoose = require('mongoose')
const Todos = require ('../models/Todos')


//*Get todo list
const getTodos= async (req, res)=>{
    try{

        //puts new todos at the top
const allTodos = await Todos.find({}).sort({ createdAt: -1})

//have access to all todos
//200 means success
res.status(200).send(allTodos)
    }catch(error){
res.status(400).send(error.message)
    }
}


//*create todo
const createTodo= async (req, res)=>{
    //Todos is the todo from models
    console.log(req.body)
    const todos = req.body
    try{

const newTodo = await Todos.create(todos)
console.log(newTodo)
res.status(201).send(newTodo)
    }catch(error){
res.status(500).send(error.message)
    }
}


//*update todo
const updateTodo= async (req, res)=>{
  const {id}=req.params
    try{
        //check if the id is valid
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No todo with this id: ${id}`)
}
const todoID = {_id: id}
const update = { completed: true}
const updateTodo = await Todos.findOneAndUpdate(todoID)
if(!updateTodo){
    return res.status(404).send(`No todo with this id: ${id}`)
}
res.status(200).send(updateTodo)
    }catch(error){
res.status(500).send(error.message)
    }
}


//*delete todo
const deleteTodo= async (req, res)=>{
    const {id}=req.params
      try{
          //check if the id is valid
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send(`No todo with this id: ${id}`)
  }
  
  const deleteTodo = await Todos.findOneAndDelete({_id: id})

  res.status(200).send(deleteTodo)
      }catch(error){
  res.status(500).send(error.message)
      }
  }

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}