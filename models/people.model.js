const mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
    index: {
        type: Number,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    }
});


mongoose.model('people', peopleSchema);