import { FunctionComponent } from "react";

import { useEffect, useState,  } from "react";
import anime from "animejs";

const AnimatedTitle: FunctionComponent<
  Record<string, any> & { title: string | null }
> = ({ title, ...props }) => {
  const [displayedTitle, setDisplayedTitle] = useState<string | null>(null);

  useEffect(() => {
    anime
      .timeline({
        easing: "linear",
        duration: title ? 2e2 : 1e2,
      })
      .add({
        targets: "#active-title",
        opacity: 0,
        translateX: [0, 10],
        complete: () => setDisplayedTitle(title),
    })
    .add({
        targets: "#active-title",
        opacity: 1,
        translateX: [-10, 0],
      });
  }, [title]);
  
  return (
    <div id='active-title' {...props}>
      {displayedTitle}
    </div>
  );
};

export default AnimatedTitle;
