const mongoose = require('mongoose');

const schemaObj =   {
    content: {type: String,required: true},
    date: {type: Date,default: Date.now}}

const todoTaskSchema = new mongoose.Schema(schemaObj)
    
module.exports = mongoose.model('TodoTask',todoTaskSchema);