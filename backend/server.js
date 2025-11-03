import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import routerProduct from "./routes/productRoute.js";

dotenv.config();

const app = express();

app.use(cors());

// {
//     origin: "url",
//     methods: ["POST"],
//     credentials: true,
//   }
app.use(express.json());
app.use(bodyParser.json());

const Port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running ....");
});

app.use(`/auth`, authRouter);
app.use(`/auth/product`, routerProduct);

// ConnectDB();

ConnectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port http://localhost:${Port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect DB", error);
    process.exit(1);
  });

export default app;
