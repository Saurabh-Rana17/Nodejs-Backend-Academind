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
    const cartProductIndex = this.cart.items.findIndex(
      (p) => p.productId.toString() === product._id?.toString()
    );
    const db = getDb();
    if (cartProductIndex > -1) {
      const updateQuantity = this.cart.items[cartProductIndex].quantity + 1;
      this.cart.items[cartProductIndex].quantity = updateQuantity;
      db.collection("users").updateOne(
        { _id: new ObjectId(this.userId) },
        {
          $set: {
            cart: this.cart,
          },
        }
      );
    } else {
      const currCart: ICart = { ...this.cart };
      currCart.items.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });

      const res = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this.userId) },
          { $set: { cart: currCart } }
        );
    }
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((p) => new ObjectId(p.productId));
    try {
      const cartData = await db
        .collection("products")
        .find({
          _id: {
            $in: productIds,
          },
        })
        .toArray();
      const cartObj = cartData.map((el) => {
        return {
          ...el,
          quantity: this.cart.items.find(
            (c) => el._id.toString() === c.productId.toString()
          )?.quantity,
        };
      });
      console.log(cartObj);
      return cartObj;
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;
