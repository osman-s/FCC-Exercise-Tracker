const mongoose = require("mongoose");

module.exports = function() {
  const url = "mongodb+srv://osman:picotime@cluster0-sheam.mongodb.net/test?retryWrites=true&w=majority";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log(`Connected to ${url}...`));

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};