import { createClient } from "@supabase/supabase-js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { type Action } from "~/utils/types";

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
*/
