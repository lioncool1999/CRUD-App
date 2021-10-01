const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-roydon:test123@cluster0.bn0n5.mongodb.net/peopleDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(err) }
});

require('./people.model');