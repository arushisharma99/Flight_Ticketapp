import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
};
