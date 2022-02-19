import { IArticleSection } from "types/SectionContext";

import { SectionContext } from "context/SectionContext";

import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";

import AnimatedTitle from "./AnimatedTitle";

const ArticleSpy = () => {
  const { sections, clear } = useContext(SectionContext);
  const [activeSection, setActiveSection] = useState<IArticleSection | null>(
    null
  );
  const [scrolledHeight, setScrolledHeight] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const {
        scrollTop,
        offsetHeight,
        clientHeight: viewportHeight,
      } = document.documentElement;

      setScrolledHeight(
        Math.round(
          ((scrollTop + Math.min(scrollTop, viewportHeight)) * 1e2) /
            offsetHeight
        )
      );

      let activeSection = null;

      if (sections.length)
        activeSection =
          [...sections]
            .reverse()
            .find(
              (section) =>
                viewportHeight > section.el.getBoundingClientRect().top
            ) || null;

      setActiveSection(activeSection);
    }, 2e2);

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [sections]);

  useEffect(() => {

    if (!activeSection) return;

    router.push({
      hash: activeSection.id,
    })

  }, [activeSection]);

  useEffect(() => {
    return () => clear();
  }, [router.pathname, clear]);

  return sections.length ? (
    <div className="w-[200px] h-[350px] ml-auto mt-4 relative">
      <div className="h-full bg-gray-300 rounded-lg w-[5px]" />

      <div
        className="absolute left-0 top-0 transition-all w-full ease-out duration-500"
        style={{
          height: scrolledHeight + "%",
        }}
      >
        <div className="h-full bg-blue-600 rounded-lg w-[5px]" />

        <AnimatedTitle
          className="absolute bottom-0 left-5 text-ellipsis overflow-hidden"
          title={activeSection?.title || null}
        />
      </div>
    </div>
  ) : null;
};

export default ArticleSpy;
