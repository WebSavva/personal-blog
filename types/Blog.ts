export type CATEGORY = "javascript" | "react" | "vue" | "html" | "css" | "node";

export interface IArticleMetadata {
  title: string;
  publishedAt: string;
  thumbnail: string;
  published: boolean;
  tags: Array<CATEGORY>;
  description: string;
}
export interface IArticle extends IArticleMetadata {
  body: string;
  slug: string;
}

export type ExtendedIArticleMetadata = IArticleMetadata & { slug: string };
