import Head from "next/head";
import { useState } from "react";
import ActivityItem, { type ActionProps } from "~/components/ActivityItem";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Activity = () => {
  const [tab, setTab] = useState<"activity" | "friends">("activity");

  const { data: actions } = api.actions.getAllActions.useQuery();

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
          {!actions ? (
            <div className="flex h-[calc(100vh-172.8px)] items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-2">
              {actions?.map((item: ActionProps, index: number) => (
                <ActivityItem
                  key={index}
                  avatars={item.avatars}
                  by={item.by}
                  to={item.to}
                  action={item.action}
                  points={item.points}
                  time={item.time}
                />
              ))}
            </div>
          )}
        </main>
        <Navbar />
      </DesktopWrapper>
    </>
  );
};

export default Activity;
