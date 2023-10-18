import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import type { GetServerSideProps } from "next";

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
          <div className="text-xl font-medium text-gray-50">&larr;</div>
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

  // temporary
  // if (ctx.query.fname !== "corbin.eth") return { notFound: true, props: {} };

  return {
    props: {},
    notFound: true,
  };
};

export default Profile;
