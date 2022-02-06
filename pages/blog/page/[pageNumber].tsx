import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import getArticleModel from "models/Article";

import { IPaginationMetadata } from "types/Pagination";
import { SerializedArticleMetadata } from "types/Blog";
import { ParsedUrlQuery } from "querystring";

import Pagination from '@/components/UI/Pagination';
import ArticleItem from '@/components/ArticleItem';

interface IBlogsPageProps {
  metadata: IPaginationMetadata;
  blogs: SerializedArticleMetadata[];
}

interface IParams extends ParsedUrlQuery {
  pageNumber: string;
}

const BlogsPage: NextPage<IBlogsPageProps> = ({ blogs, metadata }) => {
  
  return (
    <div className="py-10 px-5 flex flex-col">
      <div className="flex flex-col items-center space-y-8 pl-10 mb-10">
        {blogs.map((blog, i) => <ArticleItem key={blog.title} {...blog} order={i + 1} />)}
      </div>

      <Pagination page={metadata.page} count={metadata.pageCount}/>
    </div>
  );
};

const PAGE_SIZE = 3;
export const getStaticPaths: GetStaticPaths = async () => {
  const Article = await getArticleModel();

  const articlesNumber = await Article.countDocuments({});
  const pageCount = Math.ceil(articlesNumber / PAGE_SIZE);

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

export const getStaticProps: GetStaticProps<IBlogsPageProps, IParams> = async (
  context
) => {
  const pageNumber = +context.params!.pageNumber;
  const Article = await getArticleModel();

  const pageCount = Math.ceil((await Article.countDocuments({})) / PAGE_SIZE);

  const blogs = await Article.find()
    .sort({
      date: 1,
    })
    .skip((pageNumber - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE).select({
      body: 0,
    });

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)) as SerializedArticleMetadata[],
      metadata: {
        page: pageNumber,
        pageCount,
      },
    },
  };
};

export default BlogsPage;
