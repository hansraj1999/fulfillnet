import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import leftArrow from "../../public/assets/left_arrow.svg";
import ArrowRight from "../../public/assets/right_arrow.svg";

const PaginationComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
`;
const PaginationWrapper = styled.div``;
const PaginationArrow = styled.img`
  height: 16px;
  cursor: pointer;

  ${({ type }) => {
    switch (type) {
      case "left":
        return css`
          margin-right: 20px;
        `;
      case "right":
        return css`
          transform: rotate(180deg);
          margin-left: 10px;
        `;
    }
  }}
`;
const PaginatedNumber = styled.span`
  border-radius: var(--border-radius-50);
  color: var(--jds-dark-navy-blue-2);
  height: 32px;
  width: 32px;
  margin-right: 10px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: var(--jds-dark-navy-blue-1);
      background: var(--jds-light-navy-blue);
    `}
`;

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export default function Pagination(props = {}) {
  const {
    total = 1000,
    tablePageNumber = 1,
    maxPagination = 3,
    rowsPerPage = 10,
    setTablePageNumber,
  } = props;
  // const { tablePageNumber = 1, maxPagination = 3, rowsPerPage = 10 } = paging;
  const [paginationOption, setPaginationOption] = useState({
    rowsSelect: true,
    resultCounter: true,
    paging: true,
  });

  // const [tablePageNumber, setTablePageNumber] = useState(1);
  // const [maxPagination, setMaxPagination] = useState(5);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  const getPaginationArray = () => {
    let startIndex =
      Math.ceil(total / rowsPerPage) < maxPagination
        ? 1
        : Math.ceil(total / rowsPerPage) - tablePageNumber < maxPagination &&
          tablePageNumber !== maxPagination
        ? Math.ceil(total / rowsPerPage) - maxPagination + 1
        : tablePageNumber - parseInt(maxPagination / 2) > 0
        ? tablePageNumber - parseInt(maxPagination / 2)
        : 1;

    let endIndex =
      tablePageNumber - 1 + maxPagination > Math.ceil(total / rowsPerPage)
        ? Math.ceil(total / rowsPerPage)
        : tablePageNumber +
          parseInt(maxPagination / 2) +
          (maxPagination - (tablePageNumber + parseInt(maxPagination / 2)) > 0
            ? maxPagination - (tablePageNumber + parseInt(maxPagination / 2))
            : 0);

    return range(startIndex, endIndex, 1);
  };

  const handlePaginationClick = (pageNumber) => {
    if (pageNumber !== tablePageNumber) {
      let formData = {
        offset: (pageNumber - 1) * rowsPerPage,
        limit: rowsPerPage,
      };
      setTablePageNumber(pageNumber);
    }
  };

  return (
    <PaginationComponent className="dFA jcsB">
      {paginationOption?.resultCounter && (
        <div>
          Showing {tablePageNumber * rowsPerPage - rowsPerPage + 1} -{" "}
          {total > tablePageNumber * rowsPerPage
            ? tablePageNumber * rowsPerPage
            : total}{" "}
          of {total} results
        </div>
      )}
      {Math.ceil(total / rowsPerPage) > 1 && (
        <PaginationWrapper className="dFA">
          {tablePageNumber > 1 && (
            <PaginationArrow
              type="left"
              src={leftArrow}
              onClick={() => handlePaginationClick(tablePageNumber - 1)}
            />
          )}
          {getPaginationArray().map((item, index) => {
            return (
              <PaginatedNumber
                className="dFA jcC cP"
                key={index}
                active={item === (tablePageNumber || 1)}
                onClick={() => handlePaginationClick(item)}
              >
                {item}
              </PaginatedNumber>
            );
          })}
          {tablePageNumber < Math.ceil(total / rowsPerPage) && (
            <PaginationArrow
              type="right"
              src={leftArrow}
              onClick={() => handlePaginationClick(tablePageNumber + 1)}
            />
          )}
        </PaginationWrapper>
      )}
    </PaginationComponent>
  );
}
