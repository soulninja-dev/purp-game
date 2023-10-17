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

export type Post = {
  content: string;
  attachments?: Url[];
  likes: number;
  recasts: number;
  comments: number;
};
