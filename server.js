var express = require('express');
var port = process.env.PORT || 8001;
var knex = require('./db/knex');

var app =  express();

app.use(express.json({ extended: false}))
// get all
app.get('/todos', function(req, res) {
    knex.select().from('todos').then(function(todos){
        res.send(todos)
    })
});
// get one
app.get('/todos/:id', function(req, res) {
    knex.select()
        .from('todos')
        .where('id', req.params.id)
        .then(function(todos) {
            res.send(todos);
        })
})
// add 
app.post('/todos', function(req, res) {
    knex('todos').insert({
        title: req.body.title,
        user_id: req.body.user_id
    })
    .then(function () {
        knex.select()
            .from('todos')
            .then(function(todos){
                res.send(todos);
            })
    })
})
// update/edit
app.put('/todos/:id', function(req,res) {
    knex('todos').where('id', req.params.id)
                .update({
                    title: req.body.title,
                    completed: req.body.completed
                })
                .then(function() {
                    knex.select()
                    .from('todos')
                    .then(function(todos){
                        res.send(todos);
                    })
                })
})

app.listen(port, function(){
    console.log("listening on port: ", port);
})