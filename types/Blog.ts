export interface IArticleMetadata {
    publishedDate: Date;
    title: string;
    tags: string[];
    description: string;
    thumbnailUrl: string;
}

export interface IArticle extends IArticleMetadata {
    body:string;
}