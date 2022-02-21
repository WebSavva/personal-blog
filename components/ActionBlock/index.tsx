import { AnimateOnReveal } from "types/AnimationReveal";

import Image from "next/image";
import WordSpliter from "../UI/WordSpliter";
import useAnimationReveal from "@hooks/useAnimationReveal";
import { animateByFrames } from "@/utils/animeUtils";

import codeImg from "./appeal_code.jpg";

const animateActionBlock: AnimateOnReveal = (anime) => {
  return animateByFrames([
    [
      {
        targets: "#action-block .action-letter",
        opacity: {
          value: [0, 1],
          duration: 7e2,
          easing: "linear",
        },
        translateX: {
          value: [30, 0],
          duration: 1e3,
          easing: "easeOutElastic(1, .8)",
        },
        translateZ: 0,
        delay: (el, i) => 60 * (i + 1),
      },
      0
    ],
  ]);
};

const ActionBlock = () => {
  const { elementRef: sectionRef, isPlayed } = useAnimationReveal({
    animate: animateActionBlock,
    threshold: .5,
  });

  return (
    <section
      className="w-full relative  flex items-center min-h-[300px] md:min-h-[600px] justify-center overflow-hidden  px-5 py-5 md:py-10"
      ref={sectionRef}
      id="action-block"
    >
      <div className="w-full min-h-[300px] lg:min-h-[600px] absolute">
        <Image
          unoptimized
          src={codeImg.src}
          layout="fill"
          alt=""
          objectFit="cover"
          role="presentation"
          className="brightness-50"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-[50px] sm:text-7xl lg:text-9xl relative z-10 leading-[1.1em] tracking-[.05em] uppercase font-bold text-center text-white">
          <WordSpliter
            text={`Let's code\ntogether!`}
            isSplitted={!isPlayed}
            className="invisible action-letter"
          />
        </h1>
      </div>
    </section>
  );
};

export default ActionBlock;
