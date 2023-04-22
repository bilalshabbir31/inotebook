const connecttoMongo=require('./db');
const express = require('express');
const cors = require("cors");
connecttoMongo();
const app = express();
const port = 5000
app.use(cors());
app.use(express.json());

// Avaiable 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
