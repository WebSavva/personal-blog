import { LoremIpsum } from "lorem-ipsum";
import getRandomValue from "../utils/getRandomNumber";
import { writeFileSync } from "fs";
import { readdir } from "fs/promises";
import { resolve } from "path";

// UTILITIES
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 40,
    min: 4,
  },
  wordsPerSentence: {
    max: 30,
    min: 10,
  },
});

const getRandomDate = (start: Date, end:Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getList = (length: number) => [...Array(length).keys()];
const getRanomdHeader = () => '#' + lorem.generateWords(getRandomValue(2, 5));

const generateArticleBody = () => getList(getRandomValue(4, 13)).reduce((body) => {
  const section = getRanomdHeader() + '\n' + lorem.generateParagraphs(3) + '\n ';
  return body + section;
} ,'');

// // MAIN
const articleNames = Array.from({ length: 15 }, () => lorem.generateWords(1));

articleNames.forEach((name) => {
const articleContent = `---
title: '${lorem.generateWords(getRandomValue(2, 6))}'
date: '${getRandomDate(new Date(2012, 0, 1), new Date()).toISOString()}'
description: "${lorem.generateSentences(getRandomValue(4, 7))}"
thumbnailUrl: "https://source.unsplash.com/random/500x50${getRandomValue(0,9)}"
tags: ${JSON.stringify(lorem.generateWords(5).split(" "))}
---

${generateArticleBody()}
`;

  writeFileSync(
    resolve(__dirname, name + ".mdx"),
    articleContent
  );
});
// void async function() {
//   const articleNames = (await readdir(__dirname)).filter((src) => src.endsWith('.mdx'));
//   console.log(articleNames);
// }()