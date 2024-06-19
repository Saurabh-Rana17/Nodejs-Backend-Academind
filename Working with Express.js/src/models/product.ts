import * as path from "path";
import * as fs from "fs";

interface product {
  title: string;
}

type callBack = (products: product[]) => void;

const p = path.join(__dirname, "..", "data", "data.json");

function getAllProductFromFile(cb: callBack) {
  fs.readFile(p, (err, data) => {
    let products: product[] = [];
    if (!err) {
      products = JSON.parse(data as unknown as string);
    }

    cb(products);
  });
}

export class Product implements product {
  constructor(
    public title: string,
    public imageUrl: string,
    public price: number,
    public description: string
  ) {}

  save(): void {
    getAllProductFromFile((products: product[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }

  static fetchAll(cb: callBack) {
    getAllProductFromFile(cb);
  }
}
