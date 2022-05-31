const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const todoSchema = require("./schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

const app = express();
app.set("view engine", "ejs");
dotenv.config();
// request parsers
// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database connection
mongoose
  .connect(process.env.APP_MONGO_CONNECTION, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully!!!"))
  .catch((err) => console.log(err));

//set Routers
//get todos from database
app.get("/", async (req, res) => {
  const todos = await Todo.find({}).sort("-date");
  res.render("index", { todos });
});

//post todos -- handleform`
// app.post("/", async (req, res) => {
//   const text = req.body.text.trim();
//   if (text == "") {
//     return res.redirect("/");
//   }
//   const newTodo = new Todo({
//     text,
//   });
//   await newTodo.save();
//   res.redirect("/");
// });
app.post("/", async (req, res) => {
  //todo object that will insert into database
  //new document object create
  //single document object insert way
  const assignee = req.body.assignee.trim();
  const text = req.body.text.trim();
  const createNewTodo = new Todo({
    assignee: assignee,
    text: text,
  });
  //actual document is created
  //newTodo will enter in the database
  await createNewTodo.save((err) => {
    //save is the instance method
    if (err) {
      res.status(500).send("There was a server error in saving Todo");
      res.end();
    } else {
      res.redirect("/");
    }
  });
});

//delete post
// app.delete("/", async (req, res) => {});
app.get("/:id/deleteTask", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

//initiate
app.listen(process.env.PORT, () => {
  console.log(` Listening to PORT : ${process.env.PORT}`);
});
