import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";

const ListComponent = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 18px;

  margin: 10px 0 10px 0;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
const ImageComponent = styled.div`
  img {
    width: 50px;
    height: 100%;
  }
`;
// const Image = styled.image``;
const BlockComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;

    span {
      font-weight: bold;
    }
  }
`;

const Badge = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding: 8px 12px;
  border: 2px solid #00b26b;
  border-radius: 30px;
  cursor: pointer;

  border-color: ${({ type }) => (type === "approved" ? "#00b26b" : "#ff0000")};
`;

export const AppliedBidCard = (props = {}) => {
  const { onClick, data } = props;
  return (
    <>
      <ListComponent className="bid-card-component">
        <ListWrapper>
          <LeftWrapper>
            <ImageComponent>
              <img src={data.item_image} />
            </ImageComponent>
            <BlockComponent>
              <p>
                <span>Company Name:</span> {data?.company_name}
              </p>
              <p>
                <span>Company ID:</span> {data?.company_id}
              </p>
            </BlockComponent>
            <BlockComponent>
              <p>
                <span>Status:</span> {data?.status}
              </p>
              <p>
                <span>Date:</span> {data?.status}
              </p>
            </BlockComponent>
            <BlockComponent>
              <p>
                <span>Status:</span> {data?.status}
              </p>
              <p>
                <span>Company Name:</span> {isoDateConverter(data?.created_at)}
              </p>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            <Badge type="approved">{data.amount}</Badge>
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
};
