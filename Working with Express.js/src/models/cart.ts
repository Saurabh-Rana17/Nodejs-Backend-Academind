import * as fs from "fs";
import * as path from "path";
import { ICart } from "../types/cart";

const p = path.join(__dirname, "..", "data", "cart.json");

export class Cart {
  static addProduct(id: string, productPrice: number) {
    fs.readFile(p, (err, data) => {
      let cart: ICart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data as unknown as string);
        const productIndex = cart.products.findIndex((el) => el.id === id);
        let updatedCart = { ...cart };
        if (productIndex < 0) {
          cart.products.push({ id: id, qty: 1 });
          cart.totalPrice += +productPrice;
          fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
        } else {
          let item = updatedCart.products[productIndex];
          item.qty = item.qty + 1;
          updatedCart.products[productIndex] = item;
          updatedCart.totalPrice += +productPrice;
          fs.writeFile(p, JSON.stringify(updatedCart), (err) =>
            console.log(err)
          );
        }
      } else {
        cart.products.push({ id: id, qty: 1 });
        cart.totalPrice = +productPrice;
        fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
      }
    });
  }

  static deleteProduct(id: string, productPrice: number) {
    fs.readFile(p, (err, data) => {
      const cart: ICart = JSON.parse(data as unknown as string);
      const productToDelete = cart.products.find((el) => el.id === id);
      if (!productToDelete) {
        console.log("does not exist in cart");
        return;
      }
      const updatedProducts = cart.products.filter((el) => el.id !== id);
      const productQuantity = productToDelete.qty;
      cart.products = updatedProducts;
      cart.totalPrice = cart.totalPrice - productPrice * productQuantity;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static getProducts(cb: (cart: ICart | null) => void) {
    fs.readFile(p, (err, data) => {
      const cart: ICart = JSON.parse(data as unknown as string);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}
