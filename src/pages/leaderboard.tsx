import Head from "next/head";
import Cell from "~/components/Cell";
import DesktopWrapper from "~/components/DesktopWrapper";
import Navbar from "~/components/Navbar";

const Leaderboard = () => {
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
          <div>
            <table className="w-full">
              <tr className="flex gap-2 bg-gray-900 px-3 py-2 text-xs text-gray-400">
                <th className="font-medium uppercase">Top</th>
                <th className="flex-grow text-left font-medium uppercase">
                  User
                </th>
                <th className="font-medium uppercase">Rewards</th>
              </tr>
              <Cell
                username="elonmusk"
                rank={1}
                rewards={20}
                avatar="https://cdn.discordapp.com/attachments/856193656569462824/1155753722161397770/image.png"
              />
              <Cell
                username="corbinpage"
                rank={2}
                rewards={17}
                avatar="https://cdn.discordapp.com/attachments/856193656569462824/1155753722371117116/image.png"
              />
              <Cell
                username="joelintonnn"
                rank={3}
                rewards={15}
                avatar="https://cdn.discordapp.com/attachments/856193656569462824/1155753722597613578/image.png"
              />
              <Cell
                username="dantheman"
                rank={4}
                rewards={14}
                avatar="https://cdn.discordapp.com/attachments/856193656569462824/1155756988387561472/image.png"
              />
            </table>
          </div>
        </main>
        <Navbar />
      </DesktopWrapper>
    </>
  );
};

export default Leaderboard;
