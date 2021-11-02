const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req , res){
    res.sendFile(__dirname + "/index.html");
});
mongoose.connect("mongodb://localhost:27017/personalDB",{ useNewUrlParser: true ,  useUnifiedTopology: true });
const personSchema = {
    firstName: {
     type :  String,
     required : true,
     min : 2 ,
     max : 20 
    } ,
    lastName: {
        type :  String,
        required : true,
        min : 2 ,
        max : 20 
    } ,
    email : {
        type: String,
        lowercase: true,
        required : true
    } ,
    password : {
        type : String,
        min : 6,
        required : true
    } ,
    mobileNo : {
       type : Number,
       required : true,
    } ,
    location : {
        type : String,
        required : true
    } ,
    dateofBirth : String ,
    JobTitle : {
        type : String,
        required : true
    } ,
    experience : {
     type : Number,
     required : true
    } ,
    resume : {
        type : String,
        required : true
    } ,
    desiredSalary : {
        type : Number,
        required : true
    } ,
    employeetype : {
        type : String,
        required : true
    } ,
    willingToRelocate : {
        type : String,
        required : true
    } ,
    visaStatus : {
        type : String,
        required : true
    }
};
const Person = mongoose.model("Person", personSchema);

app.post("/jobseekerreg", function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newPerson = new Person({
    firstName : req.body.fname ,
    lastName : req.body.lname ,
    email : req.body.email ,
    password : hash ,
    mobileNo : req.body.mobile ,
    location : req.body.location ,
    dateofBirth : req.body.date ,
    JobTitle: req.body.title ,
    experience : req.body.experience ,
    resume : req.body.resume ,
    desiredSalary: req.body.salary ,
    employeetype : req.body.employment ,
    willingToRelocate : req.body.relocate ,
    visaStatus: req.body.visa
    });
    newPerson.save(function(err){
        if(!err){
            res.send("Sucessfully added new Person");
        }
        else {
            res.send(err);
        }
    });
});
});
app.listen(3000, function() {
 console.log("Server listening on port 3000");
});