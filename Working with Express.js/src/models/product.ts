import { ObjectId } from "mongodb";
import { IProduct } from "../types/product";
import { getDb } from "../utils/db";
import { ObjectIdLike } from "bson";

export class Product {
  public _id: ObjectId | undefined;
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string,
    public userId: string,
    id?: string
  ) {
    if (id) {
      this._id = new ObjectId(id);
    }
  }

  async save() {
    const db = getDb();
    try {
      if (!this._id) {
        const result = await db.collection("products").insertOne(this);
      } else {
        const result = await db
          .collection("products")
          .updateOne({ _id: this._id }, { $set: this });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    const db = getDb();

    try {
      const products = await db.collection("products").find().toArray();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(ProdId: string) {
    const db = getDb();
    const id = new ObjectId(ProdId);
    try {
      const product = await db.collection("products").findOne({ _id: id });
      return product;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteById(id: string) {
    const db = getDb();
    const _id = new ObjectId(id);
    try {
      const result = await db.collection("products").deleteOne({ _id });
    } catch (error) {
      console.log(error);
    }
  }
}
