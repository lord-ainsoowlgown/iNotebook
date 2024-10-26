const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo().catch(() => console.log("Connection Unsuccessful!"));

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello Prince!');
// });

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});