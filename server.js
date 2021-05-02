const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const routes = require("./routes");

const PORT = process.env.PORT || 3000; 27017

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/apiRoutes"));
app.use(require("./routes/frontRoutes"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

