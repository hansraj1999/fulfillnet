import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowRight from "../../public/assets/right_arrow.svg";

const BreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  position: relative;
  margin: 16px 0;
  img {
    width: 20px;
    height: 20px;
  }
`;

const BreadCrumbDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BreadCrumbText = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;

  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;

  a {
    color: var(--grey-80);
    text-decoration: none;
  }

  .breadcrumb-link {
    color: #1b12d3;
  }
  .active-breadcrumb-link {
    text-decoration: none;
    color: #1296d3;
  }
`;

export default function BreadCrumb({ breadCrumbList }) {
  // const { entity_type } = useSelector((state) => state.authenticationDetails?.user || "");
  // const orgId = useSelector((state) => state.organizationDetails.organization?._id);

  return (
    <>
      <BreadCrumbWrapper data-testid="breadcrumb-component">
        {breadCrumbList?.length > 0 &&
          breadCrumbList?.map((item, idx) => (
            <BreadCrumbDiv key={`breadcrumb-${item.key}`}>
              <img src={ArrowRight} />
              <BreadCrumbText
                className={item.link ? "cP" : ""}
                key={`breadcrumb-${item.key}`}
                title={item.label}
                data-testid={`breadcrumb-${item.key}`}
              >
                <Link
                  className={
                    item.link === "current"
                      ? "active-breadcrumb-link"
                      : "breadcrumb-link"
                  }
                  to={
                    item.link === "current"
                      ? window.location.pathname
                      : item.link || ""
                  }
                >
                  {item.label}
                </Link>
              </BreadCrumbText>
            </BreadCrumbDiv>
          ))}
      </BreadCrumbWrapper>
    </>
  );
}
