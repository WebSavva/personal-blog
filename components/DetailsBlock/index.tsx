import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import anime from "animejs";

import useIntersetionObserver from "hooks/useIntersetionObserver";
import Mesh from "../UI/Mesh";

import laptopImg from "./laptop.jpg";

const DetailsBlock = () => {
  const meshDimension = {
    columns: 13,
  rows: 17
  };

  const sectionRef = useRef<null | HTMLElement>(null);
  const [isShadowShowed, setIsShadowShowed] = useState<boolean>(false);
  const isRevealed = useIntersetionObserver({
    rootRef: sectionRef,
    threshold: 0.5,
  });

  useEffect(() => {
    const elements = {
      image: sectionRef.current?.querySelector(".details-image"),
      shadow: sectionRef.current?.querySelector(".details-shadow"),
      heading: sectionRef.current?.querySelectorAll(".details-heading"),
      bar: sectionRef.current?.querySelector(".details-bar"),
      text: sectionRef.current?.querySelector(".details-text"),
      dots: sectionRef.current?.querySelectorAll("rect"),
    };

    if (!isRevealed) {
      anime.set(elements.image!, {
        opacity: 0,
      });

      anime.set(elements.shadow!, {
        scaleY: 0,
      });
    } else {
      anime
        .timeline({
          easing: "easeInQuint",
          duration: 1e3,
        }).add({
          targets: elements.dots,
          opacity: [0, 1],
          translateX: [10, 0],
          duration: 5e2,
          delay: anime.stagger(200, {grid: [meshDimension.rows, meshDimension.columns]})
        })
        .add({
          targets: elements.shadow,
          scaleY: [0, 1],
          complete: () => {
            setIsShadowShowed(true);
            anime.set(elements.image!, { opacity: 1 });
          },
        }, 100)
        .add({
          targets: elements.shadow,
          scaleY: [1, 0],
        }, 1100)
        .add({
          targets: elements.bar,
          scaleX: [0, 1],
          opacity: [0.5, 1],
          easing: "easeInOutExpo",
          duration: 900,
        })
        .add(
          {
            targets: elements.heading,
            opacity: [0, 1],
            translateY: [40, 0],
            easing: "easeOutExpo",
            duration: 800,
          },
          "-=600"
        )
        .add(
          {
            targets: elements.text,
            opacity: [0, 1],
            easing: "easeInExpo",
            duration: 1e3,
          },
          "-=500"
        );
    }
  }, [isRevealed]);

  return (
    <section
      className="flex justify-between items-center my-28 px-16"
      ref={sectionRef}
    >
      <div className="w-[500px] relative">
        <Mesh className="w-[450px] absolute right-[-150px] top-[-50px]" rows={meshDimension.rows} columns={meshDimension.columns} />

        <img
          src={laptopImg.src}
          className="w-full block shadow-2xl details-image"
        />

        <div
          className={`absolute left-0 top-0 w-full h-full bg-blue-600 details-shadow ${
            isShadowShowed ? "origin-bottom" : "origin-top"
          }`}
        />
      </div>

      <div className="max-w-[40%]">
        <div className="mb-10">
          <h3 className="text-7xl text-gray-800 font-bold mb-5 details-heading">
            Hands on approach
          </h3>

          <div className="w-full h-[10px] bg-blue-600 origin-right details-bar" />
        </div>

        <p className="text-gray-600 text-lg leading-[1.5] pr-5 details-text">
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
