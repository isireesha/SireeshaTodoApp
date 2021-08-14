const express =require('express');
const app=express();
const dotenv =require('dotenv'); 
const mongoose =require('mongoose');
const TodoTask = require("./models/TodoTask");


dotenv.config();


app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("view engine", "ejs");

app.get("/edit/:id",(req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})

app.post("/edit/:id",(req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


//Delete
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
    });


app.get('/', (req,res)=>{
    TodoTask.find({},(err,tasks)=>{
        res.render('todo.ejs', {todoTasks:tasks});
    })
    
});
app.post('/',async (req, res) =>
 {
    const todoTask =new TodoTask({
        content:req.body.content
    });

    try {
        await todoTask.save();
        res.redirect("/");
    } 
    catch (err) {
        res.redirect("/");
    }
    
});


mongoose.set("useFindAndModify",false);
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true },
    ()=>{
        console.log("connected to db!");
        app.listen(3000,()=>console.log("server up and running"));
        
});