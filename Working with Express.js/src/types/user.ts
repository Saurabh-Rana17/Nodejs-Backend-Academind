import { Request } from "express";
export interface Iuser {
  name: string;
  email: string;
}

export interface userReq extends Request {
  user?: any;
}
