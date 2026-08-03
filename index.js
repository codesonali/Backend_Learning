const express=require('express');
const app=express();
const path=require('path');

//parsers fo form
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//setting public staic files
app.use(express.static(path.join(__dirname,'public')));

//for ejs
app.set('view engine','ejs')

app.get("/",function(req,res){
    res.render("index");
});

// app.get("/",function(req,res){
//     res.send("Chal rha hai")
// });

//Dynamic Routing
app.get("/profile/:username",function(req,res){
    res.send(`Welcome,${req.params.username}`);
})
app.get("/author/:username/:age",function(req,res){
    res.send(`Welcome,${req.params.username} of age ${req.params.age}`)
})

app.listen(3000,function(){
    console.log("its running")
})