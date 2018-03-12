
var mongoose =require("mongoose");
var Schema = mongoose.Schema;
var obj = {
    title:String,
    content:String,
    time:String,
    author:String,
    classify:String,
    comment:String,
    like:Number
}
var model = mongoose.model("article",new Schema(obj));
module.exports = model;