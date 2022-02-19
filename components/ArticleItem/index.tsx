import { IArticleMetadata, ExtendedIArticleMetadata } from "types/Blog";
import { FC } from "react";
import { AnimateOnReveal } from "types/AnimationReveal";

import Image from "next/image";
import Link from "next/link";

import formateDate from "@/utils/formateDate";
import useAnimationReveal from "@hooks/useAnimationReveal";
import meteorImage from '../../public/meteor-logo.png';

const ArticleItem: FC<ExtendedIArticleMetadata & { order: number }> = ({
  description,
  publishedAt,
  thumbnail,
  title,
  tags,
  order,
  slug,
}) => {
  const isEven = !(order % 2);

  const appearAnimation: AnimateOnReveal = (anime, el) => {
    anime
      .timeline({
        duration: 800,
        easing: "easeOutQuart",
      })
      .add({
        targets: el,
        opacity: {
          value: [0, 1],
          duration: 600,
          easing: "linear",
        },
        translateX: {
          value: [330 * (isEven ? 1 : -1), 0],
          duration: 800,
          easing: "easeOutQuart",
        },
        begin: (animeState) => {
          animeState.animatables.forEach((el) =>
            el.target.classList.remove("invisible")
          );
        },
      })
      .add({
        targets: el.querySelector(".text"),
        begin: (animeState) => {
          animeState.animatables.forEach((el) =>
            el.target.classList.remove("invisible")
          );
        },
        opacity: [0, 1],
        translateY: [20, 0],
      });
  };

  const blogRef = useAnimationReveal<HTMLAnchorElement>({
    animate: appearAnimation,
  });

  return (
    <Link
      href={{
        pathname: "/blog/[slug]",
        query: {
          slug,
        },
      }}
    >
      <a
        ref={blogRef}
        className="shadow flex space-x-5 rounded-lg overflow-hidden w-[60%] invisible"
      >
        <div className="w-[250px] flex-shrink-0 h-[250px] relative">
          <Image src={thumbnail} alt={title} layout="fill" objectFit="cover" blurDataURL={meteorImage.src}/>
        </div>

        <div className="p-5 space-y-2 text">
          <h5 className="text-lg font-bold uppercase">{title}</h5>

          <small className="text-gray-600">{formateDate(publishedAt)}</small>

          <p className="text-gray-800 text-md line-clamp-4 mt">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default ArticleItem;
