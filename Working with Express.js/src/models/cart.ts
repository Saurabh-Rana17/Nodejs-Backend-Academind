import * as fs from "fs";
import * as path from "path";
import { IProduct } from "../types/product";
import { ICart } from "../types/cart";

const p = path.join(__dirname, "..", "data", "cart.json");

export class Cart {
  static addProduct(id: string, productPrice: number) {
    //fetch the previous cart
    fs.readFile(p, (err, data) => {
      let cart: ICart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data as unknown as string);
        const productIndex = cart.products.findIndex((el) => el.id === id);
      } else {
        cart.products.push({ id: id, qty: 1 });
        cart.totalPrice = +productPrice + 100;
        fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
      }
    });
    //analyze the  cart find existing product
    // add new product or increase quantity
  }
}
