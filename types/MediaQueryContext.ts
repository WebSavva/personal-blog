export type MediaQueryMap = Map<MediaQueryList, (e: MediaQueryListEvent) => void>;

export type MediaQueryState = Record<string, boolean>;
export type MediaQueryListenerMap = Record<string, Array<symbol>>;

export interface IMediaQueryContext {
    mediaQueryState: MediaQueryState,
    addListener: (query:string, id:symbol) => void;
    removeListener: (query:string, id: symbol) => void;
}