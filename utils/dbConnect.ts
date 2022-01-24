import { Mongoose, connect } from "mongoose";

declare global {
  var mongoose: {
      conn: null | Mongoose,
      promise: null | Promise<Mongoose>
  };
}

const MONGODB_URI = process.env.DB_CONNECT_LINK as string;

console.log(MONGODB_URI);
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    cached.promise = connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
