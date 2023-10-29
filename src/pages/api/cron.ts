import { NextResponse } from "next/server";
import { getActionsAndCalculate } from "~/utils/farcaster";

export const config = {
  runtime: "edge",
  unstable_allowDynamic: ["/node_modules/lodash/**"],
};

export default async function handler() {
  try {
    await getActionsAndCalculate();
    return new NextResponse("success", { status: 200 });
  } catch (err) {
    return new NextResponse("failure", { status: 500 });
  }
}
