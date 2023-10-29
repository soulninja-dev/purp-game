import { createClient } from "@supabase/supabase-js";
import { fnames } from "./fnames";
import { env } from "~/env.mjs";
import {
  type ChainId,
  ChainIdForChainName,
  type ActionsData,
  type Address,
  type AlchemyResponse,
  type LBUser,
  type NeynarResponse,
  type PaymagicResponse,
} from "./types";
import { USDC } from "./constants";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export async function getActionsAndCalculate() {
  const date = new Date().toISOString().slice(0, 10);

  const dailyUsdcAmt = 0.33;

  for (const fname of fnames) {
    try {
      const neynarResponse = await getRecentReactionsfromFC(fname, date);

      const actionsData = neynarResponse.query_result.data.rows || [];

      let dailyPurpTotal = 0;

      actionsData.forEach((action) => {
        dailyPurpTotal += Number(action.pointAmount);
      });

      console.log(`Fname: ${fname}`);
      console.log(`Action count: ${actionsData.length}`);
      console.log(`🟣 Points sent: ${dailyPurpTotal}`);
      console.log(`---`);
      actionsData.forEach((action) => {
        const handle = async () => {
          const action_: NeynarResponse["query_result"]["data"]["rows"][0] & {
            day?: string;
            recipientAddress?: string;
            usdcAmt?: number;
          } = { ...action };

          action_.day = new Date(action.actionTimestamp)
            .toISOString()
            .split("T")[0];

          action_.recipientAddress =
            (await getUserAddress(action.recipientFid)).users[0]
              ?.accountAddress ?? "0x";

          action_.usdcAmt =
            (dailyUsdcAmt * Number(action.pointAmount)) / dailyPurpTotal;

          await upsertAction(action_);
        };

        void handle();
      });
    } catch (error) {
      console.error(`Error processing fname: ${fname}`);
      console.error(error);
    }
  }
}

async function getRecentReactionsfromFC(fname: string, day: string) {
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

    return (await response.json()) as NeynarResponse;
  } catch (error) {
    console.error("Error fetching recent reactions from FC:", error);
    throw error;
  }
}

export async function getUserAddress(fid: string) {
  const endpoint = `https://paymagicapi.com/v1/resolver`;

  const headers = {
    "Content-Type": "application/json",
  };

  const payload = {
    userIds: `farcaster:${fid}`
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

    return (await response.json()) as PaymagicResponse;
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

export async function getUserData(fname: string) {
  try {
    const {
      data,
      error,
    }: {
      data: { senderDisplayName: string; senderAvatarUrl: string }[] | null;
      error: unknown;
    } = await supabase
      .from("actions")
      .select("senderDisplayName, senderAvatarUrl")
      .eq("senderName", fname)
      .limit(1);

    if (error) throw error;

    const { points: pointsSent, error: patronError } = await calculatePoints(
      fname,
      "patron",
    );
    if (patronError) throw patronError;

    const { points: pointsEarned, error: earnerError } = await calculatePoints(
      fname,
      "recipient",
    );

    if (patronError) throw patronError;
    if (earnerError) throw earnerError;

    console.log(data);

    const res = {
      name: data![0]?.senderDisplayName,
      avatarUrl: data![0]?.senderAvatarUrl,
      pointsSent,
      pointsEarned,
    };

    return res;
  } catch (error) {
    console.error("Error calling API", error);
    throw error;
  }
}

async function upsertAction(actionData: ActionsData) {
  try {
    const SUPABASE_URL = "https://ixyadahmfkomzjqwzwax.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eWFkYWhtZmtvbXpqcXd6d2F4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjQ0OTU2MiwiZXhwIjoyMDEyMDI1NTYyfQ.3Q4kwoXafKICeBLMT5ep-fOvgYJfogPcnD1bGs0itMA";
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    delete actionData.usdcAmt;

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

export const getUsdcBalance = async (chainId: ChainId, address: Address) => {
  const network = ChainIdForChainName[chainId]?.AlchemyChainNetwork;

  if (network) {
    const url = `https://${network}.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        headers: {
          "Content-Type": "application/json",
        },
        params: [`${address}`, "erc20"],
        id: 42,
      }),
      redirect: "follow",
    });

    const data: AlchemyResponse = (await res.json()) as AlchemyResponse;

    const usdc = parseInt(
      data.result.tokenBalances.filter((t) => parseInt(t?.tokenBalance) > 0)[0]!
        .tokenBalance,
    );
    return usdc / USDC;
  }

  return null;
};
