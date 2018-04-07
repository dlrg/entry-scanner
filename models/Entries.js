var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entries = new Schema({
    direction: { type: String, enum: ['entry', 'exit'] },
    barcode: { type: String }
},{
    timestamps: { createdAt: 'createdAt' }
});

module.exports = mongoose.model('Entries', Entries);