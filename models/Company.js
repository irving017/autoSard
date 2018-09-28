const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  companyName:{
    type:String,
    unique: true,
    required:true
  },
  location:{
    type:{
      type:String,
      default:'Point'
    },
    address:String,
    coordinates:[{
      type:Number
    }]
  },
  contact:{
    type:String,
    required:true
  },
  users:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  routes:[{
    type:Schema.Types.ObjectId,
    ref:'Route'
  }]
})

module.exports = mongoose.model('Company',companySchema)