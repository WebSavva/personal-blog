import { FC, useState, useEffect, useMemo, useRef } from "react";
import anime from "animejs";

import splitIntoLetters from "utils/splitIntoLetters";

const DEFAULT_WORDS: string[] = ["awesome", "creative", "bold", "unique"];

const HeroBlock: FC = () => {
  const words = useMemo<string[]>(() => DEFAULT_WORDS, []);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const sectionRef = useRef<null | HTMLElement>(null);

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

  useEffect(() => {
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
      delay: (el: Element, i: number) => 20 * (i + 1),
    };

    anime
      .timeline({})
      .add({
        targets: sectionRef.current?.querySelectorAll(".upper-heading span"),
        ...animationConfig,
      })
      .add({
        targets: sectionRef.current?.querySelector('.middle-heading'),
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "easeOutCubic",
        duration: 1e3,
      }, "-=400")
      .add({
        targets: sectionRef.current?.querySelectorAll(".hero-bar"),
        scaleX: [0, 1],
        easing: "easeInCubic",
        duration: 1e3,
      }, "-=500")
      .add({
        targets: sectionRef.current?.querySelectorAll(".bottom-heading span"),
        ...animationConfig,
      });
  }, []);

  const bottomHeadingChars = splitIntoLetters(
    "Next Level Video Production & Digital Marketing."
  );
  const upperHeadingChars = splitIntoLetters("For the new digital world.");

  return (
    <section
      className="flex flex-col space-y-8 items-center py-14 mt-28"
      ref={sectionRef}
    >
      <h4 className="text-md uppercase upper-heading">
        {upperHeadingChars}
      </h4>

      <h1 className="text-9xl font-bold capitalize middle-heading">{words[wordIndex]}</h1>

      <div className="w-[400px] h-[15px] bg-blue-600 hero-bar" />

      <h2 className="text-2xl font-light font-serif bottom-heading">
        {bottomHeadingChars}
      </h2>
    </section>
  );
};

export default HeroBlock;
