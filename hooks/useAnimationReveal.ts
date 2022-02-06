import { useRef, useEffect } from "react";
import anime from 'animejs';
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
    });

    useEffect(() => {
        const element = elementRef.current
        
        if (!element || !isRevealed) return;

        animate(anime, element);

    }, [isRevealed, animate]);

    return elementRef;
};

export default useAnimationReveal;