import Link from "next/link";
import { useRouter } from "next/router";
import ActivityIcon from "./icons/Activity";
import LeaderboardIcon from "./icons/Leaderboard";
import UserIcon from "./icons/User";
import type { ReactNode } from "react";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex w-full max-w-sm justify-around gap-6 bg-gray-950 px-4 py-1 font-medium text-gray-500">
      <Item href="/activity" label="Activity" icon={<ActivityIcon />} />
      <Item
        href="/leaderboard"
        label="Leaderboard"
        icon={<LeaderboardIcon />}
      />
      <Item href="/profile" label="Profile" icon={<UserIcon />} />
    </div>
  );
};

interface ItemProps {
  href: `/${string}`;
  icon: ReactNode;
  label: string;
}

const Item = ({ href, icon, label }: ItemProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`flex flex-col items-center px-2 py-1 ${
        router.pathname === href ? "text-farcaster-900" : null
      }`}
    >
      {icon}
      <div>{label}</div>
    </Link>
  );
};

export default Navbar;
