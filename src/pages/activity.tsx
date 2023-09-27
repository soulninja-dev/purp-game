/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Head from "next/head";
import { type Key, useState } from "react";
import ActivityItem from "~/components/ActivityItem";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Activity = () => {
  const [tab, setTab] = useState<"activity" | "friends">("activity");

  const actions = api.actions.getAllActions.useQuery();

  if (!actions.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>purp.game - activity feed</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DesktopWrapper>
        <main className="flex min-h-screen flex-col gap-3 bg-background px-5 py-6 font-inter text-gray-300">
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
                "absolute bottom-0 h-0.5 bg-farcaster-900 transition-all duration-300 ease-in-out " +
                `${
                  tab === "friends"
                    ? "w-14 translate-x-32"
                    : "w-24 translate-x-0"
                }`
              }
            ></div>
          </div>
          <div className="flex flex-col gap-4 py-2">
            {actions.data.map((item, index: Key) => (
              <ActivityItem
                key={index}
                avatars={item.avatars}
                by={item.by}
                to={item.to}
                action={item.action}
                points={item.points}
                time={item.time as unknown as number}
              />
            ))}
          </div>
        </main>
        <Navbar />
      </DesktopWrapper>
    </>
  );
};

export default Activity;
