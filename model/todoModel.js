import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
   task:{type: String, required:true},
   status:{type: String, enum:["pending", "done"], default:"pending"},
   tag:{type: String, enum:["personal", "official", "family"], default:"personal"}
})
export const TodoModel = mongoose.model('todo', todoSchema)

