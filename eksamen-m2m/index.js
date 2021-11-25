const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/api");

// connect to mongodb
mongoose
  .connect(
    "mongodb+srv://admin:admin@m2m.xfivf.mongodb.net/SodaMachineDb?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

mongoose.Promise = global.Promise;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT} ...`);
});
