import { ISectionContext, IArticleSection } from "types/SectionContext";

import { useState, useCallback, createContext, FunctionComponent } from "react";

export const SectionContext = createContext<ISectionContext>({
  sections: [],
  add: () => {},
  clear: () => {},
});

const SectionContextProvider: FunctionComponent = ({ children }) => {
  const [sections, setSections] = useState<Array<IArticleSection>>([]);

  const add = useCallback(
    (section: IArticleSection) =>
      setSections((prevSections) => [...prevSections, section]),
    [setSections]
  );

  const clear = useCallback(() => setSections([]), [setSections]);

  return (
    <SectionContext.Provider
      value={{
        sections,
        add,
        clear,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContextProvider;
