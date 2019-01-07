const mongoose = require('../config/mongoose-setup');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String
    },
    owners: {
        type: [String]
    },
    todos: {
        type: Array
    }
});

schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports.List = mongoose.model('List', schema);
