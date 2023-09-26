import Head from "next/head";
import { useState } from "react";
import ActivityItem from "~/components/ActivityItem";
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
        <div className="flex flex-col gap-4 py-2">
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226801849340015/image.png?ex=6514339f&is=6512e21f&hm=63a43f78dd48e3693fa6623cf523bdfb12b945f76a56594b9d5e08abebfecb23&",
            ]}
            by="You"
            to="elonmusk"
            action="like"
            points={1}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226801849340015/image.png?ex=6514339f&is=6512e21f&hm=63a43f78dd48e3693fa6623cf523bdfb12b945f76a56594b9d5e08abebfecb23&",
            ]}
            by="You"
            to="elonmusk"
            action="like"
            points={1}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226801849340015/image.png?ex=6514339f&is=6512e21f&hm=63a43f78dd48e3693fa6623cf523bdfb12b945f76a56594b9d5e08abebfecb23&",
            ]}
            by="corbin.eth"
            to="elonmusk"
            action="like"
            points={1}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226801849340015/image.png?ex=6514339f&is=6512e21f&hm=63a43f78dd48e3693fa6623cf523bdfb12b945f76a56594b9d5e08abebfecb23&",
            ]}
            by="corbin.eth"
            to="elonmusk"
            action="like"
            points={1}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226879397822494/image.png?ex=651433b1&is=6512e231&hm=e86ae311325e3be5e3b120835ed0280ce09f91beca54b8c3e8bd082dc5c45bb0&",
            ]}
            by="You"
            to="ogechukwu.eth"
            action="recast"
            points={3}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226879397822494/image.png?ex=651433b1&is=6512e231&hm=e86ae311325e3be5e3b120835ed0280ce09f91beca54b8c3e8bd082dc5c45bb0&",
            ]}
            by="You"
            to="elonmusk"
            action="recast"
            points={3}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226879397822494/image.png?ex=651433b1&is=6512e231&hm=e86ae311325e3be5e3b120835ed0280ce09f91beca54b8c3e8bd082dc5c45bb0&",
            ]}
            by="You"
            to="elonmusk"
            action="recast"
            points={3}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
          <ActivityItem
            avatars={[
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226836121002004/image.png?ex=651433a7&is=6512e227&hm=08dc1ef7293cf8a1e41b6cc4c2e6f743a09c01942772a43648ac080b17abebfe&",
              "https://cdn.discordapp.com/attachments/856193656569462824/1156226801849340015/image.png?ex=6514339f&is=6512e21f&hm=63a43f78dd48e3693fa6623cf523bdfb12b945f76a56594b9d5e08abebfecb23&",
            ]}
            by="You"
            to="elonmusk"
            action="like"
            points={1}
            time={(new Date() as unknown as number) - 3600 * 1000}
          />
        </div>
      </main>
      <Navbar />
    </>
  );
};

export default Activity;
