const mongoose = require('mongoose');

const bucketListSchema = new mongoose.Schema({
    name: String,
	img: String,
	language: String,
    currency: String,
	visited: Boolean,
    thingsToDo: [String]
});

const bucketList = mongoose.model('bucket_list', bucketListSchema);

module.exports = bucketList; //this needs to match the const above