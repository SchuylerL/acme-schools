const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed } = require('./db');

if (process.env.SYNC) {
  syncAndSeed();
}
// const port = process.env.PORT || 3000;
syncAndSeed();

app.listen(process.env.PORT || 3000, () =>
  console.log(`listening on port ${port}`)
);
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

app.use('/api/students', require('./routes/students'));
app.use('/api/schools', require('./routes/schools'));
