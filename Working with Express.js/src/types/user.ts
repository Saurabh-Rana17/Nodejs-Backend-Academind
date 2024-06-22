import { Request } from "express";
import { IProduct } from "./product";
import { ObjectId } from "mongodb";

export interface ICart {
  items: cartItem[];
}

interface cartItem {
  productId: string | ObjectId;
  quantity: number;
}

export interface Iuser {
  name: string;
  email: string;
  cart: ICart;
  userId: ObjectId;
  addToCart(product: IProduct): Promise<void>;
  getCart(): any;
}

export interface userReq extends Request {
  user?: Iuser;
}
