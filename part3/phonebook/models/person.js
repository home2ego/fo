const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // true — unknown fields while filtering will be neglected — Note.find({ hobby: "GYM" })) => Note.find({})

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  // number: { type: String, match: /^\d{3}-\d{6,7}$/ },
});

personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
