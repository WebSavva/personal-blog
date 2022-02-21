import { IPaginationMetadata } from "types/Pagination";
import { IArticleMetadata } from "types/Blog";
import { ParsedUrlQuery } from "querystring";

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import compileArticle from "@/utils/articles/compileArticle";
import { getArticlesList } from "@/utils/articles/utils";

import Pagination from "@/components/UI/Pagination";
import ArticleItem from "@/components/ArticleItem";

type ExtendedIArticleMetadata = IArticleMetadata & { slug: string };
interface IArticlesPageProps {
  metadata: IPaginationMetadata;
  articles: ExtendedIArticleMetadata[];
}
interface IParams extends ParsedUrlQuery {
  pageNumber: string;
}

const BlogsPage: NextPage<IArticlesPageProps> = ({ articles, metadata }) => {
  return (
    <div className="py-10 px-5 flex flex-col">
      <div className="flex flex-col items-center space-y-8 mb-10">
        {articles.map((article) => (
          <ArticleItem key={article.title} {...article} />
        ))}
      </div>

      <Pagination page={metadata.page} count={metadata.pageCount} />
    </div>
  );
};

const PAGE_SIZE = 5;

const getArticlesMetaList = (() => {
  let articlesMetaList: Array<ExtendedIArticleMetadata>;

  return async () => {
    if (articlesMetaList) return articlesMetaList;

    articlesMetaList = [];

    const articleSlugs = getArticlesList();

    for (let slug of articleSlugs) {
      const { frontMatter } = await compileArticle(slug);

      articlesMetaList.push({
        ...frontMatter,
        slug,
      });
    }

    articlesMetaList.sort(
      (a, b) =>
        new Date(a.publishedAt).valueOf() - new Date(b.publishedAt).valueOf()
    );

    return articlesMetaList;
  };
})();

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesList = getArticlesList();

  const pageCount = Math.ceil(articlesList.length / PAGE_SIZE);

  const paths = Array.from({ length: pageCount }, (_, i) => ({
    params: {
      pageNumber: String(i + 1),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IArticlesPageProps,
  IParams
> = async (context) => {
  const pageNumber = +context.params!.pageNumber;

  const articlesMetaList = await getArticlesMetaList();

  const pageCount = Math.ceil(articlesMetaList.length / PAGE_SIZE);

  const offset = (pageNumber - 1) * PAGE_SIZE;

  const articles = articlesMetaList.slice(offset, offset + PAGE_SIZE);

  return {
    props: {
      articles,
      metadata: {
        page: pageNumber,
        pageCount,
      },
    },
  };
};

export default BlogsPage;
