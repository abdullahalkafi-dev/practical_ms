import { ActionType } from "@prisma/client"
import z from "zod"

export const InventoryCreateDTOSchema =z.object({
    productId :z.string(),
    sku: z.string(),
    quantity:z.number().int().min(0).default(0)
})
export const InventoryUpdateDTOSchema =z.object({
   
    quantity:z.number().int(),
    actionType:z.nativeEnum(ActionType)
})
