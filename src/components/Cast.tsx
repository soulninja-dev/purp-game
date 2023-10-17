import Image from "next/image";
import ShareIcon from "./icons/Share";
import HeartIcon from "./icons/Heart";
import RecastIcon from "./icons/Recast";
import CommentIcon from "./icons/Comment";
import type { BaseLBUser, Post } from "~/utils/types";

interface InteractionProps {
  likes: number;
  recasts: number;
  comments: number;
}

const PostInteractions = ({ likes, recasts, comments }: InteractionProps) => {
  return (
    <div className="flex gap-2">
      <div className="w-[44px] flex-shrink-0"></div>
      <div className="flex w-full items-center justify-between text-gray-100">
        <div className="flex gap-3">
          <button className="flex items-center gap-1">
            <CommentIcon />
            {comments}
          </button>
          <button className="flex items-center gap-1">
            <RecastIcon />
            {recasts}
          </button>
          <button className="flex items-center gap-1">
            <HeartIcon />
            {likes}
          </button>
        </div>
        <button>
          <ShareIcon />
        </button>
      </div>
    </div>
  );
};

interface Props {
  user: Partial<BaseLBUser>;
  post: Post;
  first?: boolean;
}

const Cast = ({ user, post, first = false }: Props) => {
  return (
    <div
      className={`flex flex-col gap-3 border-b border-gray-900 ${
        first ? "pb-4" : "py-4"
      }`}
    >
      <div className="flex gap-2">
        <div className="flex-shrink-0">
          <Image
            src={user.useravatarurl!}
            alt="avatar"
            width={44}
            height={44}
            className="h-[44px] w-[44px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="text-gray-100">{user.userdisplayname}</div>
            <Image
              src="https://cdn.discordapp.com/attachments/856193656569462824/1155751897869860895/image.png"
              className="h-5 w-5"
              alt="farcaster logo"
              width={20}
              height={20}
            />
            <div className="text-sm text-gray-200">
              @{user.username} &sdot; 5h
            </div>
          </div>
          <div className="text-gray-100">{post.content}</div>
        </div>
      </div>
      {post.attachments?.map((attachment, ind) => (
        <div className="flex gap-2" key={ind}>
          <div className="w-[44px] flex-shrink-0"></div>
          <div className="relative h-64 w-full">
            <Image
              src={attachment}
              alt="attachment"
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}
      <PostInteractions
        likes={post.likes}
        recasts={post.recasts}
        comments={post.comments}
      />
    </div>
  );
};

export default Cast;
