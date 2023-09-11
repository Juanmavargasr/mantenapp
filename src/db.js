const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://juanmavargasr2:kdaSVteJMVTc52Ha@lukaapp.hmskvbj.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "mantenapp",
      }
    );

    console.log(">>>>> DB is connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };
