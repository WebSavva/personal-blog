import { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import Article from "@/components/Pages/Article";
import ArticleSection from "@/components/mdx/ArticleSection";
import ArticleSpy from "@/components/mdx/ArticleSpy";

interface IArticleProps {
  title: string;
  articleSections: {
    id: string;
    title: string;
    content: MDXRemoteSerializeResult;
  }[];
}

const ArticlePage: NextPage<IArticleProps> = ({ articleSections, title }) => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const articleList = articleSections.map(({ title, id }) => ({ title, id }));

  const onIntersectionHandler = (id: string) => {
    setActiveArticleId(id);
  };

  console.log(activeArticleId);
  
  return (
    <div className="flex mx-10">
      <Article>
        <h1>{title}</h1>

        {articleSections.map(({ content, title, id }, i) => (
          <ArticleSection
            id={id}
            key={i + title}
            onIntersection={onIntersectionHandler}
          >
            <h2>{title}</h2>

            <MDXRemote key={i} {...content} components={{ ArticleSection }} />
          </ArticleSection>
        ))}
      </Article>

      <ArticleSpy activeId={activeArticleId} articleList={articleList}/>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IArticleProps> = async () => {
  const articleSections: {
    title: string;
    id: string;
    content: MDXRemoteSerializeResult | string;
  }[] = [
    {
      id: "1",
      title: "First part",
      content:
        "Fugiat, natus perspiciatis. Minus voluptas beatae id quos ipsa ullam, asperiores sapiente excepturi cum aut laudantium unde ad! Veniam quas laborum suscipit.\n>No, I'm not so weaka as you can imagine. In fact, I'm a fighter.Consequuntur sit qui aspernatur. Officiis error nemo molestias exercitationem aperiam autem ea aliquid reprehenderit commodi repellat laborum deleniti quidem voluptatem hic deserunt maiores quod non voluptas, accusamus nam repellendus pariatur?Inventore eum debitis harum optio. Dignissimos natus minus eum nostrum distinctio totam dolore architecto fugit, aspernatur assumenda fuga tenetur cupiditate numquam odit illo qui, ad porro. Quo eum officiis accusamus?",
    },
    {
      id: "2",
      title: "Second part",
      content:
        "Fugiat, natus perspiciatis. Minus voluptas beatae id quos ipsa ullam, asperiores sapiente excepturi cum aut laudantium unde ad! Veniam quas laborum suscipit.\n>No, I'm not so weaka as you can imagine. In fact, I'm a fighter.Consequuntur sit qui aspernatur. Officiis error nemo molestias exercitationem aperiam autem ea aliquid reprehenderit commodi repellat laborum deleniti quidem voluptatem hic deserunt maiores quod non voluptas, accusamus nam repellendus pariatur?Inventore eum debitis harum optio. Dignissimos natus minus eum nostrum distinctio totam dolore architecto fugit, aspernatur assumenda fuga tenetur cupiditate numquam odit illo qui, ad porro. Quo eum officiis accusamus?",
    },
    {
      id: "3",
      title: "Third part",
      content:
        "Fugiat, natus perspiciatis. Minus voluptas beatae id quos ipsa ullam, asperiores sapiente excepturi cum aut laudantium unde ad! Veniam quas laborum suscipit.\n>No, I'm not so weaka as you can imagine. In fact, I'm a fighter.Consequuntur sit qui aspernatur. Officiis error nemo molestias exercitationem aperiam autem ea aliquid reprehenderit commodi repellat laborum deleniti quidem voluptatem hic deserunt maiores quod non voluptas, accusamus nam repellendus pariatur?Inventore eum debitis harum optio. Dignissimos natus minus eum nostrum distinctio totam dolore architecto fugit, aspernatur assumenda fuga tenetur cupiditate numquam odit illo qui, ad porro. Quo eum officiis accusamus?",
    },
  ];

  for (let i of [...Array(articleSections.length).keys()]) {
    articleSections[i].content = await serialize(
      articleSections[i].content as string
    );
  }
  return {
    props: {
      articleSections,
      title: "My first article",
    },
  };
};

export default ArticlePage;
