import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection.readyState == 1) {
      console.log("Database connected..");
    }
  } catch (error) {}
};

export default connectMongo;
