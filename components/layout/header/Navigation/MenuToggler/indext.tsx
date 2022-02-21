import { FunctionComponent } from "react";

import { useState } from "react";

import useDidUpdate from "@hooks/useDidUpdateEffect";
import anime from "animejs";

const POINTS = {
  left: [
    "M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z",
    "M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z",
    "M11 11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H11Z",
  ],
  right: [
    "M2 5.99519C2 5.44556 2.44556 5 2.99519 5H11.0048C11.5544 5 12 5.44556 12 5.99519C12 6.54482 11.5544 6.99039 11.0048 6.99039H2.99519C2.44556 6.99039 2 6.54482 2 5.99519Z",
    "M2 11.9998C2 11.4501 2.44556 11.0046 2.99519 11.0046H21.0048C21.5544 11.0046 22 11.4501 22 11.9998C22 12.5494 21.5544 12.9949 21.0048 12.9949H2.99519C2.44556 12.9949 2 12.5494 2 11.9998Z",
    "M2.99519 17.0096C2.44556 17.0096 2 17.4552 2 18.0048C2 18.5544 2.44556 19 2.99519 19H15.0048C15.5544 19 16 18.5544 16 18.0048C16 17.4552 15.5544 17.0096 15.0048 17.0096H2.99519Z",
  ],
};

const MenuToggler: FunctionComponent<{
  className: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ className, isActive, onClick }) => {
  useDidUpdate(() => {
    const togglerPaths = Array.from(
      document.querySelectorAll("#menu-toggle path")
    );

    const getPoints = (i: number) => {
      return [{ value: POINTS[isActive ? "right" : "left"][i] }];
    };

    togglerPaths.forEach((path, i) => {
      anime({
        targets: path,
        d: getPoints(i),
        easing: "easeOutQuad",
        duration: 1e3,
      });
    });
  }, [isActive]);

  return (
    <button id="menu-toggle" onClick={onClick} className={className}>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="0"
        viewBox="0 0 24 24"
        className="w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {POINTS.left.map((coords, i) => (
          <path key={coords} d={coords} fill="currentColor" order={i} />
        ))}
      </svg>
    </button>
  );
};

export default MenuToggler;
