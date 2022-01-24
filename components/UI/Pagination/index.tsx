import { FC } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'

import PaginationonItem from "./PaginationItem";

type PaginationItem = typeof PaginationonItem;

interface IPaginationProps {
  currentPage: number;
  pageCount: number;
  boundaryCount?: number;
  siblingCount?: number;
  splitCount?: number;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
  pageCount,
  boundaryCount = 2,
  siblingCount = 2,
  splitCount = 4,
}) => {
  let paginationItems:JSX.Element[] = [];

  if (pageCount <= siblingCount) {
    paginationItems = Array.from({ length: pageCount }, (_, i) => (
      <PaginationonItem
        active={i + 1 === currentPage}
        page={i + 1}
        key={i + 1}
      />
    ));
  } else {
    const isNextDisabled = currentPage === pageCount;
    const isPrevDisabled = currentPage === 1;

    const isLeftPartExtended = currentPage < splitCount;
    const isRightPartExtended = currentPage > pageCount - splitCount;

    const leftPart = Array.from(
      { length: isLeftPartExtended ? splitCount : boundaryCount },
      (_, i) => {
        const pageNumber = i + 1;
        const isActive = pageNumber === currentPage;
        return (
          <PaginationonItem
            key={pageNumber}
            page={pageNumber}
            active={isActive}
          />
        );
      }
    );

    const middlePart =
      !isLeftPartExtended && !isRightPartExtended
        ? [
            <PaginationonItem key="left-dots" dots />,
            ...Array.from({ length: boundaryCount + 1 }, (_, i) => {
              const pageNumber = currentPage + i - 1;

              return <PaginationonItem page={pageNumber} active={i === 1} />;
            }),
            <PaginationonItem key="right-dots" dots />,
          ]
        : [<PaginationonItem key="dots" dots />];

    const rightPart = Array.from(
      { length: isRightPartExtended ? splitCount + 1 : boundaryCount },
      (_, i) => {
        const pageNumber = pageCount - i;
        const isActive = pageNumber === currentPage;

        return (
          <PaginationonItem
            key={pageNumber}
            page={pageNumber}
            active={isActive}
          />
        );
      }
    ).reverse();

    paginationItems = [...leftPart, ...middlePart, ...rightPart];
  }

  paginationItems = [
    <PaginationonItem key='prev-page' page={currentPage - 1} disabled={currentPage - 1 === 0}>
      <FaChevronLeft className="w-3 h-3" />
    </PaginationonItem>,

    ...paginationItems,

    <PaginationonItem key='prev-page' page={currentPage + 1} disabled={currentPage + 1 >= pageCount}>
      <FaChevronRight className="w-3 h-3" />
    </PaginationonItem>,
  ];
  
  return <div className="flex space-x-1 m-auto">{paginationItems}</div>;
};

export default Pagination;
