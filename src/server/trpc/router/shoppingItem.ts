import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const shoppingItemRouter = router({

  getShoppingItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shoppingItem.findMany();
  }),

  addShoppingItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.shoppingItem.create({
        data: { name: input.name }
      });
    }),

  deleteShoppingItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.shoppingItem.delete({ where: { id: input.id } });
    }),

  updateShoppingItem: publicProcedure
    .input(z.object({ id: z.string(), name: z.string(), checked: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.shoppingItem.update({
        data: { name: input.name, checked: input.checked },
        where: { id: input.id }
      });
    })

});
