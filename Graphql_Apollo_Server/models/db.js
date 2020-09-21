const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://noor:noor@cluster0-im4zu.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI);

module.exports = mongoose;