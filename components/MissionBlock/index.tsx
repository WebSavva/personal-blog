import { AnimateOnReveal, Frame } from "types/AnimationReveal";

import { useCallback } from "react";

import useAnimationReveal from "../../hooks/useAnimationReveal";
import ActionLink from "../ActionLink";
import { animateByFrames } from "../../utils/animeUtils";

const MissionBlock = () => {
  const titleAnimate = useCallback<AnimateOnReveal>((anime) => {
    const frames: Array<Frame> = [
      [
        {
          targets: "#mission-block .title",
          opacity: [0, 1],
          duration: 15e2,
          easing: "linear",
        },
      ],
      [
        {
          targets: "#mission-block .blue-line",
          scaleX: [0, 1],
          duration: 12e2,
          easing: "easeInQuart",
        },
        "-=500",
      ],
    ];

    return animateByFrames(frames);
  }, []);

  const detailsAnimate = useCallback<AnimateOnReveal>((anime) => {
    const frames: Array<Frame> = [
      [
        {
          targets: "#mission-block .details",
          opacity: [0, 1],
          duration: 15e2,
          easing: "linear",
        },
        "+=1000",
      ],
    ];

    return animateByFrames(frames);
  }, []);

  const {elementRef: titleRef} = useAnimationReveal<HTMLDivElement>({
    animate: titleAnimate,
  });

  const {elementRef: detailsRef }= useAnimationReveal<HTMLParagraphElement>({
    animate: detailsAnimate,
  });

  return (
    <section className="my-24 space-y-16 lg:space-y-24 flex flex-col" id="mission-block">
      <div className="flex flex-col lg:flex-row px-10 md:px-16 justify-between lg:items-center">
        <div className="lg:w-[550px] mb-5 lg:mb-0 lg:mr-10" ref={titleRef}>
          <h1 className="text-5xl lg:text-6xl pr-3 mb-5 font-bold leading-[3.5rem] lg:leading-[4.5rem] opacity-0 title invisible">
            We help to succeed in the digital word
          </h1>

          <div className="w-full h-[10px] lg:h-[15px] bg-blue-700 origin-left blue-line invisible" />
        </div>

        <p className="text-xl font-extralight invisible lg:w-[45%] details" ref={detailsRef}>
          Brooklyn is the all-in-one theme to build a beautiful website. Your
          way to a professional website. Flexible and contemporary with 44+
          detailed pre-made websites.
        </p>
      </div>

      <ActionLink className="self-center"/>
    </section>
  );
};

export default MissionBlock;
