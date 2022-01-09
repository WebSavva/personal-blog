import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import getRootDir from "@/utils/getRootDir";

import { IPaginationMetadata } from "types/Pagination";
import { IBlogMetadata } from "types/Blog";
import { ParsedUrlQuery } from "querystring";


interface IBlogsPageProps {
  metadata: IPaginationMetadata;
  blogs: IBlogMetadata[];
}

interface IParams extends ParsedUrlQuery {
  pageNumber: string;
}

const BlogsPage: NextPage<IBlogsPageProps> = () => {
    return <h1>
        Hello World
    </h1>;
};

const PAGE_SIZE = 5;
export const getStaticPaths: GetStaticPaths = async () => {
  const pagesCount =
    Math.ceil(
      readdirSync(resolve(getRootDir(), "articles")).filter((src) =>
        src.endsWith(".mdx")
      ).length / PAGE_SIZE
    );

  const paths = [...Array(pagesCount).keys()].map((i) => ({
    params: {
      pageNumber: (i + 1).toString(),
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
  const articleNames = readdirSync(resolve((getRootDir(), "articles")))
    .filter((src) => src.endsWith(".mdx"))
    .sort();

  const articles = articleNames.map((src) =>
    readFileSync(resolve(getRootDir(),"articles", src), "utf-8")
  );

  console.log(articles[0]);

  return {
    props: {
      blogs: [
        {
          description: "",
          publishedDate: new Date().toISOString(),
          tags: ["seo"],
          thumbnailUrl: "https://www.hello.com",
          title: "Hello world",
        },
      ],
      metadata: {
        page: 1,
        pageCount: 2,
      },
    },
  };
};

export default BlogsPage;
