import { FC } from "react";

import { TYPES } from "./PaginationItem";
import PaginationItem from "./PaginationItem";


interface IPaginationProps {
  page: number;
  count: number;
  boundaryCount?: number;
  siblingCount?: number;
  showNextButton?: boolean;
  showPrevButton?: boolean;
}

const Pagination: FC<IPaginationProps> = ({
  page,
  count,
  boundaryCount = 1,
  siblingCount = 1,
  showNextButton = true,
  showPrevButton= true,
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showPrevButton ? [TYPES.PREV] : []),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? [TYPES.START_ELLIPSIS]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? [TYPES.END_ELLIPSIS]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(showNextButton ? [TYPES.NEXT] : []),
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const paginationItems = itemList.map((item) => {
    return typeof item === 'number'
      ? <PaginationItem 
          key={item}
          type={TYPES.PAGE}
          page={item}
          selected={item === page}
        />
      : <PaginationItem key={item} type={item} page={buttonPage(item)} selected={false} />
  });

  return <div className="flex space-x-1 m-auto">{paginationItems}</div>;
};

export default Pagination;
