var mongoose = require('mongoose');

var serviceStatusSchema = new mongoose.Schema({
        name: {type: String, unique: true}});

var ServiceStatus = mongoose.model('ServiceStatus', serviceStatusSchema);

module.exports = ServiceStatus;