import { FC } from "react";
import { useEffect, useState, useRef } from "react";
import anime from "animejs";

import useIntersetionObserver from "hooks/useIntersetionObserver";
import ActionLink from "../ActionLink";

const MissionBlock: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const isRevealed = useIntersetionObserver({
    rootRef: sectionRef,
  });

  useEffect(() => {
    const timeline = anime.timeline({});

    timeline
      .add({
        targets: sectionRef.current?.querySelectorAll(".mission-text"),
        opacity: isRevealed ? [0, 1] : [1, 0],
        duration: isRevealed ? 15e2 : 0,
        easing: "linear",
      })
      .add(
        {
          targets: sectionRef.current?.querySelector(".blue-line"),
          scaleX: isRevealed ? [0, 1] : [1, 0],
          duration: isRevealed ? 12e2 : 0,
          easing: "easeInQuart",
        },
        "-=500"
      );
  }, [isRevealed]);

  return (
    <section className="my-24" ref={sectionRef}>
      <div className="flex px-16 justify-between items-center">
        <div className="w-[550px]">
          <h1 className="text-6xl pr-3 mb-5 font-bold leading-[4.5rem] opacity-0 mission-text">
            We help to succeed in the digital word
          </h1>

          <div className="w-full h-[15px] bg-blue-700 origin-left blue-line" />
        </div>

        <p className="text-xl font-extralight w-[45%] mission-text">
          Brooklyn is the all-in-one theme to build a beautiful website. Your
          way to a professional website. Flexible and contemporary with 44+
          detailed pre-made websites.
        </p>
      </div>

      <ActionLink className="mt-24"/>
    </section>
  );
};

export default MissionBlock;
