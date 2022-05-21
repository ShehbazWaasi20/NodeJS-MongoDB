const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    isPromoted : {
        type : Boolean,
        default : null 
    },
    age : {type:Number },
    city : {type:String},
    profession : {type:String}
})


module.exports = mongoose.model('user',userSchema);