import * as path from "path";
import * as fs from "fs";
import { IProduct } from "../types/product";
import { json } from "stream/consumers";
import { Cart } from "./cart";

type callBack = (products: IProduct[]) => void;

const p = path.join(__dirname, "..", "data", "data.json");

function getAllProductFromFile(cb: callBack) {
  fs.readFile(p, (err, data) => {
    let products: IProduct[] = [];
    if (!err) {
      products = JSON.parse(data as unknown as string);
    }

    cb(products);
  });
}

export class Product implements IProduct {
  id: string | null;
  constructor(
    id: string | null,
    public title: string,
    public imageUrl: string,
    public price: number,
    public description: string
  ) {
    this.id = id;
  }

  save(): void {
    getAllProductFromFile((products: IProduct[]) => {
      if (!this.id) {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {});
      } else {
        const existingIndex = products.findIndex((el) => el.id === this.id);
        products[existingIndex] = this;
        fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
      }
    });
  }

  static deleteById(id: string) {
    getAllProductFromFile((products) => {
      const updatedProducts = products.filter((el) => el.id !== id);
      const productToDelete = products.find((el) => el.id === id);
      const productPrice: number = +productToDelete!.price;
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, productPrice);
        }
      });
    });
  }

  static fetchAll(cb: callBack) {
    getAllProductFromFile(cb);
  }

  static findById(id: string, cb: (product: IProduct) => void) {
    getAllProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product as IProduct);
    });
  }
}
