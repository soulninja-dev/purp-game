/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import UploadIcon from "~/components/icons/Upload";
import DownloadIcon from "~/components/icons/Download";
import CopyIcon from "~/components/icons/Copy";
import { type GetServerSideProps } from "next";
import { fnames } from "~/utils/fnames";
import { getUserAddress, getUserData } from "~/utils/getActionsAndCalculate";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Profile = ({
  notFound,
  address,
  avatarUrl,
  name,
  fname,
}: {
  notFound: boolean;
  address: string;
  avatarUrl: string;
  name: string;
  fname: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (notFound) {
      router.push("/404").catch(() => {
        console.log("cudnt push to 404");
      });
    }
  }, [notFound, router]);

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
          <div className="text-xl font-medium">Profile</div>
          <div className="flex flex-col items-center justify-center gap-1">
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
              <div className="text-gray-600">🟣17</div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div>Gifted rewards</div>
              <div className="text-gray-600">🟣17</div>
            </div>
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
  if (!fname) {
    return {
      props: {
        notFound: true,
        address: "",
        avatarUrl: "",
        name: "",
        fname: "",
      },
    };
  }
  // get user address
  try {
    const {
      users: [{ accountAddress: address }],
    } = await getUserAddress(fname as string);

    // get user data
    const { name, avatarUrl } = await getUserData(fname as string);
    console.log(name, avatarUrl);

    if (!name || !avatarUrl || !address) {
      throw new Error("user doesnt exist");
    }
    return {
      props: {
        notFound: false,
        address,
        avatarUrl,
        name,
        fname: fname as string,
      },
    };
  } catch (err) {
    return {
      props: {
        notFound: true,
        address: "",
        avatarUrl: "",
        name: "",
        fname: "",
      },
    };
  }
};
