import { IProduct } from "../types/product";
import { getDb } from "../utils/db";

export class Product implements IProduct {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string
  ) {}

  async save() {
    const db = getDb();

    try {
      const result = await db.collection("products").insertOne(this);
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
}
