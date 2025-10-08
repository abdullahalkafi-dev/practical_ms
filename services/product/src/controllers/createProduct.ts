import { Request, Response, NextFunction } from "express";
import axios from "axios";
import prisma from "@/prisma";
import { ProductCreateDToSchema } from "@/schemas";
import { INVENTORY_URL } from "@/config";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = ProductCreateDToSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.issues });
    }
    //check if product with same sku is already exist

    const existingProduct = await prisma.product.findFirst({
      where: {
        sku: parsedBody.data.sku,
      },
    });
    if (existingProduct) {
      return res.status(400).json({
        message: "product with already SKU already exist",
      });
    }

    //create product
    const product = await prisma.product.create({
      data: parsedBody.data,
    });
    console.log("product created successfully", product.id);

    //create inventory record for the product
    const { data: inventory } = await axios.post(
      `${INVENTORY_URL}/inventories`,
      {
        productId: product.id,
        sku: product.sku,
      }
    );
    console.log("Inventory created successfully", inventory.id);

    //update product and store inventory Id

    await prisma.product.update({
      where: { id: product.id },
      data: {
        inventoryId: inventory.id,
      },
    });

    return res.status(201).json({ ...product, inventoryId: inventory.id });
  } catch (error) {
    next(error);
  }
};
export default createProduct;
