import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
  if (connection.isConnected) {
    return mongoose.connection.db;
  }

  const database = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = database.connections[0].readyState;

  console.log("Connected to DB: ", process.env.MONGODB_NAME);

  return mongoose.connection.db;
};

module.exports = connectDB;

// USAGE:
// import connectDB from '../../utils/connectDB';

// const db = await connectDB();
