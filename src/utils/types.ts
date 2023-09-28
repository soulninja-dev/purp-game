export type Action = {
  senderAvatarUrl: `https://${string}`;
  recipientAvatarUrl: `https://${string}`;
  senderName: string;
  recipientName: string;
  actionDisplayWording: string;
  pointAmount: number;
  actionTimestamp: number;
};

export type LBUser = {
  username: string;
  userfid: number;
  userdisplayname: string;
  useravatarurl: `https://${string}`;
  points: number;
  usdcamount: number;
  userUrl: `https://${string}`;
};
