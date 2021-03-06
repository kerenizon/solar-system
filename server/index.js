const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db/mongoose');

const dataRouter = require('./routers/data-router');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api/data', dataRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// app.get('/', (req, res) => {
//     res.send('check')
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// "start": "concurrently \"cd server && node index.js\" \"cd client && npm start\""

// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "start": "node server/index.js",
//   "heroku-postbuild": "npm run build"
// },