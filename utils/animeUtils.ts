import { Frame, AnimateOnReveal, AnimeType } from "types/AnimationReveal";

import anime, { AnimeParams, AnimeInstance } from "animejs";

export const extendRevealConfig = (config: AnimeParams): AnimeParams => ({
  ...config,
  begin: (animeState: AnimeInstance) => {
    animeState.animatables.forEach((el) =>
      el.target.classList.remove("invisible")
    );
  },
});

export const animateByFrames = (
  frames: Array<Frame>,
  sharedAnimParams: AnimeParams = {}
) => {
  return frames
    .map(([config, offset]) => [extendRevealConfig(config), offset] as Frame)
    .reduce((animation, animeParams) => animation.add(...animeParams), anime.timeline(sharedAnimParams));
};
