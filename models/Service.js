var mongoose = require('mongoose'), Schema = mongoose.Schema;

var serviceSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    type: { type: Schema.Types.ObjectId, ref: 'ServiceType', index: true },
    url: { type: String, unique: true},
    status: { type: Schema.Types.ObjectId, ref: 'ServiceStatus', index: true }
}, { timestamps: true });

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service;