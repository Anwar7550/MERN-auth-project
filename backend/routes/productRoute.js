import express from "express";
import { validAuthenticated } from "../middleware/authProduct.js";

const routerProduct = express.Router();

routerProduct.get("/", validAuthenticated, (req, res) => {
  // console.log("------ logged in user details ---------", req.user);
  res.status(200).json([
    {
      name: "Freezer",
      price: "15000",
    },
    {
      name: "Fan",
      price: "12000",
    },
    {
      name: "Washing Machine",
      price: "18000",
    },
    {
      name: "Air Conditioner",
      price: "25000",
    },
    {
      name: "Heater",
      price: "20000",
    },
  ]);
});

export default routerProduct;
