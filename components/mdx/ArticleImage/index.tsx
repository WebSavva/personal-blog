import { FunctionComponent } from "react";

import { useState, useRef } from "react";
import Image from "next/image";

import useIntersetionObserver from "@hooks/useIntersetionObserver";
import styles from "./index.module.css";

const ArticleImage: FunctionComponent<Record<"src" | "alt", string>> = ({
  src,
  alt,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isRevealed = useIntersetionObserver({
    rootRef: rootRef,
    threshold: 0.5,
  });

  return (
    <div ref={rootRef} className={styles["unset-img"]}>
      <Image
        onLoadingComplete={() => setIsLoaded(true)}
        src={src}
        alt={alt}
        layout="fill"
        className={`${styles["custom-img"]} transition duration-300 ${
          isLoaded && isRevealed ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ArticleImage;
