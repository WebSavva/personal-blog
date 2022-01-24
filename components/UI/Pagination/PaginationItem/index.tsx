import { FC } from "react";
import Link from "next/link";

interface IPaginationItemProps {
  page?: number;
  active?: boolean;
  disabled?: boolean;
  dots?: boolean;
}

const PaginationItem: FC<IPaginationItemProps> = ({ page, active, dots, children, disabled }) => {


  if (dots) {
    return <button className='pagination-dots'>...</button>;
  } else {
    return (
      <Link
        href={{
          pathname: "/blog/page/[pageNumber]",
          query: { pageNumber: page },
        }}
      >
        <a className={`pagination-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
          {
            children || page
          }
        </a>
      </Link>
    );
  }
};

export default PaginationItem;
