import { FC } from 'react';

interface ArticleSpyProps {
    activeId:string | null;
    articleList: Array<{
        id:string;
        title:string;
    }>;
}

const ArticleSpy:FC<ArticleSpyProps> = ({
    activeId,
    articleList,
}) => {
    return <div className='w-[400px] fixed top-[100px] right-0 bg-gray-300 flex flex-col my-5 text-gray-500 text-lg'>
        {articleList.map(({id, title}) => <div key={id} className={`${activeId === id ? 'text-blue font-bold' : ''} transition`}>
            {title}
        </div>)}
    </div>
};

export default ArticleSpy;