import { ObjectId } from "mongodb";
import { getDb } from "../utils/db";

class User {
  constructor(public name: string, public email: string) {}

  async save() {
    const db = getDb();
    try {
      const res = await db.collection("users").insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id: string) {
    const db = getDb();
    const _id = new ObjectId(id);

    try {
      const res = await db.collection("users").findOne({ _id });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
