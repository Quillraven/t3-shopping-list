import { router } from "../trpc";
import { shoppingItemRouter } from "./shoppingItem";

export const appRouter = router({
  shoppingItem: shoppingItemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
