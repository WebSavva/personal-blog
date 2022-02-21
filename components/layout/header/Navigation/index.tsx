import { FunctionComponent } from "react";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import anime, { AnimeParams } from "animejs";

import useMediaQuery from "@hooks/useMediaQuery";
import useDidUpdate from "@hooks/useDidUpdateEffect";
import MeteorIcon from "@/components/icons/Meteor";
import GithubIcon from "@/components/icons/social/Github";
import LinkedInIcon from "@/components/icons/social/LinkedIn";
import FacebookIcon from "@/components/icons/social/Facebook";
import MenuToggler from "./MenuToggler/indext";

const Navigation: FunctionComponent<{
  onSlideIn: (isSlidedIn: boolean) => void;
}> = ({ onSlideIn }) => {
  const prevScrolled = useRef<number>(0);
  const isNavCollapsing = useRef<boolean>(false);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const toggleNav = () =>
    !isNavCollapsing.current && isSmallScreen &&
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const updatedScrolled = window.pageYOffset;

      onSlideIn(prevScrolled.current < updatedScrolled);

      prevScrolled.current = window.pageYOffset;
    }, 0);

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [onSlideIn]);

  useDidUpdate(() => {
    const submenu = submenuRef.current;

    if (!submenu) return;

    let frames: Array<AnimeParams> = [
      {
        targets: submenu,
        height: [0, isSmallScreen ? submenu?.scrollHeight : 90],
        duration: 5e2,
      },
      {
        targets: "#nav-submenu .nav-link",
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 3e2,
      },
      {
        targets: "#nav-submenu .media a",
        opacity: [0, 1],
        translateY: [5, 0],
        duration: 3e2,
      },
    ];

    isNavCollapsing.current = true;
    if (!isCollapsed) {
      frames = [
        ...frames.map((config) =>
          Object.entries(config).reduce((ac, [prop, value]) => {
            return {
              ...ac,
              [prop]: Array.isArray(value) ? [...value].reverse() : value,
            };
          }, {})
        ),
      ].reverse();
    }

    frames
      .reduce(
        (animation, frame) => animation.add(frame),
        anime.timeline({
          easing: "easeOutQuad",
        })
      )
      .finished.then(() => {
        isNavCollapsing.current = false;
      });
  }, [isCollapsed]);

  return (
    <nav className="bg-white transition shadow-md">
      <div
        className={`grid grid-cols-[min-content_1fr] mx-auto md:flex-nowrap items-center px-10 py-3 w-full lg:w-[1000px] min-h-[90px]`}
      >
        <MeteorIcon className="w-14 h-14 flex-shrink-0" />

        {isSmallScreen && (
          <MenuToggler
            className="justify-self-end"
            isActive={isCollapsed}
            onClick={toggleNav}
          />
        )}

        <div
          ref={submenuRef}
          className={`flex items-start md:items-center flex-col md:flex-row flex-grow overflow-hidden h-0 md:h-auto`}
          id="nav-submenu"
        >
          <ul className="pt-10 md:pt-0 flex flex-col space-y-5 mb-5 md:mb-0 md:space-y-0 md:space-x-5  md:flex-row  md:ml-10 text-xl md:text-lg text-gray-600">
            <li>
              <Link href="/">
                <a onClick={toggleNav} className="nav-link block">
                  Intro
                </a>
              </Link>
            </li>

            <li>
              <Link
                href={{
                  pathname: "/blog/page/[pageNumber]",
                  query: {
                    pageNumber: 1,
                  },
                }}
              >
                <a onClick={toggleNav} className="nav-link block">
                  Blog
                </a>
              </Link>
            </li>
          </ul>

          <div className="flex md:ml-auto items-center space-x-4 text-gray-800 media">
            <a href="#">
              <LinkedInIcon className="w-6 h-6" />
            </a>

            <a href="#">
              <GithubIcon className="w-6 h-6" />
            </a>

            <a href="#">
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
