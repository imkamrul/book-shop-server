import { z } from "zod";

export const WhishListZodSchema = z.object({
  body: z.object({
    book: z.string({
      required_error: "Book Id field is required ",
    }),
    buyer: z.string({
      required_error: "Buye ID field is required ",
    }),
  }),
});
