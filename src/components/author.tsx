import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Twitter } from "lucide-react";

export const Author: FC<{
  name: string;
  description: string;
  avatar: string;
  twitter?: string;
}> = ({ name, avatar, twitter }) => {
  return (
    <div className="flex gap-2 items-center mt-3 rounded-md bg-gray-600/50 py-4 px-3">
      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black dark:border-white shadow-lg">
        <Image src={avatar} alt={name} fill />
      </div>
      <div className="leading-snug text-sm">
        <div className="text-black font-normal dark:font-light dark:text-white">
          {name}
        </div>
        {twitter && (
          <Link href={twitter} target="_blank" className="">
            <svg
              width={13}
              role="img"
              className="dark:fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>X</title>
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
