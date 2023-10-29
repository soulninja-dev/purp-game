export type Action = {
  senderAvatarUrl: Url;
  recipientAvatarUrl: Url;
  senderName: string;
  recipientName: string;
  actionDisplayWording: string;
  pointAmount: number;
  actionTimestamp: number;
};

export type BaseLBUser = {
  username: string;
  userdisplayname: string;
  useravatarurl: Url;
};

export type LBUser = BaseLBUser & {
  userfid: number;
  points: number;
  usdcamount: number;
  userUrl: Url;
};

type Url = `${"https" | "http"}://${string}`;
type BaseDateTime =
  `${number}-${number}-${number}T${number}:${number}:${number}`;
type DateTimeZ = `${BaseDateTime}.${number}Z`;
type DateTime = `${BaseDateTime}:${number}`;

export type Post = {
  content: string;
  attachments?: Url[];
  likes: number;
  recasts: number;
  comments: number;
};

export type NeynarResponse = {
  query_result: {
    retrieved_at: DateTimeZ;
    query_has: string;
    query: string;
    runtime: number;
    data: {
      rows: {
        contentUrl: Url;
        senderFid: number;
        recipientDisplayName: string;
        senderAvatarUrl: Url;
        senderDisplayName: string;
        actionDisplayWording: string;
        recipientFid: number;
        actionType: string;
        actionId: string;
        pointAmount: string;
        recipientName: string;
        actionTimestamp: DateTime;
        recipientAvatarUrl: Url;
        senderName: string;
        reactionHash: string;
      }[];
      columns: {
        friendly_name: string;
        type: string | null;
        name: string;
      }[];
    };
    id: number;
    data_source_id: number;
  };
};

export type ActionsData = NeynarResponse["query_result"]["data"]["rows"][0] & {
  day?: string;
  recipientAddress?: string;
  usdcAmt?: number;
};

export type PaymagicResponse = {
  updatedAt: DateTimeZ;
  users: {
    userId: string;
    accountAddress: string;
  }[];
};

export type Address = `0x${string}`;

export type AlchemyResponse = {
  jsonrpc: string;
  id: number;
  result: {
    address: string;
    tokenBalances: {
      contractAddress: string;
      tokenBalance: string;
    }[];
  };
};

type Chain = Record<
  number,
  {
    AlchemyChainNetwork: string;
    CovalentChainName: string;
  }
>;

export const ChainIdForChainName: Chain = {
  1: {
    AlchemyChainNetwork: "eth-mainnet",
    CovalentChainName: "eth-mainnet",
  },
  137: {
    AlchemyChainNetwork: "polygon-mainnet",
    CovalentChainName: "matic-mainnet",
  },
  1101: {
    AlchemyChainNetwork: "polygonzkevm-mainnet",
    CovalentChainName: "polygon-zkevm-mainnet",
  },
  59140: {
    AlchemyChainNetwork: "",
    CovalentChainName: "linea-testnet",
  },
};

const supportedChainIds = Object.keys(ChainIdForChainName).map((chainIdStr) =>
  Number(chainIdStr),
);

export type ChainId = (typeof supportedChainIds)[number];
