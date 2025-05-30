import mongoose from "mongoose";

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`✅Connected to mongoDB`);
  } catch (error) {
    console.log(`❌ Error Connecting to mongoDB: ${error}`);
  }
};
export default connectDB;
