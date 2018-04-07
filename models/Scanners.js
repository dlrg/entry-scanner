var mongoose = require('mongoose');
var hat = require('hat');
var Schema = mongoose.Schema;

var Scanners = new Schema({
    name: { type: String, default: '' },
    token: { type: String, default: () => {
        return hat();
    } },
    direction: { type: String, enum: ['entry', 'exit'] }
});

module.exports = mongoose.model('Scanners', Scanners);