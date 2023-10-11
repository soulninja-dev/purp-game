import Head from "next/head";
import DesktopWrapper from "~/components/DesktopWrapper";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>purp.game - profile</title>
        <meta name="description" content="p2p creator rewards for farcaster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DesktopWrapper noPaddingBottom={true}>
        <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-background px-5 font-inter text-farcaster-900">
          <div className="text-5xl font-bold">404</div>
          <div className="text-xl font-semibold">Page not Found</div>
        </main>
      </DesktopWrapper>
    </>
  );
};

export default NotFound;
