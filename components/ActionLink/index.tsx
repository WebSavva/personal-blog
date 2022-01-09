import { FC, useRef, useEffect } from "react";
import Link from "next/link";
import anime, { AnimeInstance } from "animejs";
import { Url } from "url";
import { FaChevronRight as ArrowIcon } from "react-icons/fa";

import splitIntoLetters from "@/utils/splitIntoLetters";
import useIntersectionObserver from "@hooks/useIntersetionObserver";

type ActionLinkProps = Partial<{
  href: Url;
  detailsText: string;
  linkText: string;
  className: string;
}>;

const ActionLink: FC<ActionLinkProps> = ({
  href = "/",
  detailsText = "Find out more",
  linkText = "Checkout out my personal blog",
  className = "",
}) => {
  const linkRef = useRef<null | HTMLDivElement>(null);
  const isRevealed = useIntersectionObserver({
    rootRef: linkRef,
  });

  const descriptionLetters = splitIntoLetters(
    detailsText,
    "invisible action-letter"
  );
  const linkLetters = splitIntoLetters(linkText, "invisible action-letter");

  useEffect(() => {
    const animatedTargets = {
      description: linkRef.current?.querySelectorAll(
        ".action-description .action-letter"
      ),
      link: linkRef.current?.querySelectorAll(".action-link .action-letter"),
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
      begin: (animeState: AnimeInstance) => {
        animeState.animatables.forEach((el) =>
          el.target.classList.remove("invisible")
        );
      },
    };

    if (isRevealed) {
      anime
        .timeline({
          duration: 1e3,
          delay: (el: Element, i: number) => 20 * (i + 1),
        })
        .add({
          targets: animatedTargets.description,
          ...animationConfig,
        })
        .add({
          targets: animatedTargets.link,
          ...animationConfig,
        });
    }
  }, [isRevealed]);

  return (
    <Link href={href}>
      <a>
        <div
          ref={linkRef}
          className={"group flex flex-col space-x-5 items-center " + className}
        >
          <p className="text-gray-800 font-bold text-xl action-description">
            {descriptionLetters}
          </p>

          <div className="action-link flex space-x-2 group items-center text-md">
            <span className="text-gray-700 group-hover:opacity-50 transition-all duration-700">
              {linkLetters}
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
