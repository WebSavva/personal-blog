import { useRef, useEffect, useState } from "react";
import anime, { AnimeTimelineInstance } from 'animejs';
import { AnimateOnReveal } from "types/AnimationReveal";

import useIntersetionObserver from "./useIntersetionObserver";

interface RevealAnimationConfig {
    threshold?: number;
    animate: AnimateOnReveal;
}

const useAnimationReveal = <T extends HTMLElement>({
    threshold = 1,
    animate
}:RevealAnimationConfig) => {
    const elementRef = useRef<T | null>(null);
    const isRevealed = useIntersetionObserver({
        rootRef: elementRef,
        threshold,
        once: true,
    });
    const [isPlayed, setisPlayed] = useState(false);

    useEffect(() => {
        const element = elementRef.current
        
        if (!element || !isRevealed || isPlayed) return;

        animate(anime, element).finished.then(() => setisPlayed(true));

    }, [isRevealed, animate, setisPlayed, isPlayed]);

    return {
        elementRef,
        isPlayed
    };
};

export default useAnimationReveal;