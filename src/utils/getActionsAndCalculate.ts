/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// TODO: @soulninja-dev - remove lodash
// TODO: @pybash1       - fix types

import _ from "lodash";
import { createClient } from "@supabase/supabase-js";
import { fnames } from "./fnames";
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
import { env } from "~/env.mjs";
import type { LBUser } from "./types";

export async function getActionsAndCalculate() {
  const date = new Date().toISOString().slice(0, 10);

  const dailyUsdcAmt = 0.33;

  for (const fname of fnames) {
    try {
      const neynarResponse = await getRecentReactionsfromFC(fname, date);

      const actionsData: any[] = _.get(
        neynarResponse,
        "query_result.data.rows",
        [],
      );

      const dailyPurpTotal: number = _.sumBy(actionsData, (o) =>
        Number(o.pointAmount),
      );

      console.log(`Fname: ${fname}`);
      console.log(`Action count: ${actionsData.length}`);
      console.log(`🟣 Points sent: ${dailyPurpTotal}`);
      console.log(`---`);
      if (!_.isEmpty(actionsData)) {
        for (const action of actionsData) {
          action.day = new Date(action.actionTimestamp)
            .toISOString()
            .split("T")[0];
          action.recipientAddress = _.get(
            await getUserAddress(action.recipientFid),
            "users.0.accountAddress",
            "0x",
          );
          action.usdcAmt =
            (dailyUsdcAmt * Number(action.pointAmount)) / dailyPurpTotal;

          await upsertAction(action);
        }
      }
    } catch (error) {
      console.error(`Error processing fname: ${fname}`);
      console.error(error);
    }
  }
}

async function getRecentReactionsfromFC(
  fname: string,
  day: string,
): Promise<any> {
  const endpoint =
    "https://data.hubs.neynar.com/api/queries/16/results?api_key=pxUz3WR2RjR4miAuzBoHDuRRmyJjQqsU5LKiITFQ";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const parameters = {
    parameters: {
      fname: fname,
      "day-YYYY-MM-DD": day,
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(parameters),
    });

    if (!response.ok) {
      throw new Error(`FC API returned an error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recent reactions from FC:", error);
    throw error;
  }
}

export async function getUserAddress(
  fid: string,
): Promise<{ users: { accountAddress: string }[] }> {
  const endpoint = `https://paymagicapi.com/v1/resolver`;

  const headers = {
    "Content-Type": "application/json",
  };

  const payload = {
    userIds: `farcaster:${fid}`,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Paymagic Resolver API returned an error: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Paymagic Resolver: Error calling resolver", error);
    throw error;
  }
}

const calculatePoints = async (fname: string, type: string) => {
  const currentDate = new Date();
  const p_end_day = currentDate.toISOString().split("T")[0];
  const p_start_day = new Date("2023-01-01").toISOString().split("T")[0];
  const calctype = `calc_${type}_leaderboard`;

  const { data, error } = (await supabase.rpc(calctype, {
    p_start_day,
    p_end_day,
  })) as {
    data: LBUser[] | null;
    error: unknown;
  };

  if (!data || error) {
    return { points: null, error };
  }

  const user = data.find((item: LBUser) => item.username === fname);
  const points = user ? user.points : 0;

  return { points, error: null };
};

export async function getUserData(fid: string): Promise<{
  name: string;
  avatarUrl: string;
  pointsSent: number;
  pointsEarned: number;
}> {
  try {
    const { data, error } = await supabase
      .from("actions")
      .select("senderDisplayName, senderAvatarUrl")
      .eq("senderName", fid)
      .limit(1);
    if (error) throw error;

    const { points: pointsSent, error: patronError } = await calculatePoints(
      fid,
      "patron",
    );
    if (patronError) throw patronError;

    const { points: pointsEarned, error: earnerError } = await calculatePoints(
      fid,
      "recipient",
    );
    if (patronError) throw patronError;

    const res = {
      name: data[0]?.senderDisplayName,
      avatarUrl: data[0]?.senderAvatarUrl,
      pointsSent,
      pointsEarned,
    };

    return res;
  } catch (error) {
    console.error("Error calling API", error);
    throw error;
  }
}

async function upsertAction(actionData: any): Promise<any> {
  try {
    const SUPABASE_URL = "https://ixyadahmfkomzjqwzwax.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eWFkYWhtZmtvbXpqcXd6d2F4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjQ0OTU2MiwiZXhwIjoyMDEyMDI1NTYyfQ.3Q4kwoXafKICeBLMT5ep-fOvgYJfogPcnD1bGs0itMA";
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    _.unset(actionData, "usdcAmt");

    const { data, error } = await supabase.from("actions").upsert([actionData]);

    if (error) {
      throw new Error(`Supabase upsertAction Error: ${JSON.stringify(error)}`);
    }

    return data;
  } catch (error) {
    console.error("Supabase: Error upserting action", error);
    throw error;
  }
}
