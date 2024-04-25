const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/db");
const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");
const paymentRouter = require("./routes/paymentRoute");
const User = require("./models/user");
const Expense = require("./models/expense");
// const Order = require("./models/order");

const app = express();
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

app.use("/user", userRouter);
app.use("/user",expenseRouter);
app.use("/purchase",paymentRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

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
