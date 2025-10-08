import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import {
  createInventory,
  getAllInventories,
  getInventoryById,
  getInventoryDetails,
  updateInventory,
} from "controllers";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// main routes
app.put("/inventories/:id", updateInventory);
app.get("/inventories/details/:id", getInventoryDetails);
app.get("/inventories/:id", getInventoryById);
app.get("/inventories", getAllInventories);
app.post("/inventories", createInventory);

//404 handler
app.use((_req, res) => {
  res.status(200).json({ message: "Not found" });
});
//error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});
const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "Inventory-Service";
app.listen(port, () => {
  console.log(`${serviceName} is running on ${port}`);
});
