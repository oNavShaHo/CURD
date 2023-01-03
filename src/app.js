const express = require('express');
require("./db/conc");
const app = express();
const Curd=require("./models/curd");
const port = process.env.Port || 3000;
app.use(express.json());




  // Define the API routes
   app.get("/",(req, res)=>{
    res.send("hello");
   });

  // Create a new resource
 // Create a new resource
app.post('/api/items', (req, res) => {
  const newItem = new Curd(req.body);

  // Save the new item to the database
  newItem.save((err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

app.post('/verify-otp', (req, res) => {
  const enteredOTP = req.body.otpCode;
  const expectedOTP = req.body.otp;  // the OTP that was generated and sent to the user

  if (enteredOTP === expectedOTP) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

  
 // Read all resources
app.get('/api/items', (req, res) => {
  Curd.find({}, (err, items) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(items);
  });
});


 // Read a single resource
app.get('/api/items/:id', (req, res) => {
  const _id = req.params.id;

  Curd.findOne({ _id }, (err, item) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (!item) {
      res.sendStatus(404);
      return;
    }

    res.send(item);
  });
});

  // Update a single resource
app.patch('/api/items/:id', (req, res) => {
  const _id = req.params.id;
  const updates = req.body;

  Curd.findOneAndUpdate({ _id }, updates, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});
  
      // Delete a single resource
app.delete('/api/items/:id', (req, res) => {
  const _id = req.params.id;

  Curd.findOneAndDelete({ _id }, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

    
      // Start the server
      app.listen(port,()=>{
        console.log(`connection is live at port ${port}`);
    
    });
  
    module.exports=app;
