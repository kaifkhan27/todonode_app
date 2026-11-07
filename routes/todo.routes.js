import express from "express";
import {createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo,} from '../controllers/todo.controller.js';

const route = express.Router();

 //  create TODO

 route.post('/add', createTodo);
// get todo

route.get('/', getTodos);

 //get todo by id
route.get('/:id', getTodoById);
//update todo
route.put('/:id', updateTodo);
//toggle todo
route.patch('/:id/toggle', toggleTodo);
// delete todo
route.delete('/:id', deleteTodo);

 export default route;

