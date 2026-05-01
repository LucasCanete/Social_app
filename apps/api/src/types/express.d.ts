import * as express from "express";
console.log("EXPRESS TYPES LOADED");
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}