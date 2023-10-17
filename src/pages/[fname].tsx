import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { useState } from "react";
import Cast from "~/components/Cast";
import { useRouter } from "next/router";

const Profile = () => {
  const [tab, setTab] = useState<"recasts" | "likes">("recasts");

  const router = useRouter();

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
              src={
                "https://cdn.discordapp.com/attachments/856193656569462824/1160958256143945870/image.png?ex=65368da1&is=652418a1&hm=9d4db77a6852250c0d042ba9ac38ef94fc19ec92fa16fb6602f059117ea16dd9&"
              }
              className="h-[52px] w-[52px] rounded-full"
              alt="avatar"
              width={52}
              height={52}
            />
            <div className="flex items-center gap-1 text-lg font-semibold text-gray-100">
              elonmusk
              <Image
                src="https://cdn.discordapp.com/attachments/856193656569462824/1155751897869860895/image.png"
                className="h-5 w-5"
                alt="farcaster logo"
                width={20}
                height={20}
              />
            </div>
            <div className="text-gray-200">@elonmusk</div>
            <div className="text-gray-200">🌿Plant dad ,🏗 builder @tesla</div>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @soulninja-dev implement user exists or not logic here
  // docs for getServerSideProps:
  // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#using-getserversideprops-to-fetch-data-at-request-time

  if (ctx.query.fname !== "corbin.eth") return { notFound: true, props: {} };

  return {
    props: {},
  };
};

export default Profile;
