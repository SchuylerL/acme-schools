/* eslint-disable no-undef */
const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed } = require('./db');

if (process.env.SYNC) {
  syncAndSeed();
}
syncAndSeed();

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}
// app.listen(port);
app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

app.use('/api/students', require('./routes/students'));
app.use('/api/schools', require('./routes/schools'));
