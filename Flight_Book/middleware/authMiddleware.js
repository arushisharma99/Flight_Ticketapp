import jwt from "jsonwebtoken";
import prisma, { hasDatabaseUrl } from "../config/prisma.js";

export const protect = async (req, res, next) => {
  try {
    if (!hasDatabaseUrl()) {
      return res.status(503).json({ message: "DATABASE_URL is not configured" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
