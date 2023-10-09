import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connection } from "./database/db.js";
import { UserModel } from "./model/authModel.js";
import { TodoModel } from "./model/todoModel.js";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new UserModel({ email, password });
  await user.save();
  if (user) {
    res.status(200).json({ message: "signup successful" });
  } else {
    res.status(400).json({ message: "signup failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const authenticatedUser = await UserModel.findOne({ email });
  if (authenticatedUser) {
    const token = jwt.sign({ foo: "foo" }, process.env. SECRET_KEY);
    res.status(200).json({ message: "login successful", token });
  } else {
    res.status(400).json({ message: "login failed" });
  }
});
app.get("/gettodo", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/updatetodo", async (req, res) => {
  try {
    const { id, task } = req.body;
    const todo = await TodoModel.findOneAndUpdate({ _id: id }, { task });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/updatetodostatus", async (req, res) => {
  try {
    const { id, status } = req.body;
    const newStatus = status === "pending" ? "done" : "pending";
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id },
      { status: newStatus }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/deletetodo", async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await TodoModel.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/addtodo", async (req, res) => {
  const { task, status, tag } = req.body;
  const todo = new TodoModel({ task, status, tag });
  await todo.save();
  res.status(200).json({ message: "todos added successful" });
});

const PORT = process.env.PORT;
connection();
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}...`);
});
