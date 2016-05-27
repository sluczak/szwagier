var mongoose = require('mongoose');

var serviceTypeSchema = new mongoose.Schema({
        name: {type: String, unique: true}});

var ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

module.exports = ServiceType;