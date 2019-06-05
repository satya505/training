var express=require('express');
var path=require("path")
var app=express();

app.use(express.static("public"))

app.get("/sam",(req,res)=>{
	res.sendFile(path.join(__dirname,"public/sam.html"))
})

app.get("/",function(req,res){
	res.send("welcome to Akrivia  sasatya sa");

})
app.listen(8000,function(){
	console.log("server is started");
})