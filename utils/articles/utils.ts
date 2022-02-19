import { resolve } from "path";

import { readFileSync, readdirSync } from "fs";
import ROOT_DIR from "../rootDir";

export const root = resolve(ROOT_DIR, "articles");

export const getArticleSrc = (slug: string) => resolve(root, slug);

export const getArticleDist = (slug: string) =>
  resolve(ROOT_DIR, "public", "articles", slug);

export const readArticle = (slug:string) => readFileSync(resolve(getArticleSrc(slug), 'index.mdx'), 'utf-8');

export const getArticlesList = () => readdirSync(root);
