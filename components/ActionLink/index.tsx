import { AnimateOnReveal } from "types/AnimationReveal";
import { Url } from "url";

import { FunctionComponent } from "react";
import Link from "next/link";
import { FaChevronRight as ArrowIcon } from "react-icons/fa";

import WordSpliter from "../UI/WordSpliter";
import useAnimationReveal from "@hooks/useAnimationReveal";
import { animateByFrames } from "@/utils/animeUtils";

type ActionLinkProps = Partial<{
  href: Url;
  detailsText: string;
  linkText: string;
  className: string;
}>;

const animateLink: AnimateOnReveal = (anime, el) => {
  const animatedTargets = {
    description: el.querySelectorAll(".action-description .action-letter"),
    link: el.querySelectorAll(".action-link .action-letter"),
  };

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
  };

  return animateByFrames(
    [
      [
        {
          targets: animatedTargets.description,
          ...animationConfig,
        },
      ],
      [
        {
          targets: animatedTargets.link,
          ...animationConfig,
        },
      ],
    ],
    {
      duration: 1e3,
      delay: (el: Element, i: number) => 20 * (i + 1),
    }
  );
};

const ActionLink: FunctionComponent<ActionLinkProps> = ({
  href = "/",
  detailsText = "Find out more",
  linkText = "Checkout out my personal blog",
  className = "",
}) => {
  const { elementRef: rootRef, isPlayed } = useAnimationReveal<HTMLDivElement>({
    animate: animateLink,
  });

  return (
    <Link href={href}>
      <a className={"inline-block " + className}>
        <div
          ref={rootRef}
          className={"group flex flex-col space-x-5 items-center "}
        >
          <p className="text-gray-800 font-bold text-xl action-description">
            <WordSpliter
              text={detailsText}
              className="invisible action-letter"
              isSplitted={!isPlayed}
            />
          </p>

          <div className="action-link flex space-x-2 group items-center text-md">
            <span className="text-gray-700 group-hover:opacity-50 transition-all duration-700">
              <WordSpliter
                text={linkText}
                className="invisible action-letter"
                isSplitted={!isPlayed}
              />
            </span>

            <button className="action-letter invisible">
              <span className="transition duration-700 group-hover:translate-x-2 inline-flex w-4 h-4 mt-1  justify-center items-center rounded-full bg-blue-600 text-white">
                <ArrowIcon className="h-1/2 w-1/2" />
              </span>
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ActionLink;
