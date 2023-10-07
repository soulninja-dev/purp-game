import Head from "next/head";
import PullToRefresh from "react-simple-pull-to-refresh";
import ActivityItem, { type ActionProps } from "~/components/ActivityItem";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

const Activity = () => {
  const { data: actions, refetch } = api.actions.getAllActions.useQuery();

  return (
    <>
      <Head>
        <title>purp.game - activity feed</title>
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
          <main className="flex min-h-screen flex-col gap-3 bg-background px-5 py-6 font-inter text-gray-300">
            <div className="text-xl font-medium">All Activity</div>
            {!actions ? (
              <Spinner className="h-[calc(100vh-172.8px)]" />
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
      </PullToRefresh>
    </>
  );
};

export default Activity;
