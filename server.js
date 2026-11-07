import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';


dotenv.config();
const app = express();






// middleware


app.use (cors());
app.use(express.json());

//connect to database
connectDB();
//routes
app.use('/api/todos', todoRoutes); 
//error handler
app.use(errorHandler);


 // start server 
 const PORT = process.env.PORT || 3000;
 app.listen(PORT,() =>{
    console.log('server is running on http://localhost:${PORT}');
 });