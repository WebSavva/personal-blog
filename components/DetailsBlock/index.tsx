import { AnimateOnReveal } from "types/AnimationReveal";

import { useState, useCallback } from "react";
import Image from "next/image";

import Mesh from "../UI/Mesh";
import laptopImg from "./laptop.jpg";
import useAnimationReveal from "@hooks/useAnimationReveal";
import { animateByFrames } from "@/utils/animeUtils";

const DetailsBlock = () => {
  const [isShadowShowed, setIsShadowShowed] = useState<boolean>(false);
  const animateDetails = useCallback<AnimateOnReveal>(
    (_, el) => {
      const image = el.querySelector(".image");

      return animateByFrames(
        [
          [
            {
              targets: "#details-block .shadow",
              scaleY: [0, 1],
              complete: () => {
                setIsShadowShowed(true);
                image?.classList.remove("invisible");
              },
            },
            100,
          ],
          [
            {
              targets: "#details-block .shadow",
              scaleY: [1, 0],
            },
            1100,
          ],
          [
            {
              targets: "#details-block .bar",
              scaleX: [0, 1],
              opacity: [0.5, 1],
              easing: "easeInOutExpo",
              duration: 900,
            },
          ],
          [
            {
              targets: "#details-block .title",
              opacity: [0, 1],
              translateY: [40, 0],
              easing: "easeOutExpo",
              duration: 800,
            },
            "-=600",
          ],
          [
            {
              targets: "#details-block .text",
              opacity: [0, 1],
              easing: "easeInExpo",
              duration: 1e3,
            },
            "-=500",
          ],
        ],
        {
          easing: "easeInQuint",
          duration: 1e3,
        }
      );
    },
    [setIsShadowShowed]
  );
  const { elementRef: sectionRef } = useAnimationReveal({
    animate: animateDetails,
    threshold: 0.35,
  });

  const meshDimension = {
    columns: 13,
    rows: 17,
  };

  return (
    <section
      id="details-block"
      className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row lg:justify-between items-center my-28 px-10 lg:px-16"
      ref={sectionRef}
    >
      <div className="w-full  lg:w-[500px] relative">
        <Mesh
          className="w-[350px] lg:w-[450px] absolute right-0 lg:right-[-150px] top-[-50px]"
          rows={meshDimension.rows}
          columns={meshDimension.columns}
        />

        <div className="unset-img">
          <Image
            src={laptopImg.src}
            alt=""
            layout="fill"
            className="custom-img block shadow-2xl image invisible"
          />
        </div>

        <div
          className="absolute left-0 top-0 w-full h-full invisible bg-blue-600 shadow"
          style={{
            transformOrigin: isShadowShowed ? "bottom" : "top",
          }}
        />
      </div>

      <div className="w-full lg:w-[40%]">
        <div className="mb-10">
          <h3 className="text-5xl md:text-6xl lg:text-7xl text-gray-800 font-bold mb-5 title invisible">
            Hands on approach
          </h3>

          <div className="w-full h-[10px] bg-blue-600 origin-right invisible bar" />
        </div>

        <p className="text-gray-600 text-lg leading-[1.5] pr-5 text invisible">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sit
          quos consequuntur! Vero suscipit corrupti possimus! Minus dolores
          praesentium nostrum dignissimos illum debitis, officia voluptatibus
          odio. Tempora dolorum autem distinctio.
        </p>
      </div>
    </section>
  );
};

export default DetailsBlock;
