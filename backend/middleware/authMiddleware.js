import joi from "joi";

export const signupValidation = (req, res, next) => {
  const Schema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(10).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad requests ", error });
  }
  next();
};
export const loginValidation = (req, res, next) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(10).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad requests ", error });
  }
  next();
};
