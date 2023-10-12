import { type NextApiRequest, type NextApiResponse } from "next";
import { getActionsAndCalculate } from "~/utils/getActionsAndCalculate";

export const config = {
  runtime: "edge",
  unstable_allowDynamic: ["/node_modules/lodash/**"],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await getActionsAndCalculate();

  res.status(200);
}
