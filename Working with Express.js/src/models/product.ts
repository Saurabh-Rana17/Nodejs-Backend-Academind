interface product {
  title: string;
  save(): void;
}

const products: product[] = [];

export class Product implements product {
  title: string;
  constructor(title: string) {
    this.title = title;
  }

  save(): void {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}
