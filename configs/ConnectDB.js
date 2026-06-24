const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connect to DB successfuly : )) ");
    }
  } catch (error) {
    console.log("db connection has error => ", error);
  }
};

export default connectToDB
