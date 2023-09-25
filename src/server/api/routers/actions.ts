import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const actionsRouter = createTRPCRouter({
  getAllActions: publicProcedure.query(async ({ ctx }) => {
    try {
      const { data, error } = await ctx.supabase.from("actions").select("*");

      if (error) throw error;

      return data as unknown[];
    } catch (err) {
      console.error("Error fetching actions: ", err);
      return null;
    }
  }),
});
