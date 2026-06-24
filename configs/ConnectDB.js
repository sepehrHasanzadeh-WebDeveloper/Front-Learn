import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.log("DB connection error =>", error);
  }
};

export default connectToDB;