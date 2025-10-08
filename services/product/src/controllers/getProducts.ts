import { Request, Response, NextFunction } from "express";
import axios from "axios";
import prisma from "@/prisma";
import { INVENTORY_URL } from "@/config";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        inventoryId: true,
      },
    });
    // TODO Implement pagination
    // TODO Implement filtering
    return res.status(201).json(products);
  } catch (error) {
    next(error);
  }
};
export default getProducts;
