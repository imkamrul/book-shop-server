import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { UserRoutes } from "../modules/user/user.route";
import { WhishListRoutes } from "../modules/wishlist/whishlist.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/whish-list",
    route: WhishListRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
