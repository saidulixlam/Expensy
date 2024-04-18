const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/db");
// Import your models if you have any

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define your routes
app.post("/signup", (req, res) => {
  // Access form data from req.body
  const { name, email, password, phoneNumber, profession } = req.body;

  // Log the received data
  console.log("Received data:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);


  // Send a response indicating success
  res.json({ message: "Signup successful!" });
});
app.get("/signup", (req, res) => {
  // Access form data from req.body
  const { name, email, password } = req.body;

  console.log("Received data:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  // Send a response indicating success
  res.json({ message: "Signup successful!" });
});


app.post("/login", (req, res) => {
  // Access form data from req.body
  const { name, password } = req.body;

  // Log the received data
  console.log("Received data: 46 line");
  console.log("Name:", name);
  console.log("Password:", password);

  // Send a response indicating success
  res.json({ message: "Login successful!" });
});

app.get("/login",(req,res)=>{
  const { name, password } = req.body;

  console.log("Received data 67 line: 57 line get ");
  console.log("Name:", name);
  console.log("Password:", password);
  res.json({ message: "Login successful!" });
})


sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});