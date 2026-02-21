import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return token;
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
