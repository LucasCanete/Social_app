import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET!;
//const SECRET = "you-will-never-guess"; // luego usa .env

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  // no token
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // format: "Bearer TOKEN"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    (req as any).user = decoded; //important
    next();

  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};