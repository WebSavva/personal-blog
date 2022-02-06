import { FC } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export enum TYPES {
  NEXT = "next",
  PREV = "previous",
  PAGE = "page",
  START_ELLIPSIS = 'start-ellipsis',
  END_ELLIPSIS = 'end-ellipsis',
}

interface IPaginationItemProps {
  page: number | null;
  selected?: boolean;
  disabled?: boolean;
  type: TYPES;
}

const PaginationItem: FC<IPaginationItemProps> = ({
  page = 1,
  selected = false,
  disabled = false,
  type,
}) => {
  if (type === TYPES.START_ELLIPSIS || type === TYPES.END_ELLIPSIS) {
    return <div className="pagination__item pagination__item--dots">...</div>;
  } else {
    let itemContent: JSX.Element | IPaginationItemProps['page'];

    switch (type) {
      case TYPES.NEXT:
        itemContent = <FaChevronRight />;
        break;
      case TYPES.PREV:
        itemContent = <FaChevronLeft />;
        break;
      case TYPES.PAGE:
      default:
        itemContent = page;
    }

    return (
      <Link
        href={{
          pathname: "/blog/page/[pageNumber]",
          query: { pageNumber: page },
        }}
      >
        <a
          className={`pagination__item pagination__item--page ${selected ? "pagination__item--selected" : ""} ${
            disabled ? "pagination__item--disabled" : ""
          }`}
        >
          {itemContent}
        </a>
      </Link>
    );
  }
};

export default PaginationItem;
