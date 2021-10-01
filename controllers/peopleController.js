const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const People = mongoose.model('people');

router.get('/', (req, res) => {
    res.render("people/addOrEdit", {
        viewTitle: "Insert people"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


// function to insert Records

function insertRecord(req, res) {
    var people = new People();
    people.index = req.body.index;
    people.firstname = req.body.firstname;
    people.lastname = req.body.lastname;
    people.email = req.body.email;
    people.save((err, doc) => {
        if (!err)
            res.redirect('/list');
            else
                console.log('Error during record insertion : ' + err);
    });
}

// function to update records


function updateRecord(req, res) {
    People.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/list'); }
        else {
                console.log('Error during record update : ' + err);
        }
    });
}

// function to view list of people

router.get('/list', (req, res) => {
    People.find((err, docs) => {
        if (!err) {
            res.render("people/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving people list :' + err);
        }
    });
});

// Route to update 

router.get('/:id', (req, res) => {
    People.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("people/addOrEdit", {
                viewTitle: "Update people",
                people: doc
            });
        }
    });
});

// route to delete Single Entry

router.get('/delete/:id', (req, res) => {
    People.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else {
             console.log('Error in people delete :' + err); 
            }
    });
});

// route to delete all entries 

router.get('/list/deleteAll', (req,res) => {
    People.deleteMany((err)=>{
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log("Error in deleting all: " + err);
            
        }
    });
});
        

module.exports = router;