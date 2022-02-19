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

import useMediaQuery from "@hooks/useMediaQuery";
import ArticleImage from "@/components/mdx/ArticleImage";
import { SectionContext } from "context/SectionContext";
import SectionHeader from '@/components/mdx/SectionHeader';


const ArticlePage: NextPage<IArticle> = ({ body }) => {
  const Component = useMemo(() => getMDXComponent(body), [body]);
  const {
    clear,
  } = useContext(SectionContext);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 1000px)');

  return (
    <div className={`flex justify-center py-20 ${isMobile && 'bg-green-600'}`}>
      <article className="w-[700px] prose lg:prose-lg">
        <Component
          components={{
            ArticleImage,
            Code: (props) => <SyntaxHighlighter {...props} language='javascript' style={nightOwl} showLineNumbers/>,
            SectionHeader,
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
