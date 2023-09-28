/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { type LBUser, type Action } from "~/utils/types";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

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

  getLeaderboard: publicProcedure.query(async () => {
    try {
      const p_start_day = "2023-01-01";
      const p_end_day = "2023-12-31";

      const { data, error } = await supabase.rpc("calc_patron_leaderboard", {
        p_start_day,
        p_end_day,
      });

      if (error) {
        throw error;
      }

      return data.map((item: LBUser, index: number) => ({
        name: item.username,
        rank: index + 1,
        points: item.points,
        avatar: item.useravatarurl,
      }));
    } catch (err) {
      console.error("Error fetching leaderboard: ", err);
      return null;
    }
  }),
});

/*

data we get:
[{
    reactionHash: '8143c206dc0b83a025b327bfb22b715fb1b02353',
    senderFid: 194,
    senderName: 'rish',
    senderDisplayName: 'rish',
    senderAvatarUrl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MEaRCAMdER6MKcvmlfN1-0fVxOGz6w98R8CrP_Rpzse9KZudgn95frTd0L0ZViWVklBj9fuAcJuM6tt7P-BRN0ouAR87NpzZeh2DGw',
    recipientFid: 13495,
    recipientName: 'galazio',
    recipientDisplayName: 'Stefanie',
    recipientAvatarUrl: 'https://i.imgur.com/9O5nc1p.jpg',
    recipientAddress: '0xE8E17AAF70e05FFF01aF8Bbc811c2e53b8A76180',
    actionDisplayWording: 'liked a cast by',
    actionTimestamp: '2023-09-02T14:35:39+00:00',
    day: '2023-09-02',
    pointAmount: 1,
    contentUrl: 'https://warpcast.com/galazio/0x8f8f23',
    createdAt: '2023-09-08T19:18:35.890384+00:00',
    updatedAt: '2023-09-08T19:18:35.890384+00:00',
    actionType: null,
    actionId: null
  }]

  data we want:
  [{
    avatars: [senderAvatarUrl, recipientAvatarUrl],
    by: senderName,
    to: recipientName,
    action: "liked a cast by",
    point: pointAmount,
    time: actionTimestamp
  }]


  ---


  data we get:
  [{
    username: 'corbin.eth',
    userfid: 358,
    userdisplayname: 'Corbin Page',
    useravatarurl: 'https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/szIk2U62Zfaux7eK8tinvy9vCUz2EPDUYet8WDKN9_dCJmm2-JM8Fux7_Cy2ZWzE9h2g3dIL9j_ywn8iK_UZYB0sToZ1dcP0QBsmh2w',
    points: 191,
    usdcamount: 0,
    userUrl: 'https://warpcast.com/corbin.eth'
  }]

  data we want:
  [{
    name,
    rank,
    points,
    avatar
  }]
*/
