const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routeSchema = new Schema({
  start:{
    type:{
      type:String,
      default:'Point'
    },
    address:String,
    coordinates:[{
      type:Number
    }]
  },
  destiny:{
    type:{
      type:String,
      default:'Point'
    },
    address:String,
    coordinates:[{
      type:Number
    }]
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  company:{
    type:Schema.Types.ObjectId,
    ref:'Company'
  },
  time:String,
  seats:Number,
  TE:Number,
  passenger:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }]
})

module.exports = mongoose.model('Route',routeSchema)