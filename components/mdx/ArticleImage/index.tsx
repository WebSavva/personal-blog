import { FunctionComponent } from "react";

import { useState, useRef } from "react";
import Image from "next/image";

import useIntersetionObserver from "@hooks/useIntersetionObserver";

const ArticleImage: FunctionComponent<{
  src: string;
  alt: string;
  caption?: string;
}> = ({ src, alt, caption }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isRevealed = useIntersetionObserver({
    rootRef: rootRef,
    threshold: 0.2,
  });

  return (
    <figure ref={rootRef} className="unset-img">
      <Image
        onLoadingComplete={() => setIsLoaded(true)}
        src={src}
        alt={alt}
        layout="fill"
        className={`custom-img rounded-sm transition duration-1000 ${
          isLoaded && isRevealed
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        }`}
      />

      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  );
};

export default ArticleImage;
