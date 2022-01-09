import Image from "next/image";
import { FC, useRef, useEffect, useState, useCallback } from "react";
import anime, { timeline } from "animejs";

import useIntersetionObserver from "hooks/useIntersetionObserver";
import splitIntoLetters from "utils/splitIntoLetters";

import codeImg from "./appeal_code.jpg";

const ActionBlock: FC = (props) => {
  const sectionRef = useRef<null | HTMLElement>(null);

  const isRevealed = useIntersetionObserver({
    rootRef: sectionRef,
  });

  const actionHeading = [
    ...splitIntoLetters(`Let's code`),
    <br key="br" />,
    ...splitIntoLetters("together !"),
  ];

  useEffect(() => {
    const charSpans =
      sectionRef.current?.querySelectorAll(".action-heading span") || [];
    const subscribeForm = sectionRef.current?.querySelector(".subscribe-form");

    if (!isRevealed) {
      anime.set([...Array.from(charSpans), subscribeForm], {
        opacity: 0,
      });
      return;
    }

    const timeline = anime.timeline({});

    timeline
      .add({
        targets: sectionRef.current?.querySelectorAll(".action-heading span"),
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
      })
      .add(
        {
          targets: sectionRef.current?.querySelector(".subscribe-form"),
          duration: 5e2,
          opacity: [0, 1],
          easing: "linear",
        },
        "-=800"
      );
  }, [isRevealed]);

  return (
    <section
      className="w-full relative  flex items-center min-h-[600px] justify-center overflow-hidden py-10"
      ref={sectionRef}
    >
      <div className="w-full min-h-[600px] absolute">
        <Image
          src={codeImg.src}
          layout="fill"
          objectFit="cover"
          alt=""
          className="brightness-50"
        />
      </div>

      <div className="flex flex-col relative z-10">
        <h1 className="text-9xl leading-[1.1em] tracking-[.05em] uppercase font-bold text-center text-white relative z-10 action-heading">
          {actionHeading}
        </h1>

        <form className="mt-5 flex subscribe-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="shadow-xl shadow-indigo-500/50 py-3 px-5 rounded-l-md text-lg text-gray-500 grow"
          />

          <button className="shadow-xl shadow-indigo-700/50 px-5 bg-blue-700 rounded-r-md text-white text-bold text-center">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default ActionBlock;
