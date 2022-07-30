const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    userEmail : {
        type:String,
        unique : true,
        required : true
    },
    userAge:{
        type:String,
        required : true
    },
    userGender:{
        type:String,
        required : true
    },
    userInterest:[{
        type:String
    }],
    userPins:[{
        title : String,
        discription : String,
        about : String,
        imgae : String
    }]
  
})

module.exports = mongoose.models.user || mongoose.model('user' , UserSchema);

