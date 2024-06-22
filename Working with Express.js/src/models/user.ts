import { ObjectId } from "mongodb";
import { getDb } from "../utils/db";
import { ICart, Iuser } from "../types/user";
import { IProduct } from "../types/product";

class User implements Iuser {
  constructor(
    public name: string,
    public email: string,
    public cart: ICart,
    public userId: ObjectId
  ) {}

  async save() {
    const db = getDb();
    try {
      await db.collection("users").insertOne(this);
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

  async addToCart(product: IProduct) {
    const cartProduct = this.cart.items.findIndex(
      (p) => p.productId === product._id
    );
    if (cartProduct > -1) {
    } else {
      const updatedCart: ICart = {
        items: [{ productId: new ObjectId(product._id), quantity: 1 }],
      };
      const db = getDb();
      const res = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this.userId) },
          { $set: { cart: updatedCart } }
        );
    }
  }
}

export default User;
