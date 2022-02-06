import { SerializedArticleMetadata } from "types/Blog";
import { FC } from "react";
import { AnimateOnReveal } from "types/AnimationReveal";

import Image from "next/image";

import formateDate from "@/utils/formateDate";
import useAnimationReveal from "@hooks/useAnimationReveal";

type ExtnedArticleProps = SerializedArticleMetadata & { order: number };
const ArticleItem: FC<ExtnedArticleProps> = ({
  description,
  publishedDate,
  thumbnailUrl,
  title,
  tags,
  order,
}) => {
  const isEven = !(order % 2);

  const appearAnimation: AnimateOnReveal = (anime, el) => {
    anime.timeline({
      duration: 800,
        easing: "easeOutQuart",
    }).add({
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
      }}).add({
        targets: el.querySelector('.text'),
        begin: (animeState) => {
          animeState.animatables.forEach((el) =>
            el.target.classList.remove("invisible")
          );
        },
        opacity: [0, 1],
        translateY: [20, 0],
      });
      
  };

  const blogRef = useAnimationReveal<HTMLDivElement>({
    animate: appearAnimation
  });

  return (
    <div ref={blogRef} className="shadow flex space-x-5 rounded-lg overflow-hidden w-[60%] invisible">
      <div className="w-[250px] flex-shrink-0 h-[250px] relative">
        <Image src={thumbnailUrl} alt={title} layout="fill" objectFit="cover" />
      </div>

      <div className="p-5 space-y-2 text">
        <h5 className="text-lg font-bold uppercase">{title}</h5>

        <small className="text-gray-600">
           {formateDate(publishedDate)}     
        </small>

        <p className="text-gray-800 text-md line-clamp-4 mt">{description}</p>
      </div>
    </div>
  );
};

export default ArticleItem;
