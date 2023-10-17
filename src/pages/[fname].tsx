import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { useState } from "react";
import Cast from "~/components/Cast";
import UploadIcon from "~/components/icons/Upload";
import DownloadIcon from "~/components/icons/Download";
import CopyIcon from "~/components/icons/Copy";
import { getUserAddress, getUserData } from "~/utils/getActionsAndCalculate";
import { useRouter } from "next/router";
import { fnames } from "~/utils/fnames";

const Profile = ({
  address,
  avatarUrl,
  name,
  fname,
  pointsSent,
  pointsEarned,
}: {
  notFound: boolean;
  address: string;
  avatarUrl: string;
  name: string;
  fname: string;
  pointsSent: number;
  pointsEarned: number;
}) => {
  const [tab, setTab] = useState<"recasts" | "likes">("recasts");
  const router = useRouter();

  const formatAddress = (address: string) =>
    address && address.length >= 10
      ? `${address.slice(0, 6)}....${address.slice(-5)}`
      : address;
  const copyToClipboard: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log("done");
      })
      .catch(() => {
        console.log("couldnt copy to clipboard");
      });
  };
  return (
    <>
      <Head>
        <title>purp.game - profile</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DesktopWrapper>
        <main className="flex min-h-screen flex-col gap-8 bg-background px-5 py-6 font-inter text-gray-300">
          <button
            onClick={() => router.back()}
            className="text-left text-xl font-medium text-gray-50"
          >
            &larr;
          </button>
          <div className="flex flex-col gap-1">
            <Image
              src={avatarUrl}
              className="h-[76px] w-[76px] rounded-full"
              alt="avatar"
              width={76}
              height={76}
            />
            <div className="flex items-center gap-1 text-lg text-gray-50">
              <Image
                src="https://cdn.discordapp.com/attachments/856193656569462824/1155751897869860895/image.png"
                className="h-5 w-5"
                alt="farcaster logo"
                width={20}
                height={20}
              />
              {name}
            </div>
            <div className="text-gray-600">{fname}</div>
          </div>
          <div className="flex flex-col items-center gap-7 rounded-2xl border-[0.5px] border-gray-800 bg-gray-950 px-4 py-6 text-center">
            <div className="flex flex-col gap-3">
              <div className="uppercase text-gray-700">Total Balance</div>
              <div className="text-4xl font-bold text-gray-100">$...</div>
            </div>
            <div className="flex items-center gap-1 rounded-[9px] border-[0.5px] border-[#2c2d2e] bg-[#1d1d20] p-2 text-sm text-gray-700">
              <div>{formatAddress(address)}</div>
              <div onClick={copyToClipboard} className="cursor-pointer ">
                <CopyIcon />
              </div>
            </div>
            <div className="flex w-full justify-between gap-2">
              <button className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#2A2042] p-2 text-farcaster-500">
                <UploadIcon />
                Send
              </button>
              <button className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#2A2042] p-2 text-farcaster-500">
                <DownloadIcon />
                Move to Bank
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-800">
            <div className="items-cent flex gap-2 text-xl text-gray-300">
              <div className="flex items-center gap-1 text-lg text-gray-600">
                <Image src="/usdc.png" alt="usdc logo" width={24} height={24} />
                USDC
              </div>
              5
            </div>
            ~5.00$
          </div>
          <div className="flex justify-between text-gray-100">
            <div className="flex flex-col gap-2.5">
              <div>Earned rewards</div>
              <div className="text-gray-600">🟣 {pointsEarned}</div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div>Gifted rewards</div>
              <div className="text-gray-600">🟣 {pointsSent}</div>
            </div>
          </div>
          <div className="relative flex items-center gap-10 border-b border-gray-900 ">
            <button
              onClick={() => setTab("recasts")}
              className={`${
                tab === "recasts" ? "text-farcaster-900" : null
              } py-1 pl-0.5`}
            >
              Recasts
            </button>
            <button
              onClick={() => setTab("likes")}
              className={`${
                tab === "likes" ? "text-farcaster-900" : null
              } py-1`}
            >
              Likes
            </button>
            <div
              className={
                "absolute bottom-0 h-0.5 bg-farcaster-900 transition-all duration-300 ease-in-out " +
                `${
                  tab === "likes" ? "w-12 translate-x-24" : "w-16 translate-x-0"
                }
                }`
              }
            ></div>
          </div>
          <div>
            <Cast
              user={{
                useravatarurl:
                  "https://cdn.discordapp.com/attachments/856193656569462824/1162699116040700005/image.png?ex=653ce2ef&is=652a6def&hm=fb4bab56adf7c172325beb45b23d6e9212ed05b93119033dc09c2f9da37fe6c9&",
                userdisplayname: "Leto Page",
                username: "letopage",
              }}
              post={{
                content:
                  "Excited for the Web3 conference in San Fransisco this year and I'll be speaking this yearrrr🤩",
                likes: 3,
                recasts: 3,
                comments: 4,
              }}
              first
            />
            <Cast
              user={{
                useravatarurl:
                  "https://cdn.discordapp.com/attachments/856193656569462824/1162699151839080528/image.png?ex=653ce2f7&is=652a6df7&hm=5ff148d231d6fd1facb8cd172a437267bccb7816c8482855547197638f14bd3d&",
                userdisplayname: "Joe Cadiz",
                username: "joecadiz",
              }}
              post={{
                content:
                  "We are really excited about this project and we can't wait to see how it impacts the web3 space 🤩",
                attachments: [
                  "https://cdn.discordapp.com/attachments/856193656569462824/1162699286107131954/image.png?ex=653ce317&is=652a6e17&hm=e2c6a1f1a34971f551744bf35bed99abd5a687f84ae70371e95e6423cade6f99&",
                ],
                likes: 3,
                recasts: 3,
                comments: 1,
              }}
            />
          </div>
        </main>
        <Navbar />
      </DesktopWrapper>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { fname } = ctx.query;

  if (!fname || !fnames.includes(fname as string))
    return { props: {}, notFound: true };

  // get user address
  try {
    const {
      users: [{ accountAddress: address }],
    } = await getUserAddress(fname as string);

    // get user data
    const { name, avatarUrl, pointsSent, pointsEarned } = await getUserData(
      fname as string,
    );

    if (!name || !avatarUrl || !address) return { props: {}, notFound: true };

    return {
      props: {
        address,
        avatarUrl,
        name,
        fname: fname as string,
        pointsSent,
        pointsEarned,
      },
    };
  } catch (err) {
    return {
      props: {},
      notFound: true,
    };
  }
};
