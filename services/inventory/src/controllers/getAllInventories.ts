import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

const getAllInventories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        Histories: {},
      },
    });
    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
};
export default getAllInventories;
