const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from this origin
//   credentials: true // Allow credentials (cookies, authorization headers, etc.)
// }));
app.use(cors());
app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
res.header(
  "Access-Control-Allow-Header",
  "Origin,X-Requested-with,Center-Type,Accept"
)
next();

})
// Connect to MongoDB
mongoDB().then(() => {
  // Start your express app after the database connection is established
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use(express.json())
 app.use('/api',require("./Routes/CreateUser"));
 app.use('/api',require("./Routes/DisplayData"));
 app.use('/api',require("./Routes/OrderData"));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});
