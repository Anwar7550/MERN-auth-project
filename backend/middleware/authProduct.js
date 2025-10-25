import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res
      .status(403)
      .json({ message: "Unathorized, JWT token wrong or expired" });
  }
};
