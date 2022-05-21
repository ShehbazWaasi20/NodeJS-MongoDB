const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const { default: mongoose } = require('mongoose')
const user = require('./model/user')
const methodoverride = require('method-override');



async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Assignment_4',function(err){
            console.log(err)
            setup()
        });
    }
    catch(e){
        console.log(e)
    }
}

function setup(){
    // set the template engine
    app.set('view engine','ejs');
    //set the location of templates
    app.set('views',path.join(__dirname,'views'));

    app.use(methodoverride('_method'));

    app.use(bodyparser.urlencoded({extend : true}));


    app.get("/",async function(req,res){
        const users = await user.find()
        console.log(users)
        res.render('homepage.ejs',{users})
    })

    app.get("/form",function(req,res){
        res.render("form.ejs")
    })

    app.post("/user/add",async function(req,res){
        console.log(req.body)
        await user.create(req.body)
        res.redirect("/")
    })

    app.put("/user/:id" ,async function(req,res){
            const userToUpdate = await user.findOne({_id: mongoose.Types.ObjectId(req.params.id)});
            console.log(userToUpdate);
            await user.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            $set  : {isPromoted : !userToUpdate.isPromoted}
        });
        res.redirect('/')
    })

    app.delete("/user/:id" ,async function(req,res){
        await user.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)});
        res.redirect('/');
    })

    app.listen(5000,function(){
        console.log("server started at port {http://localhost:5000}")
    })

}

main()



