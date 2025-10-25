import express from "express";
import { validAuthenticated } from "../middleware/authProduct.js";

const routerProduct = express.Router();

routerProduct.get("/", validAuthenticated, (req, res) => {
  // console.log("------ logged in user details ---------", req.user);
  res.status(200).json([
    {
      name: "mobile",
      price: "15000",
    },
    {
      name: "TV",
      price: "20000",
    },
  ]);
});

export default routerProduct;
