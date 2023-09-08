var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/contactlist',['contactlist'])

app.use(express.json())

app.get('/contacts', (req, res) => {
    db.contacts.find(function(err, docs){
        res.json(docs);
    })

});

app.post('/contacts', (req, res) => {
    db.contacts.insert(req.body, function(err, doc){
        res.json(doc);
    })
});

app.delete('/contacts/:id', (req, res)=>{
    let id = req.params.id;
    db.contacts.remove({_id: mongojs.ObjectID(id)}, function(err, doc){
        res.json(doc);
    })
});

app.get('/contacts/:id', (req, res) => {
    let id = req.params.id;
    db.contacts.findOne({_id: mongojs.ObjectID(id)}, function(err, doc){
        res.json(doc);
    })
});

app.put('/contacts/:id', (req, res) =>{
    let id = req.params.id;
    db.contacts.findAndModify({
        query: {_id: mongojs.ObjectID(id)},
        update: {$set: {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number
        }},
        new: true}, function (err, doc){
            res.json(doc);
        })
})

app.use(express.static(__dirname+"/public"))

app.listen(3000);

console.log("Server is running on http://localhost:3000/");