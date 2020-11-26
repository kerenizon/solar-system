const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/solar-system', {
mongoose.connect('process.env.MONGO_URI', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// mongoose.catch(e => {
//     console.error('Connection error', e.message)
// });

const db = mongoose.connection;

module.exports = db;
