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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
