import { IArticleMetadata, ExtendedIArticleMetadata } from "types/Blog";
import { FC } from "react";
import { AnimateOnReveal } from "types/AnimationReveal";

import Image from "next/image";
import Link from "next/link";

import formateDate from "@/utils/formateDate";
import useAnimationReveal from "@hooks/useAnimationReveal";
import meteorImage from "../../public/meteor-logo.png";
import { animateByFrames } from "@/utils/animeUtils";

const appearAnimation: AnimateOnReveal = (_, el) => {

  return animateByFrames(
    [
      [
        {
          targets: el.querySelector(".image"),
          opacity: [0, 1],
          translateX: [-100, 0],
        },
      ],
      [
        {
          targets: el.querySelector(".text"),
          opacity: [0, 1],
          translateY: [20, 0],
        },
      ],
    ],
    {
      duration: 800,
      easing: "easeOutQuart",
    }
  );
};
const ArticleItem: FC<ExtendedIArticleMetadata> = ({
  description,
  publishedAt,
  thumbnail,
  title,
  tags,
  slug,
}) => {
  const { elementRef: articleRef } = useAnimationReveal<HTMLAnchorElement>({
    animate: appearAnimation,
    threshold: .5,
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
        ref={articleRef}
        className="shadow-lg flex flex-col md:flex-row md:space-x-5 rounded-lg overflow-hidden lg:w-[60%]"
      >
        <div className="w-full md:w-[250px] flex-shrink-0 h-[200px] md:h-[250px] invisible relative image">
          <Image
            unoptimized
            src={thumbnail}
            alt={title}
            layout="fill"
            objectFit="cover"
            blurDataURL={meteorImage.src}
            className="image"
          />
        </div>

        <div className="p-5 space-y-2 text">
          <h5 className="text-lg font-bold uppercase">{title}</h5>

          <small className="text-gray-600">{formateDate(publishedAt)}</small>

          <p className="text-gray-800 text-md md:line-clamp-4 mt">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default ArticleItem;
