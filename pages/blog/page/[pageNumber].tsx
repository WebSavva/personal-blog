import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import getArticleModel from "models/Article";

import { IPaginationMetadata } from "types/Pagination";
import { IArticleMetadata } from "types/Blog";
import { ParsedUrlQuery } from "querystring";

import Pagination from '@/components/UI/Pagination';

interface IBlogsPageProps {
  metadata: IPaginationMetadata;
  blogs: IArticleMetadata[];
}

interface IParams extends ParsedUrlQuery {
  pageNumber: string;
}

const BlogsPage: NextPage<IBlogsPageProps> = ({ blogs, metadata }) => {
  
  return (
    <div className="py-10 px-5 flex flex-col">
      <div className="flex flex-col items-center space-y-8 pl-10 mb-10">
        {blogs.map((blog) => (
          <div key={blog.title} className="shadow flex space-x-5 rounded-lg overflow-hidden w-[60%]">
            <div className="w-[250px] flex-shrink-0 h-[250px] relative">
              <Image src={blog.thumbnailUrl} alt={blog.title} layout="fill" objectFit="cover"/>
            </div>

            <div className="p-5"> 
              <h5 className="text-lg font-bold uppercase">{blog.title}</h5>
              
              <p className="text-gray-800 text-md line-clamp-3">
                {blog.description}
              </p>
            </div>  
          </div>
        ))}
      </div>

      <Pagination currentPage={metadata.page} pageCount={metadata.pageCount}/>
    </div>
  );
};

const PAGE_SIZE = 1;
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
      blogs: JSON.parse(JSON.stringify(blogs)),
      metadata: {
        page: pageNumber,
        pageCount,
      },
    },
  };
};

export default BlogsPage;
