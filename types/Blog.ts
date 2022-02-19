export interface IArticleMetadata {
    title: string;
    publishedAt: string;
    thumbnail: string;
    published: boolean;
    tags: string[];
    description: string;
}
export interface IArticle extends IArticleMetadata {
    body:string;
    slug:string;
}

export type ExtendedIArticleMetadata = IArticleMetadata & { slug:string };
