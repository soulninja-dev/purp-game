import type { GetServerSideProps } from "next";

const Index = () => {
  return <></>;
};

export default Index;

// weird unfixable ts error
// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/leaderboard", permanent: false },
    props: {},
  };
};
