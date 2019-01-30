const mongoose = require('../config/mongoose-setup');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    owners: {
        type: [Number],
        required: true
    },
    todos: {
        type: [Number]
    }
});

schema.statics.removeUsersListsById = function(userId, cb) {
    console.log('user in removeUsersListsById, userId: ', userId);
    this.find({ "owners": userId }, (err, lists) => {
        if (err) {
            console.log(err);
        } else {
            lists.forEach(list => {
                if (list.owners.length > 1) {
                    console.log('list in removeUsersListsById', list);
                    const ownerIndex = list.owners.indexOf(userId);
                    list.owners.splice(ownerIndex, 1);
                    list.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User ', userId, + ' lost access to List', list.id);
                            cb();
                        }
                    })
                } else {
                    const todosId = list.todos.slice();

                    todosId.forEach(todoId => {
                        mongoose.model('Todo').find({todoId}).remove((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('User\'s Todo is removed');
                            }
                        })
                    });

                    list.remove((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User\'s List is removed');
                        }
                    });
                }
            });
        }
    })
}

schema.statics.removeTodo = function(todoId, cb) {
    this.findOne({ todos: todoId }, (err, list) => {
        if (err) {
            console.log(err);
        } else {
            console.log('list in removeTodo', list);
            const todoIndex = list.todos.indexOf(todoId);
            list.todos.splice(todoIndex, 1);
            list.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Deleting todo in list is done');
                    if(typeof cb === 'function'){
                        cb();
                    }
                }
            })
        }
    });
}

schema.pre('remove', function(next) {
    console.log('Pre remove list');
    mongoose.model('Todo').deleteByListId(this.id);
    next();
});

schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports.List = mongoose.model('List', schema);
