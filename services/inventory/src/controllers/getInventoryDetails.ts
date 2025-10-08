import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

const getInventoryDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const inventory = await prisma.inventory.findUnique({
      where: {
        id,
      },
      include: {
        Histories: {
          orderBy:{
            createdAt:"desc"
          }
        },
      },
    });
    if (!inventory) {
      return res.status(404).json({ message: "inventory not found" });
    }
    return res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};
export default getInventoryDetails;
