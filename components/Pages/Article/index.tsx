import {FC} from 'react';

const Article:FC = ({children}) => {
    return <article className='article'>
        { children }
    </article>
};

export default Article;