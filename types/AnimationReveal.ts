import { AnimeParams, AnimeTimelineInstance } from 'animejs';
import anime from 'animejs';

export type AnimeType = typeof anime;

export type Frame = [AnimeParams, (string | number )?];

export interface AnimateOnReveal {
    (anime:AnimeType, el: HTMLElement) : AnimeTimelineInstance;
}