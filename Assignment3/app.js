const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')

const users = [
    {name:"shehbaz",email:"shehbazwaasi@gmail.com",age:23,city:"kurnool",profession:"FullStack developer"},
    {name:"sandeep",email:"sandeepsanju@gmail.com",age:22,city:"kurnool",profession:"Support engineer"},
    {name:"sarfaraz",email:"smdsarfaraz@gmail.com",age:22,city:"kurnool",profession:"App developer"}
]
// set the template engine
app.set('view engine','ejs');
//set the location of templates
app.set('views',path.join(__dirname,'views'));

app.use(bodyparser.urlencoded({extend : true}));


app.get("/",function(req,res){
    res.render('homepage.ejs',{users})
})

app.get("/form",function(req,res){
    res.render("form.ejs")
})

app.post("/user/add",function(req,res){
    console.log(req.body)
    users.push(req.body)
    res.redirect("/")
})

app.listen(5000,function (){
    console.log("server started")
})