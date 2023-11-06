import {
  CurrentPageText,
  PaginationButton,
  PaginationContainer,
} from "@/styles/contact-list";
import { ButtonHTMLAttributes } from "react";

/** @jsxImportSource @emotion/react */
interface IPaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (num: number) => void;
}
export interface IPaginationStyledProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCurrent?: boolean;
}

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: IPaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const range = (start: number, end: number) => {
    return Array(end - start + 1)
      .fill(null)
      .map((_, idx) => start + idx);
  };

  return (
    <PaginationContainer>
      <CurrentPageText>{totalCount} Items |</CurrentPageText>
      <PaginationButton
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      >
        «
      </PaginationButton>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        ‹
      </PaginationButton>
      {range(1, totalPages).map((number) => (
        <PaginationButton
          isCurrent={currentPage == number - 1}
          key={number}
          onClick={() => onPageChange(number - 1)}
          disabled={currentPage === number - 1}
        >
          {number}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        ›
      </PaginationButton>

      <PaginationButton
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage >= totalPages - 1}
      >
        »
      </PaginationButton>

      <CurrentPageText>
        | Page {currentPage + 1} of {totalPages}
      </CurrentPageText>
    </PaginationContainer>
  );
};

export default Pagination;
