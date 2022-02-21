import { AnimeParams } from "animejs";
import { AnimateOnReveal, Frame } from "types/AnimationReveal";

import { useState, useEffect, useRef } from "react";

import WordSpliter from "@/components/UI/WordSpliter";
import useAnimationReveal from "@hooks/useAnimationReveal";
import useMediaQuery from "@hooks/useMediaQuery";
import { animateByFrames } from "@/utils/animeUtils";

const animate: AnimateOnReveal = (anime) => {
  const animationConfig = {
    opacity: {
      value: [0, 1],
      duration: 600,
      easing: "linear",
    },
    translateX: {
      value: [30, 0],
      duration: 800,
      easing: "easeOutQuart",
    },
    translateZ: 0,
  };

  const frames: Array<Frame> = [
    [
      {
        targets: "#hero-block .upper-heading span",
        ...animationConfig,
      },
    ],
    [
      {
        targets: "#hero-block .middle-heading",
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "easeOutCubic",
        duration: 1e3,
      },
      "-=400",
    ],
    [
      {
        targets: "#hero-block .hero-bar",
        scaleX: [0, 1],
        easing: "easeInCubic",
        duration: 1e3,
      },
      "-=500",
    ],
    [
      {
        targets: "#hero-block .bottom-heading span",
        ...animationConfig,
      },
    ],
  ];

  return animateByFrames(frames, {
    delay: (el: Element, i: number) => 20 * (i + 1),
  });
};

const HeroBlock = () => {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const words = ["awesome", "creative", "bold", "unique"];

  const isSmallScreen = useMediaQuery('(max-width:430px)');
  
  const { elementRef: sectionRef, isPlayed } = useAnimationReveal({
    animate,
  });

  useEffect(() => {
    let prevTime = performance.now();

    const nextWord = (currentTime: number) => {
      if (currentTime - prevTime > 500) {
        setWordIndex((prevIndex) => (prevIndex + 1) % (words.length - 1));
        prevTime = currentTime;
      }

      requestAnimationFrame(nextWord);
    };

    requestAnimationFrame(nextWord);
  }, [words.length]);

  return (
    <section
      className="flex flex-col space-y-8 items-center py-14 mt-28"
      ref={sectionRef}
      id="hero-block"
    >
      <h4 className="text-md uppercase upper-heading">
        <WordSpliter
          text="For the new digital world."
          className="invisible"
          isSplitted={!isPlayed}
        />
      </h4>

      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold invisible capitalize middle-heading">
        {words[wordIndex]}
      </h1>

      <div className="w-[200px] md:w-[400px] h-[10px] lg:h-[15px] bg-blue-600 hero-bar invisible" />

      <h2 className="text-[18px] px-5 sm:text-lg text-center md:text-2xl font-light font-serif bottom-heading">
        <WordSpliter
          text={`Next Level Video Production & Digital${isSmallScreen ? '\n' : ' '}Marketing.`}
          className="invisible"
          isSplitted={!isPlayed}
        />
      </h2>
    </section>
  );
};

export default HeroBlock;
