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

schema.statics.findByListId = function(listId, cb) {
    return this.find({ listId }, cb);
};

schema.pre('remove', function(next) {
    mongoose.model('List').removeTodo(this.todoId);
    next();
});

schema.statics.deleteByListId = function(listId) {
    this.deleteMany({ listId }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
};

schema.plugin(AutoIncrement, { id: 'idNumber', inc_field: 'idInList', reference_fields: ['listId'] });
schema.plugin(AutoIncrement, { inc_field: 'todoId' });

module.exports.Todo = mongoose.model('Todo', schema);
