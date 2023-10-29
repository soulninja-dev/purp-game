import { createClient } from "@supabase/supabase-js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { type LBUser, type Action } from "~/utils/types";
import { z } from "zod";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
const LeaderboardType = z.enum(["patron", "recipient", "new_user"]);

export const actionsRouter = createTRPCRouter({
  getAllActions: publicProcedure.query(async () => {
    try {
      const { data, error } = await supabase
        .from("actions")
        .select("*")
        .order("actionTimestamp", { ascending: false });

      if (error) {
        throw error;
      }
      return data.map((item: Action) => ({
        avatars: [item.senderAvatarUrl, item.recipientAvatarUrl],
        by: item.senderName,
        to: item.recipientName,
        action: item.actionDisplayWording,
        points: item.pointAmount,
        time: new Date(item.actionTimestamp) as unknown as number,
      }));
    } catch (err) {
      console.error("Error fetching actions:", err);
      return null;
    }
  }),

  getLeaderboard: publicProcedure
    .input(z.object({ lb_type: LeaderboardType }))
    .query(async ({ input }) => {
      try {
        const currentDate = new Date();
        const p_end_day = currentDate.toISOString().split("T")[0];
        currentDate.setDate(currentDate.getDate() - 30);
        const p_start_day = currentDate.toISOString().split("T")[0];

        const calctype = `calc_${input.lb_type}_leaderboard`;

        const { data, error } = (await supabase
          .rpc(calctype, {
            p_start_day,
            p_end_day,
          })
          .order("points", { ascending: false })) as {
          data: LBUser[] | null;
          error: unknown;
        };

        if (error) {
          throw error;
        }

        return data?.map((item, index) => ({
          name: item.username,
          rank: index + 1,
          points: item.points,
          avatar: item.useravatarurl,
        })) as {
          name: string;
          rank: number;
          points: number;
          avatar: string;
        }[];
      } catch (err) {
        console.error("Error fetching leaderboard: ", err);
        return null;
      }
    }),
});

// refer to utils/comments.ts
