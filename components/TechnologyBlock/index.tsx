import { AnimateOnReveal } from "types/AnimationReveal";

import {
  SiJavascript,
  SiNodedotjs,
  SiNestjs,
  SiTypescript,
  SiVuedotjs,
  SiReact,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSass,
  SiMongodb,
} from "react-icons/si";

import WordSpliter from "../UI/WordSpliter";
import useAnimationReveal from "@hooks/useAnimationReveal";
import { animateByFrames } from "@/utils/animeUtils";

const icons = [
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiVuedotjs,
  SiReact,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSass,
  SiMongodb,
];
const animateTechnologyBlock: AnimateOnReveal = (anime) => {
  return animateByFrames([
    [
      {
        targets: "#technology-block .title-letter",
        translateX: {
          value: [-10, 0],
          duration: 7e2,
          easing: "easeOutQuart",
        },
        opacity: {
          value: [0, 1],
          duration: 5e2,
          easing: "easeOutQuart",
        },
        delay: (el, i) => 50 * i,
      },
    ],
    [
      {
        targets: "#technology-block .icon",
        delay: (el: Element, i: number) => i * 100,
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeInOutElastic(1, .4)",
        duration: 15e2,
      },
      "-=1500",
    ],
  ]);
};

const TechnologyBlock = () => {
  const { elementRef: sectionRef, isPlayed } = useAnimationReveal({
    animate: animateTechnologyBlock,
    threshold: .25,
  });

  const logos = icons.map((Icon) => (
    <div key={Icon.name} className="flex-grow">
      <Icon
        key={Icon.name}
        className="mr-5 mb-5 lg:mr-0 lg:mb-0  h-full w-full fill-slate-600 invisible icon"
      />
    </div>
  ));

  return (
    <section
      className={`my-32 px-5 md:px-14`}
      ref={sectionRef}
      id="technology-block"
    >
      <div className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row justify-between">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          <WordSpliter text="Technologies" className="invisible title-letter" isSplitted={!isPlayed}/>
        </h2>

        <div className="grid technology-list gap-12 lg:grid-cols-[repeat(5,70px)] lg:gap-[50px] xl:gap-[80px]">
          {logos}
        </div>
      </div>
    </section>
  );
};

export default TechnologyBlock;
