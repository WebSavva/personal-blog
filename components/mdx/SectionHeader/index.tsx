import { FunctionComponent } from "react";
import { IArticleSection } from "types/SectionContext";

import { useContext, useRef, useEffect } from "react";
import { SectionContext } from "context/SectionContext";

const SectionHeader: FunctionComponent<Omit<IArticleSection, "el">> = ({
  title,
  id,
  children,
}) => {
  const rootRef = useRef<HTMLHeadingElement | null>(null);
  const { add: addSection } = useContext(SectionContext);

  useEffect(() => {
    if (!rootRef.current) return;

    addSection({
      el: rootRef.current,
      title,
      id,
    });
  }, [addSection, title, id]);

  return <h2 ref={rootRef}>{children || title}</h2>;
};

export default SectionHeader;
