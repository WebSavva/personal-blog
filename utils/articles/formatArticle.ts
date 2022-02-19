import camelCase from "lodash/camelCase";

const getImageName = (src: string) => camelCase(src.split(".")[0]);

export default function (rawCode: string): string | never {
  let precompiledCode = rawCode;

  const match = rawCode.match(/---.+---/gims);

  if (!match) throw new Error("Incorrect article format is passed");

  const images: Array<{
    name: string;
    src: string;
  }> = [];

  const front = match[0]
    .replace(/\r/g, "")
    .replace(/\n?---\n?/g, "")
    .split("\n")
    .map((prop) => {
      const { imgSrc } =
        prop.match(/^thumbnail:\s'?(?<imgSrc>.+)'/i)?.groups || {};

      if (!imgSrc) return prop;

      const imgName = getImageName(imgSrc);

      images.push({
        name: imgName,
        src: imgSrc,
      });

      return prop.replace(new RegExp(`'${imgSrc}'`), imgName);
    }).join(',');

  const imgMatches =
    rawCode.match(/(?<alt>!\[.+?\])\((?<imgSrc>.+?)\)/gi) || [];

  imgMatches.forEach((imgLink) => {
    const { imgSrc } = imgLink.match(/\((?<imgSrc>.+?)\)/i)?.groups || {};

    const imgName = getImageName(imgSrc);

    if (!images.find(({ src }) => imgSrc === src))
      images.push({
        name: imgName,
        src: imgSrc,
      });
      
    precompiledCode = precompiledCode.replace(
      new RegExp(imgLink.replace(/\[|\]|\(|\)/g, (m) => '\\' + m)),
      `<ArticleImage src={${imgName}} alt="alt1" />`
    );
  });

  return precompiledCode.replace(
    /---.+?---/ims,
    `${images
      .map(({ src, name }) => `import ${name} from './static/images/${src}';`)
      .join("\n")}
      export const frontMatter = {${front}};`
  );
};
