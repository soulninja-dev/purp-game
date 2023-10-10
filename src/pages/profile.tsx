import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import UploadIcon from "~/components/icons/Upload";
import DownloadIcon from "~/components/icons/Download";
import CopyIcon from "~/components/icons/Copy";

const Profile = () => {
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
              src={
                "https://cdn.discordapp.com/attachments/856193656569462824/1160958256143945870/image.png?ex=65368da1&is=652418a1&hm=9d4db77a6852250c0d042ba9ac38ef94fc19ec92fa16fb6602f059117ea16dd9&"
              }
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
              corbin.eth
            </div>
            <div className="text-gray-600">Corbin Page</div>
          </div>
          <div className="flex flex-col items-center gap-7 rounded-2xl border-[0.5px] border-gray-800 bg-gray-950 px-4 py-6 text-center">
            <div className="flex flex-col gap-3">
              <div className="uppercase text-gray-700">Total Balance</div>
              <div className="text-4xl font-bold text-gray-100">$5</div>
            </div>
            <div className="flex items-center gap-1 rounded-[9px] border-[0.5px] border-[#2c2d2e] bg-[#1d1d20] p-2 text-sm text-gray-700">
              <div>0x7B32C3...492ca2</div>
              <CopyIcon />
            </div>
            <div className="flex w-full justify-between gap-2">
              <button className="text-farcaster-500 flex w-full items-center justify-center gap-1 rounded-lg bg-[#2A2042] p-2">
                <UploadIcon />
                Send
              </button>
              <button className="text-farcaster-500 flex w-full items-center justify-center gap-1 rounded-lg bg-[#2A2042] p-2">
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
