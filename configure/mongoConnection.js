

const mongoose = require( "mongoose");

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/", {
      dbName: "studentsResult",
    });
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports= connectDB