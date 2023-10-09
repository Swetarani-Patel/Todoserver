import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const connection = async () => {
  try {
    const MONGODB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ac-zz8nrip-shard-00-00.z8ix4yv.mongodb.net:27017,ac-zz8nrip-shard-00-01.z8ix4yv.mongodb.net:27017,ac-zz8nrip-shard-00-02.z8ix4yv.mongodb.net:27017/?ssl=true&replicaSet=atlas-32amtb-shard-0&authSource=admin&retryWrites=true&w=majority`;
    const res = await mongoose.connect(MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to mongodb successfully...");
  } catch (error) {
    console.log(`error while connecting mongo ${error.message}...`);
  }
};
