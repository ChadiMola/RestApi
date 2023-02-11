const express = require("express");
const dbConnection = require("./config/dbConnection");
const User = require("./models/User");
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
require("dotenv").config();
console.log(process.env.MONGO_URI);
dbConnection();
const port = 5789;
app.use(express.json());
 
app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ message: err.message }));
});
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});
app.post("/users", (req, res) => {
  console.log(req)
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

app.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

app.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.send({ message: "User successfully deleted" });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});


app.listen(port, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${port}!`)
);