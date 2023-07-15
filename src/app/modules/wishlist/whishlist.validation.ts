import { z } from "zod";
import { currentStatus } from "./whishlist.constant";

export const WhishListZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: "Book Id field is required ",
    }),
    buyer: z.string({
      required_error: "Buye ID field is required ",
    }),
    currentStatus: z
      .enum([...currentStatus] as [string, ...string[]])
      .optional(),
  }),
});

export const WhishListUpdateZodSchema = z.object({
  body: z.object({
    currentStatus: z
      .enum([...currentStatus] as [string, ...string[]])
      .optional(),
  }),
});
