import Image from "next/image";

interface Props {
  username: string;
  avatar: string;
  rewards: number;
  rank: number;
}

const Cell = ({ username, avatar, rewards, rank }: Props) => {
  const medals = [
    <td className="pl-3" key="gold">
      <Image
        src="https://cdn.discordapp.com/attachments/856193656569462824/1155752497554673704/image.png"
        className="h-6 w-6"
        alt="gold medal"
        width={24}
        height={24}
      />
    </td>,
    <td className="pl-3" key="silver">
      <Image
        src="https://cdn.discordapp.com/attachments/856193656569462824/1155753300231213076/image.png"
        className="h-6 w-6"
        alt="silver medal"
        width={24}
        height={24}
      />
    </td>,
    <td className="pl-3" key="bronze">
      <Image
        src="https://cdn.discordapp.com/attachments/856193656569462824/1155753300495450112/image.png"
        className="h-6 w-6"
        alt="bronze medal"
        width={24}
        height={24}
      />
    </td>,
  ];

  return (
    <tr className="flex items-center gap-2 py-2">
      {medals[rank - 1] ?? <td className="pl-5 pr-2">{rank}</td>}
      <td className="flex flex-grow items-center gap-2">
        <Image
          src={avatar}
          className="h-11 w-11 rounded-full"
          alt="avatar"
          width={44}
          height={44}
        />
        <div className="flex items-center gap-2 text-gray-100">
          <Image
            src="https://cdn.discordapp.com/attachments/856193656569462824/1155751897869860895/image.png"
            className="h-5 w-5"
            alt="farcaster logo"
            width={20}
            height={20}
          />
          {username}
        </div>
      </td>
      <td className="whitespace-nowrap px-3">🟣{rewards}</td>
    </tr>
  );
};

export default Cell;
