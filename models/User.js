const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  email: String,
  username: {
    type:String,
    required:true,
    unique:true
  },
  completeName:String,
  age:Number,
  companyName:{
    type:String,
    required:true
  },
  companyId:{
    type:Schema.Types.ObjectId,
    ref:'Company'
  },
  photoURL:{
    type:String,
    default:'https://static.npmjs.com/c9e19250d48d66f0e9c70c9b3991bbdb.png'
  },
  routes:[{
    type:Schema.Types.ObjectId,
    ref:'Route'
  }],
  preferences:{
    music:String,
    smoke:{
      type:String,
      enum:['Si','No']
    },
    descripcion:String
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    default:1
  },
  car:{
    type:String,
    enum:['Si','No']
  }
})

userSchema.plugin(PLM,{usernameField:'email'})
module.exports = mongoose.model('User',userSchema)