const router = require('express').Router();
const User = require('../models/user').User;
const List = require('../models/list').List;
const Todo = require('../models/todo').Todo;

router.get('/username', (req, res) => {
    const username = req.user.username ? req.user.username : req.user.githubUserName;
    res.send(JSON.stringify({ username }));
});

router.get('/user/me', (req, res) => {
    res.send(req.user);
});

router.put('/user/me', (req, res) => {
    User.findOne(
        { username: req.user.username },
        (err, user) => {
            if (err) { throw new Error("Failed to find user") }
            user.username = req.body.username;
            user.password = req.body.password;
            user.save(
                (err, user) => {
                    if (err) { 
                        res.status(500).send('db error');
                        console.log(err);
                    }
                }
    )});
    res.send(req.body.username + ' ' + req.body.password);
});

router.delete('/user/me', (req, res) => {
    User.find({ username: req.user.username }).remove((err, data) => {
        console.log('err: ', err);
        console.log('data: ', data);
        res.send(data);
    });
});

router.post('/lists', (req, res) => {
    console.log(req.body.name);
    new List({ name: req.body.name, owners: req.user.username })
        .save((err, list) => {
            console.log(list);
            if (err) { 
                res.status(500).send('db error');
                console.log(err);
            };
            res.send(list);
})});

router.get('/lists', (req, res) => {
    console.log(req.user.username);
    List.find({ owners: req.user.username }, (err, lists) => {
        console.log(lists);
        if (err) throw new Error("Failed to find lists");
        res.send(lists);
    });
});

router.get('/lists/:id', (req, res) => {
    console.log(req.user.username);
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id == req.params.id) {
                res.send(lists[i]);
            }
        }
        res.send("Not found");
    });
});

router.put('/lists/:id', (req, res) => {
    let isFound = false;
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id == req.params.id) {
                isFound = true;
                lists[i].name = req.body.name;
                lists[i].owners = req.body.owners;
                lists[i].save((err, list) => {
                    res.send(list);
                })
            }
        }
        if (!isFound) {
            res.send("Not found");
        }
    });
});

router.delete('/lists/:id', (req, res) => {
    List.find({ id: req.params.id }).remove((err, data) => {
        console.log('err: ', err);
        console.log('data: ', data);
        res.send(data);
    });
});


router.post('/lists/:listId/todos', (req, res) => {
    let isFound = false;
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id != req.params.listId) {
                continue;
            }
            isFound = true;
            listId = lists[i].id;
            console.dir('listId: ', req.params.listId);
            new Todo({ title: req.body.title, listId })
                .save((err, todo) => {
                    console.log(todo);
                    if (err) { 
                        res.status(500).send('db error');
                        console.log(err);
                    };
                    res.send(todo);
        })}
        if (!isFound) {
            res.send("Not found");
        }
    });
});

router.get('/lists/:listId/todos', (req, res) => {
    let isFound = false;
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id != req.params.listId) {
                continue;
            }
            isFound = true;
            Todo.find({ listId: req.params.listId }, (err, todos) => {
                if (err) throw new Error("Todos not found");
                res.send(todos);
            })
        }
        if (!isFound) {
            res.send("Not found");
        }
    });
    
});

router.get('/lists/:listId/todos/:id', (req, res) => {
    let isFound = false;
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id != req.params.listId) {
                continue;
            }
            isFound = true;
            Todo.find({ listId: req.params.listId, todoId: req.params.id }, (err, todo) => {
                if (err) throw new Error("Todos not found");
                res.send(todo);
            })
        }
        if (!isFound) {
            res.send("Not found");
        }
    });
    
});

router.put('/lists/:listId/todos/:id', (req, res) => {
    let isFound = false;
    List.find({ owners: req.user.username }, (err, lists) => {
        for (let i = 0; i < lists.length; i += 1) {
            if (lists[i].id != req.params.listId) {
                continue;
            }
            isFound = true;
            Todo.findOne({ listId: req.params.listId, todoId: req.params.id }, (err, todo) => {
                if (err) throw new Error("Todos not found");
                todo.title = req.body.title;
                todo.done = req.body.done;
                todo.listId = req.params.listId;
                console.log(todo);
                todo.save((err, data) => {
                    console.log(err);
                    console.log(data);
                    res.send("CHANGED");
                })
            })
        }
        if (!isFound) {
            res.send("Not found");
        }
    });
    
});


router.delete('/lists/:listId/todos/:todoId', (req, res) => {
    console.log(req.params);
    List.findOne({ id: req.params.listId }, (err, list) => {
        Todo.findOne({ listId: req.params.listId, todoId: req.params.todoId }, (err, todo) => {
            todo.remove((err, data) => {
                console.log(err);
                console.log(data);
                res.send("DELETED");
            })
        })
    })
});

module.exports = router;
