import { MongoClient } from "mongodb";
import { CoursesType } from "../db";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);
const db = client.db("coursesIt");
export const coursesCollection = db.collection<CoursesType>("courses");

export async function runDb() {
  try {
    await client.connect();
    await client.db("courses-db").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Cant connect ti db");

    await client.close();
  }
}
