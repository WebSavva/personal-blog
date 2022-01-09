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
import { FC, useRef, useEffect } from "react";
import anime from "animejs";

import splitIntoLetters from "utils/splitIntoLetters";
import useIntersetionObserver from "hooks/useIntersetionObserver";

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

const TechnologyBlock: FC = () => {
  const sectionRef = useRef<null | HTMLElement>(null);
  const isRevealed = useIntersetionObserver({
    rootRef: sectionRef,
  });
  const headingText = splitIntoLetters("Technologies");

  useEffect(() => {
    const targets = {
      heading: sectionRef.current?.querySelectorAll("h2 span") || ([] as any),
      icons: sectionRef.current?.querySelectorAll("svg") || ([] as any),
    };

    if (!isRevealed) {
      anime.set(
        Object.values(targets).reduce(
          (ac, nodeList) => [...ac, ...Array.from(nodeList)],
          []
        ),
        {
          opacity: 0,
        }
      );
    } else {
      const timeline = anime.timeline({});
      timeline
        .add({
          targets: targets.heading,
          translateX: {
            value: [-10, 0],
            duration: 7e2,
            easing: "easeOutQuart",
          },
          opacity: {
            value: [0, 1],
            duration: 5e2,
            easing: "easeOutQuart"
          },
          delay: (el, i) => 50 * i,
        })
        .add({
          targets: targets.icons,
          delay: (el: Element, i: number) => i * 100,
          scale: [0, 1],
          opacity: [0, 1],
          easing: "easeInOutElastic(1, .4)",
          duration: 15e2,
        }, '-=1500');
    }
  }, [isRevealed]);

  const logos = icons.map((Icon) => (
    <Icon key={Icon.name} className="h-full w-full fill-slate-600" />
  ));

  return (
    <section className={`my-32 px-14`} ref={sectionRef}>
      <div className="flex justify-between">
        <h2 className="text-5xl font-bold text-gray-800">{headingText}</h2>

        <div className="grid grid-cols-[repeat(5,70px)] gap-[80px]">
          {logos}
        </div>
      </div>
    </section>
  );
};

export default TechnologyBlock;
