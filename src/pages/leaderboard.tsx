/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Head from "next/head";
import { useState } from "react";
import Cell, { type CellProp } from "~/components/Cell";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Leaderboard = () => {
  const [tab, setTab] = useState<"patron" | "new_user" | "earner">("patron");

  const { data: leaderboard } = api.actions.getLeaderboard.useQuery({
    lb_type: "patron",
  });
  console.log(leaderboard);

  return (
    <>
      <Head>
        <title>purp.game - leaderboard</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DesktopWrapper>
        <main className="flex min-h-screen flex-col gap-8 bg-background px-5 py-6 font-inter text-gray-300">
          <div className="text-xl font-medium">Leaderboard</div>
          <div className="relative flex items-center gap-10 border-b border-gray-900">
            <button
              onClick={() => setTab("patron")}
              className={`${
                tab === "patron" ? "text-farcaster-900" : null
              } py-1`}
            >
              Patrons
            </button>
            <button
              onClick={() => setTab("new_user")}
              className={`${
                tab === "new_user" ? "text-farcaster-900" : null
              } py-1`}
            >
              New Users
            </button>
            <button
              onClick={() => setTab("earner")}
              className={`${
                tab === "earner" ? "text-farcaster-900" : null
              } py-1`}
            >
              Earners
            </button>
            <div
              className={
                "absolute bottom-0 h-0.5 bg-farcaster-900 transition-all duration-300 ease-in-out " +
                `${
                  tab === "earner"
                    ? "w-20 translate-x-52"
                    : tab === "new_user"
                    ? "w-28 translate-x-20"
                    : "w-16 translate-x-0"
                }
                }`
              }
            ></div>
          </div>
          <div>
            <table className="w-full">
              <tr className="flex gap-2 bg-gray-900 px-3 py-2 text-xs text-gray-400">
                <th className="font-medium uppercase">Top</th>
                <th className="flex-grow text-left font-medium uppercase">
                  User
                </th>
                <th className="font-medium uppercase">Rewards</th>
              </tr>
              {!leaderboard ? (
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
                      strokeWidth="4"
                    ></circle>
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="flex flex-col gap-4 py-2">
                  {leaderboard.map((item: CellProp, index: number) => (
                    <Cell
                      key={index}
                      name={item.name}
                      rank={item.rank}
                      points={item.points}
                      avatar={item.avatar}
                    />
                  ))}
                </div>
              )}
            </table>
          </div>
        </main>
        <Navbar />
      </DesktopWrapper>
    </>
  );
};
export default Leaderboard;
