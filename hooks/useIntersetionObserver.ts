import { RefObject, useState, useEffect } from "react";

interface useIOConfig {
  rootRef: RefObject<null | Element>;
  threshold?: number;
  once?: boolean;
}

const useIntersetionObserver = ({
  rootRef,
  threshold = 1,
  once = true,
}: useIOConfig): boolean => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    const rootEl = rootRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsRevealed(entry.isIntersecting);

          if (once && rootEl && entry.isIntersecting) observer.unobserve(rootEl);
        });
      },
      {
        threshold,
      }
    );

    if (rootEl) observer.observe(rootEl);

    return () => {
      if (rootEl) observer.unobserve(rootEl);
    };
  }, []);

  return isRevealed;
};

export default useIntersetionObserver;
