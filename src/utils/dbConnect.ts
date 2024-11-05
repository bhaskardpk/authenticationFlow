import mongoose, { Mongoose } from "mongoose";
import { envValues } from "./envConfig";
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const MONGODB_URI = envValues.NEXT_PUBLIC_MONGODB_URI || "";

// if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  // eslint-disable-next-line no-console
  console.log("DB Connected");
  return cached.conn;
}

export default dbConnect;
