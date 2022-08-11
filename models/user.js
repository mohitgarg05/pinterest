const mongoose = require('mongoose'); 
const UserSchema = new mongoose.Schema({
    userEmail : {
        type:String,
        unique : true,
        required : true
    },
    userName:{
        type:String,
        required : true
    },
    userImage:{
        type:String,
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
        description : String,
        alt_description : String,
        about : String,
        image : String
    }],
    userSaved :[{
        image : String,
        alt_description : String,
        description : String

    }]
  
})

module.exports = mongoose.models.user || mongoose.model('user' , UserSchema);

