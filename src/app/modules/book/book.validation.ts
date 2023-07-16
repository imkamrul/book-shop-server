import { z } from "zod";
const reviewSchema = z.object({
  name: z.string().optional(),
  rating: z.number().optional(),
  message: z.string().optional(),
  user: z.string().optional(),
});
export const reviewZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name field is required ",
    }),
    rating: z
      .number({
        required_error: "Rating field is required ",
      })
      .min(0)
      .max(5),
    message: z.string({
      required_error: "Message field is required ",
    }),
    user: z.string({
      required_error: "User field is required ",
    }),
  }),
});
export const bookZodSchema = z.object({
  body: z.object({
    book_img: z.string({
      required_error: "Book image field is required ",
    }),
    rating: z
      .number({
        required_error: "Rating field is required ",
      })
      .min(0)
      .max(5),
    title: z.string({
      required_error: "Title field is required ",
    }),
    author: z.string({
      required_error: "Author field is required ",
    }),
    genre: z.string({
      required_error: "Genre field is required ",
    }),
    publishDate: z.string({
      required_error: "Publish date field is required ",
    }),
    totalDownload: z.number({
      required_error: "Total download field is required ",
    }),
    reviews: z.array(reviewSchema).optional(),
    price: z
      .number({
        required_error: "Price field is required ",
      })
      .positive(),
    seller: z.string({
      required_error: "Seller field is required ",
    }),
  }),
});
export const updateBookZodSchema = z.object({
  body: z.object({
    book_img: z.string().optional(),
    rating: z.number().min(0).max(5),
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publishDate: z.string().optional(),
    totalDownload: z.number().optional(),
    price: z.number().positive().optional(),
    seller: z.string().optional(),
    reviews: z.array(reviewSchema).optional(),
  }),
});
