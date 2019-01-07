const mongoose = require('../config/mongoose-setup');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String
    },
    listId: {
        type: Number
    },
    todoId: {
        type: Number
    },
    done: {
        type: Boolean,
        default: false
    }
});

schema.plugin(AutoIncrement, { id: 'idNumber', inc_field: 'todoId', reference_fields: ['listId'] });

module.exports.Todo = mongoose.model('Todo', schema);
