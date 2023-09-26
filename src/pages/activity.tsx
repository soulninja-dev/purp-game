import Head from "next/head";
import { useState } from "react";
import Navbar from "~/components/Navbar";

const Activity = () => {
  const [tab, setTab] = useState<"activity" | "friends">("activity");

  return (
    <>
      <Head>
        <title>purp.game - activity feed</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-background flex min-h-screen flex-col gap-3 px-5 py-6 font-inter text-gray-300">
        <div className="text-xl font-medium">Activity</div>
        <div className="relative flex items-center gap-8 border-b border-gray-900">
          <button
            onClick={() => setTab("activity")}
            className={`${
              tab === "activity" ? "text-farcaster-900" : null
            } py-1`}
          >
            Your Activity
          </button>
          <button
            onClick={() => setTab("friends")}
            className={`${
              tab === "friends" ? "text-farcaster-900" : null
            } py-1`}
          >
            Friends
          </button>
          <div
            className={
              "bg-farcaster-900 absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out " +
              `${
                tab === "friends" ? "w-14 translate-x-32" : "w-24 translate-x-0"
              }`
            }
          ></div>
        </div>
      </main>
      <Navbar />
    </>
  );
};

export default Activity;
