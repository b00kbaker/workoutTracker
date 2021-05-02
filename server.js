const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000; 27017

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/frontRoutes.js"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = router;