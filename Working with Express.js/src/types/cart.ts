export interface ICart {
  products: { id: string; qty: number }[];
  totalPrice: number;
}
