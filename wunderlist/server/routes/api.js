const router = require('express').Router();
const User = require('../models/user').User;
const List = require('../models/list').List;
const Todo = require('../models/todo').Todo;

router.get('/username', (req, res) => {
    const username = req.user.username ? req.user.username : req.user.githubUserName;
    res.send(JSON.stringify({ username }));
});

router.get('/user/me', (req, res) => {
    if (!req.user) {
        res.status(401).send('Unauthorized');
    } else {
        const userId = req.user.userId;

        User.findOne({ userId }, (err, user) => {
            if (err) {
                res.status(500).send(err);
                console.log(err.message);
            } else {
                res.send(user);
            }
        });
    }
});

router.put('/user/me', (req, res) => {
    const userId = req.user.userId;
    const newUserData = req.body;

    User.findOne({ userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
            console.log(err.message);
        } else {
            const updatedUser = Object.assign(user, newUserData);

            updatedUser.save((err, user) => {
                if (err) { 
                    res.status(500).send(err);
                    console.log(err.message);
                } else {
                    res.status(200).send(user);
                }
            });
        }
    });
});

router.delete('/user/me', (req, res) => {
    const userId = req.user.userId;
    
    User.findOne({ userId }, (err, user) => {
        user.remove((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    })
});

router.post('/lists', (req, res) => {
    const userId = req.user.userId;
    const listName = req.body.name;

    new List({ name: listName, owners: userId })
        .save((err, list) => {
            if (err) { 
                res.status(500).send(err);
                console.log(err);
            }
            res.send(list);
})});

router.get('/lists', (req, res) => {
    const userId = req.user.userId;

    List.find({ owners: userId }, (err, lists) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            res.send(lists);
        }
    });
});

router.get('/lists/:id', (req, res) => {
    const userId = req.user.userId;
    const listId = req.params.id;
    
    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else if (list) {
            if (!list.owners.includes(userId)) {
                res.sendStatus(401);
            } else {
                res.send(list);
            }
        } else {
            res.sendStatus(404);
        }
    });
});

router.put('/lists/:id', (req, res) => {
    const userId = req.user.userId;
    const listId = req.params.id;

    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else if (list) {
            if (!list.owners.includes(userId)) {
                res.sendStatus(401);
            } else {
                list.set(req.body)
                    .save((err, updatedList) => {
                        if (err) {
                            res.status(500).send(err);
                            console.log(err);
                        } else {
                            res.send(updatedList);
                        }
                    });
            }
        } else {
            res.sendStatus(404);
        }
    });
});

router.delete('/lists/:id', (req, res) => {
    List.findOne({ id: req.params.id }, (err, list) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (!list) {
            res.sendStatus(404);
        } else {
            list.remove((err, data) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.send(data);
                }
            });
        }
    })
});


router.post('/lists/:listId/todos', (req, res) => {
    const listId = parseInt(req.params.listId, 10);
    const title = req.body.title;

    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            res.status(500).send(err);
            console.log(err);
        } else {
            new Todo({ title, listId }).save((err, todo) => {
                if (err) { 
                    res.status(500).send(err);
                    console.log(err);
                }
                list.todos.push(todo.todoId);
                list.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                res.send(todo);
            })
        }
    });
});

router.get('/lists/:listId/todos', (req, res) => {
    const userId = req.user.userId;
    const listId = req.params.listId;

    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            console.log(err);
        } else  if (!list) {
            res.sendStatus(404);
        } else {
            if (!list.owners.includes(userId)) {
                res.sendStatus(401);
            } else {
                Todo.find({ listId }, (err, todos) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(todos);
                    }
                })
            }
        }
    })
});

router.get('/lists/:listId/todos/:id', (req, res) => {
    const userId = req.user.userId;
    const listId = req.params.listId;
    const idInList = req.params.id;

    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            console.log(err);
        } else  if (!list) {
            res.sendStatus(404);
        } else {
            if (!list.owners.includes(userId)) {
                res.sendStatus(401);
            } else {
                Todo.findOne({ listId , idInList }, (err, todo) => {
                    if (err) {
                        console.log(err);
                    } else if (!todo){
                        res.sendStatus(404);
                    } else {
                        res.send(todo);
                    }
                })
            }
        }
    })
});

router.put('/lists/:listId/todos/:id', (req, res) => {
    const userId = req.user.userId;
    const listId = req.params.listId;
    const idInList = req.params.id;

    List.findOne({ id: listId }, (err, list) => {
        if (err) {
            console.log(err);
        } else  if (!list) {
            res.sendStatus(404);
        } else {
            if (!list.owners.includes(userId)) {
                res.sendStatus(401);
            } else {
                Todo.findOne({ listId , idInList }, (err, todo) => {
                    if (err) {
                        console.log(err);
                    } else if (!todo){
                        res.sendStatus(404);
                    } else {
                        const updatedTodo = Object.assign(todo, req.body);
                        updatedTodo.save((err, data) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                res.status(200).send(data);
                            }
                        })
                    }
                })
            }
        }
    })
});


router.delete('/lists/:listId/todos/:idInList', (req, res) => {
    const listId = req.params.listId;
    const idInList = req.params.idInList;
    console.log('listId: ', listId, ' idInList: ', idInList);
    

    Todo.findOne({ listId, idInList }, (err, todo) => {
        if (err) {
            res.sendStatus(500);
        } else if (!todo) {
            res.sendStatus(404);
        } else {
            console.log('todo: ', todo);
            todo.remove((err, data) => {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                } else {
                    res.status(200).send(data);
                }
            })
        }
    })
});

module.exports = router;
