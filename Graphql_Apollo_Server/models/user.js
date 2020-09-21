const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const USER = new Schema({
     name : String,
     email : {
          type : String,
          required : true,
     },
     password : {
        type:String,
        required : true 
     },
}) 


const Users = mongoose.model('Users', USER);

module.exports = Users;