import { Request, Response } from "express";
export const notFound = (req: Request, res: Response) => {
  res.status(404).render("404", {
    pageTitle: "404,Page Not Found",
    path: "404",
  });
};
