import { useContext, useEffect, useMemo } from "react";

import { MediaQueryContext } from "context/MediaQueryListeners";

const useMediaQuery = (query: string): boolean => {
  const id = useMemo(() => Symbol(), []);

  const { addListener, mediaQueryState, removeListener } =
    useContext(MediaQueryContext);

  useEffect(() => {
    addListener(query, id);

    return () => removeListener(query, id);
  }, [query, id, addListener, removeListener]);

  return mediaQueryState[query];
};

export default useMediaQuery;
