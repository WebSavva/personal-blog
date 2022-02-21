import { IArticleSection } from "types/SectionContext";

import { SectionContext } from "context/SectionContext";

import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import useMediaQuery from "@hooks/useMediaQuery";
import AnimatedTitle from "./AnimatedTitle";

const ArticleSpy = () => {
  const { sections, clear } = useContext(SectionContext);
  const [activeSection, setActiveSection] = useState<IArticleSection | null>(
    null
  );
  const [scrolledHeight, setScrolledHeight] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width:1280px)");
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
    });
  }, [activeSection]);

  useEffect(() => {
    return () => clear();
  }, [router.pathname, clear]);

  return sections.length ? (
    <div className="w-full h-[5px] xl:w-[200px] xl:h-[350px] xl:ml-auto xl:mt-4 relative">
      <div className="hidden xl:block h-full bg-gray-300 rounded-lg w-[5px]" />

      <div
        className="xl:absolute h-full xl:h-auto xl:left-0 xl:top-0 transition-all xl:w-full ease-out duration-500"
        style={{
          [isMobile ? "width" : "height"]: scrolledHeight + "%",
        }}
      >
        <div className="h-full bg-blue-600 xl:rounded-lg w-full xl:w-[5px]" />

        {!isMobile && (
          <AnimatedTitle
            className="absolute bottom-0 left-5 text-ellipsis overflow-hidden"
            title={activeSection?.title || null}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default ArticleSpy;
