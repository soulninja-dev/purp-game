import Image from "next/image";
import { relativeTimeFrom } from "~/utils/utils";

interface Props {
  avatars: `https://${string}`[];
  by: string;
  to: string;
  action: "like" | "recast" | "follow";
  points: number;
  time: number;
}

const ActivityItem = ({ by, to, action, points, avatars, time }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2 text-gray-300">
      <div className="flex">
        {avatars.map((avatar, ind) => (
          <Image
            src={avatar}
            className={
              "h-11 w-11 rounded-full " + (ind === 1 ? "-translate-x-4" : null)
            }
            key={ind}
            width={44}
            height={44}
            alt="avatar"
          />
        ))}
      </div>
      <div className="col-span-3 flex flex-col gap-1">
        <div className="">
          <span className="font-semibold text-gray-100">{by}</span>{" "}
          {action === "like"
            ? "liked "
            : action === "recast"
            ? "recasted "
            : "followed "}
          {action != "follow" ? (
            <span className="font-semibold text-gray-100">
              {to + "'s"} cast.
            </span>
          ) : (
            <span className="font-semibold text-gray-100">{to}!</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div>{relativeTimeFrom(time)}</div>
          <div className="h-[3px] w-[3px] rounded-full bg-[#D9D9D9]"></div>
          <div>
            🟣{points} point{`${points > 1 ? "s" : ""}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
