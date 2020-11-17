const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/mongoose');

const dataRouter = require('./routers/data-router');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', dataRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})