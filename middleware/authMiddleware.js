import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");
  try {
    const { userId, role } = verifyToken(token);
    const testUser = userId === "6994a3c69b67cd30ba9c71b4";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestuser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo user. Read only");
  next();
};
