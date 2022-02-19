
export interface IArticleSection {
    id:string;
    el: HTMLElement;
    title:string;
}

export interface ISectionContext {
    sections: Array<IArticleSection>;
    add: (section:IArticleSection) => void;
    clear: () => void;
}