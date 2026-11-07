import Todo from "../models/todo.models.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";

//create todo --- postapi
export const createTodo = asyncHandler(async(req, res) => {
    
         const {title, description} = req.body;

         // validation

         if  (!title ||  title.trim() === ""){
            return res.send(400).json({
                success: false,
                message: "Title is require",

            });
         }

         const todo  = await Todo.create({
            title,
            description,
         })
         return res.status(500).json({
            success: true,
            message: "Todo created  successfully",
            todo,
         });

    
});


//GET api

export const getTodos = asyncHandler(async (req, res) =>{
   
        const{ search, sort, page=1, limit=10} = req.query;

        /// base query 
        let query ={};

        // search by title

        if(search){
            query.title ={ $regex: search, $options: "i"};

        }

        // sorting
        let sortOption ={};
        if(sort === "asc") sortOption.createdAt =1;
        else sortOption.createdAT = -1;

        // pagination 
        const skip = (page -1) * limit;
        const todos = await Todo.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));

            const totalTodos = await Todo.countDocuments(query);
            return res.status(200).json({
                success: true,
                message: "Todos feched succesfully",
                total: totalTodos,
                page: Number(page),
                limit: Number(limit),
                data: todos,
            });

   

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  
});

// get todo by id get api

export const getTodoById = asyncHandler(async(req, res) =>{
    

        const { id } = req.params;

        // valid id from mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
            const todo = await Todo.findById(id);
            // todo not found
            if(!todo){
                return res.status(404).json({
                    success: false,
                    message: "Todo not found",
                });
            }
            // if todo found
            return res.status(200).json({
                success: true,
                message: "Todo fetched successfully",
                data: todo,


            });
        
        }
   
    
});

// update todo

export const updateTodo = asyncHandler(async (req,res) => {
       const {id} = req.params;
              const{ title, description} = req.body;

              // valid id based on mongoose
 if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }
        // vaild input
        if(!title || title.trim() ==="") {
            return res.status(400).json({
                success: false,
                message:"Title is require",
            });
        }

            //update todo
            const todo = await Todo.findByIdAndUpdate(
                id,
                
                    {title, description},
                    {new: true, runValidators: true }
                );
                
             // if todo found
            return res.status(200).json({
                success: true,
                message: "Todo fetched successfully",
                data: todo,


            });
        

    
    

});

// toggle todo
export const toggleTodo = asyncHandler(async (req, res) => {
             
        const {id} = req.params;
 // valid id based on mongoose
 if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        // get current todo


   
const todo = await Todo.findById(id);

if (!todo) {
  return res.status(404).json({
    success: false,
    message: "Todo not found",
  });
}

// Toggle true to false, or false to true
todo.isCompleted = !todo.isCompleted;

await todo.save();

return res.status(200).json({
  success: true,
  message: "Todo status updated successfully",
  data: todo,
});




});

// delete todo

export const deleteTodo = asyncHandler(async (req, res) =>{
   
        const { id } = req.params;

         // valid id from mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }
        const todo = await Todo.findByIdAndDelete(id);
         // if todo found
            return res.status(200).json({
                success: true,
                message: "Todo fetched successfully",
                data: todo,

            });
            
        
   
    
        });
