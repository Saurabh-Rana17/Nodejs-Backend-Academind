import * as path from "path";
import * as fs from "fs";

interface product {
  title: string;
}

type callBack = (product: product[]) => void;

export class Product implements product {
  constructor(public title: string) {
    this.title = title;
  }

  save(): void {
    const p = path.join(__dirname, "..", "data", "data.json");
    fs.readFile(p, (err, data) => {
      let products: product[] = [];
      if (!err) {
        products = JSON.parse(data as unknown as string);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }

  static fetchAll(cb: callBack) {
    const p = path.join(__dirname, "..", "data", "data.json");
    let products: product[] = [];

    fs.readFile(p, (err, data) => {
      if (!err) {
        products = JSON.parse(data as unknown as string);
      }

      return cb(products);
    });
  }
}
