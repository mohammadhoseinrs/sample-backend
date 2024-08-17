import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("database is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB
