import Head from "next/head";
import { useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Cell from "~/components/Cell";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

const Leaderboard = () => {
  const [tab, setTab] = useState<"patron" | "new_user" | "recipient">("patron");

  const [hackyLoader, setHackyLoader] = useState(false);

  const { data: leaderboard, refetch } = api.actions.getLeaderboard.useQuery({
    lb_type: tab,
  });

  return (
    <>
      <Head>
        <title>purp.game - leaderboard</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PullToRefresh
        onRefresh={async () => {
          await refetch();
          return;
        }}
        backgroundColor="#0A0A0A"
        refreshingContent={<Spinner />}
        pullingContent={<Spinner />}
      >
        <DesktopWrapper>
          <main className="flex min-h-screen flex-col gap-8 bg-background px-5 py-6 font-inter text-gray-300">
            {hackyLoader ? (
              <Spinner className="h-[calc(100vh-64px)]" />
            ) : (
              <>
                <div className="text-xl font-medium">Leaderboard</div>
                {/* the tab switcher */}
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
                    onClick={() => setTab("recipient")}
                    className={`${
                      tab === "recipient" ? "text-farcaster-900" : null
                    } py-1`}
                  >
                    Earners
                  </button>
                  <div
                    className={
                      "absolute bottom-0 h-0.5 bg-farcaster-900 transition-all duration-300 ease-in-out " +
                      `${
                        tab === "recipient"
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
                      <Spinner className="h-[calc(100vh-172.8px)]" />
                    ) : (
                      <div className="flex flex-col gap-4 py-2">
                        {leaderboard.map((item, index) => (
                          <Cell
                            key={index}
                            name={item.name}
                            rank={item.rank}
                            points={item.points}
                            avatar={item.avatar}
                            setLoader={setHackyLoader}
                          />
                        ))}
                      </div>
                    )}
                  </table>
                </div>
              </>
            )}
          </main>
          <Navbar />
        </DesktopWrapper>
      </PullToRefresh>
    </>
  );
};

export default Leaderboard;
