"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import * as ReactTweet from "react-tweet";
import * as ReactTwitchEmbed from "react-twitch-embed";
import {
  MdxA,
  MdxBlockQuote,
  MdxH2,
  MdxH3,
  MdxH4,
  MdxP,
  MdxUl,
} from "@/components/mdx-elements";
import { Pre } from "@/components/pre";
import Image from "next/image";

const YouTube = ({ url }: { url: string }) => (
  <div className="video-container">
    <iframe
      className="video-responsive-iframe"
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

const Tweet = ({ id }: { id: string }) => (
  <div className="tweet">
    <ReactTweet.Tweet id={id} />
  </div>
);

const Img = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="block pb-6"
  />
);

const TwitchClip = ({ clip }: { clip: string }) => (
  <div>
    <ReactTwitchEmbed.TwitchClip clip={clip} autoplay={false} />
  </div>
);

const TwitchPlayerNonInteractive = ({ video }: { video: string }) => (
  <div>
    <ReactTwitchEmbed.TwitchPlayerNonInteractive
      video={video}
      autoplay={false}
    />
  </div>
);

export const MDX: React.FC<{ content: string }> = ({ content }) => {
  const Content = useMDXComponent(content);

  return (
    <div className="pb-16 relative prose max-w-3xl prose-headings:font-display dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-tr:border-zinc-200 dark:prose-tr:border-white/20 prose-thead:text-base prose-thead:font-sans prose-thead:border-zinc-200 dark:prose-thead:border-white/20 text-zinc-700 dark:text-zinc-300 prose-li:my-1">
      <Content
        components={{
          h2: MdxH2,
          h3: MdxH3,
          h4: MdxH4,
          blockquote: MdxBlockQuote,
          pre: Pre,
          a: MdxA,
          p: MdxP,
          ul: MdxUl,
          Img: Img,
          Tweet,
          YouTube,
          TwitchClip,
          TwitchPlayerNonInteractive,
        }}
      />
    </div>
  );
};
