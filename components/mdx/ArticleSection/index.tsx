import { FC, useRef, useEffect } from 'react';

import useIntersetionObserver from '@hooks/useIntersetionObserver';

interface IArticleSectionProps {
    id:string;
    onIntersection: (id:string) => void;
}

const ArticleSection:FC<IArticleSectionProps> = ({
    children,
    id,
    onIntersection,
}) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const isRevealed = useIntersetionObserver({
        once: false,
        rootRef: sectionRef,
        threshold: 1,
    });

    useEffect(() => {
        if (isRevealed) onIntersection(id);
    }, [isRevealed, onIntersection, id]);

    return <div ref={sectionRef} className='article__section' id={id}>
        {children}
    </div>;
};

export default ArticleSection;