import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      let decodedData = jwt.verify(token, "zalak");
      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {}
};

export const validateUserAdd = [
  body("name", "Enter valid  name.").exists().contains(),

  body("email", "Enter valid email").exists().contains().isEmail(),

  body("password", "Password is invalid.")
    .exists()
    .isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export const validateUser = [
  body("email", "Enter a valid email").isEmail(),
  
  body("password", "Password is invalid.")
    .exists()
    .isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    next();
  },
];

export const validateComplaint = [
  body("name", "Enter valid  name.").exists().contains(),

  body("problem", "Enter valid  problem.").exists().contains(),

  body("complaint_des", "Enter valid  complaint_des.").exists().contains(),
  body("action", "Enter valid  action.").exists().contains(),
  body("citizen", "Enter valid  citizenship.").exists().contains().isBoolean,

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    next();
  },
];
export default auth;
