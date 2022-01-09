import { ReactElement } from "react";

const splitIntoLetters = (text: string, className?: string): ReactElement[] => {
  const extendedClassName = `inline-block ` + className;

  return text.split("").map((char, i) => {
    return char.match(/\s/) ? (
      <span key={char + i} className={extendedClassName}>
        &nbsp;
      </span>
    ) : (
      <span key={char + i} className={extendedClassName}>
        {char}
      </span>
    );
  });
};

export default splitIntoLetters;
