import { createElement, FunctionComponent } from "react";

const WordSpliter: FunctionComponent<{
  text: string;
  className?: string;
  isSplitted:boolean;
}> = ({ text, className, isSplitted }) => {
  const extendedClassName = `inline-block ` + className;

  return (
    <>
      {isSplitted ? text.split("").map((char, i) => {
        let content: JSX.Element | string | null;
        let wrapper: string;

        switch (true) {
          case /\n/.test(char):
            wrapper = "br";
            content = null;
            break;
          case / /.test(char):
            wrapper = "span";
            content = <>&nbsp;</>;
            break;
          default:
            wrapper = "span";
            content = char;
            break;
        }

        return createElement(wrapper, {
          key: char + i,
          className: extendedClassName,
          ...(content && { children: content }),
        });
      }) : text}
    </>
  );
};

export default WordSpliter;
