import { IArticle, IArticleMetadata } from "types/Blog";
import { ParsedUrlQuery } from "querystring";

import { useMemo } from "react";
import { GetStaticProps, NextPage, GetStaticPaths, } from "next";
import { getArticlesList } from "@/utils/articles/utils";
import compileArticle from "@/utils/articles/compileArticle";
import { getMDXComponent } from "mdx-bundler/client";
import { useContext, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRouter } from "next/router";

import ArticleImage from "@/components/mdx/ArticleImage";
import SectionHeader from '@/components/mdx/SectionHeader';

const ArticlePage: NextPage<IArticle> = ({ body }) => {
  const Component = useMemo(() => getMDXComponent(body), [body]);

  return (
    <div className="flex justify-center px-10 md:px-0 py-20">
      <article className="md:w-[700px] prose lg:prose-lg">
        <Component
          components={{
            SectionHeader: (props) => <SectionHeader {...props}/>,
            ArticleImage: (props) => <ArticleImage {...props}/>,
            Code: (props) => <SyntaxHighlighter {...props} language='javascript' style={nightOwl} showLineNumbers/>,
          }}
        />
      </article>
    </div>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getArticlesList().map((slug) => ({
      params: { slug },
    })),

    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IArticle, IParams> = async ({
  params,
}) => {
  const slug = params!.slug;

  const { code: body, frontMatter } = await compileArticle(slug);

  return {
    props: {
      ...frontMatter,
      slug,
      body,
    },
  };
};

export default ArticlePage;
