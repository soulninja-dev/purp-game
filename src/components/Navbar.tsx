import Link from "next/link";
import { useRouter } from "next/router";
import ActivityIcon from "./icons/Activity";
import LeaderboardIcon from "./icons/Leaderboard";
import type { ReactNode } from "react";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex w-full justify-around gap-6 bg-[#131315] px-4 py-1 font-medium text-[#76787A]">
      <Item href="/activity" label="Activity" icon={<ActivityIcon />} />
      <Item
        href="/leaderboard"
        label="Leaderboard"
        icon={<LeaderboardIcon />}
      />
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
        router.pathname === href ? "text-[#8465CB]" : null
      }`}
    >
      {icon}
      <div>{label}</div>
    </Link>
  );
};

export default Navbar;
