const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(process.env.DATABASE_URL, mongoConfig);
    console.log("connect succefully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB();