'use strict';

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = new mongoose.Schema({
	itemno: String,
	name: String,
	quantity: String

});

var Items = module.exports = mongoose.model('Items', ItemsSchema );

module.exports.addItem = function(newItem, callback){
    newItem.save(callback);
}

module.exports.getAllItems = function(callback){
	Items.find({},callback);
}

module.exports.deleteStudent = function(_id,callback){
    Items.remove( { itemno :_id },callback );
};

module.exports.updatePendingStatus = function(id,cid,callback){
	Enroll.update({ userId:id,courseId:cid },{ $set:{ pendingStatus:"0" }},callback);
};