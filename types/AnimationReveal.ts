import anime from 'animejs';

export type AnimeType = typeof anime;

export interface AnimateOnReveal {
    (anime:AnimeType, el: HTMLElement) : void;
}