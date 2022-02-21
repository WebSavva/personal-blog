import { FunctionComponent, useEffect } from "react";
import {
  IMediaQueryContext,
  MediaQueryState,
  MediaQueryListenerMap,
  MediaQueryMap,
} from "types/MediaQueryContext";

import { createContext, useState, useCallback } from "react";

export const MediaQueryContext = createContext<IMediaQueryContext>({
  mediaQueryState: {},
  addListener: () => {},
  removeListener: () => {},
});

const MediaQueryProvider: FunctionComponent = ({ children }) => {
  const [mediaQueryState, setMediaQueryState] = useState<MediaQueryState>({});
  const [mediaQueryListeners, setMediaQueryListeners] =
    useState<MediaQueryListenerMap>({});

  const addListener = useCallback((query: string, id: symbol) => {
    setMediaQueryListeners((prevMap) => ({
      ...prevMap,
      [query]: prevMap[query] ? [...prevMap[query], id] : [id],
    }));
  }, [setMediaQueryListeners]);

  const removeListener = useCallback((query: string, id: symbol) => {
    setMediaQueryListeners((prevMap) => {
      return {
        ...prevMap,
        [query]: prevMap[query].filter((listenerId) => listenerId !== id),
      };
    });
  }, [setMediaQueryListeners]);

  useEffect(() => {
    const mediaQueryMap: MediaQueryMap = new Map();

    Object.entries(mediaQueryListeners).forEach(([query, listenerIds]) => {
      if (!listenerIds.length) return;

      const mediaQuery = window.matchMedia(query);
      const mediaHandler = (e: MediaQueryListEvent | { matches:boolean }) => {
        setMediaQueryState((prevState) => ({
          ...prevState,
          [query]: e.matches,
        }));
      };
      mediaQuery.addEventListener("change", mediaHandler);

      mediaHandler(mediaQuery);
      
      mediaQueryMap.set(mediaQuery, mediaHandler);
    });

    return () => {
        for (let [mediaQuery, mediaHandler] of mediaQueryMap) {
            mediaQuery.removeEventListener('change', mediaHandler);
        }
    };

  }, [mediaQueryListeners]);

  return (
    <MediaQueryContext.Provider
      value={{
        mediaQueryState,
        addListener,
        removeListener,
      }}
    >
      {children}
    </MediaQueryContext.Provider>
  );
};

export default MediaQueryProvider;