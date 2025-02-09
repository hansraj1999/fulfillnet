import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ListComponent = styled.div`
  border-radius: 4px;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 18px;

  border: ${({ active }) =>
    active ? "1px solid rgb(126 223 144)" : "1px solid rgb(224, 224, 224)"};
  background: ${({ active }) => (active ? "#00fd6921" : "#fff")};

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
  background-color: white;
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

const BlockText = styled.div`
  font-size: 12px;
  line-height: 17px;
  font-weight: 300;
  color: ${({ color }) => color || "#41434c"};
  margin: 0;

  span {
    color: #9b9b9b;
  }
`;

const Badge = styled.div`
  font-weight: 500;
  font-size: 12px;
  padding: 8px 12px;
  border: 1px solid #00b26b;
  border-radius: 30px;
  cursor: pointer;

  border-color: ${({ type }) => (type === "approved" ? "#00b26b" : "#ff0000")};
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonComponent = styled(Button)`
  font-size: 12px;
  padding: 10px 14px;
`;

export const AppliedBidCard = (props = {}) => {
  const { onClick, data, type = "listing", isWinner, disable_btn } = props;

  return (
    <>
      <ListComponent className="bid-card-component" active={isWinner}>
        <ListWrapper>
          <LeftWrapper>
            {/* <ImageComponent>
              <img src={data.item_image} />
            </ImageComponent> */}
            <BlockComponent>
              <BlockText color="#2e31be">
                <span>Company Name:</span> {data?.company_name}
              </BlockText>
              <BlockText>
                <span>Bid Placed:</span> {isoDateConverter(data?.created_at)}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Bid Price:</span> {data?.amount}
              </BlockText>
              <BlockText>
                <span>Company ID:</span> {data?.company_id}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>PDP Link:</span>{" "}
                <a
                  href={data?.pdp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </BlockText>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            {type === "approval_screen" && (
              <>
                {isWinner ? (
                  <Badge type="approved">Approved</Badge>
                ) : (
                  <ButtonWrapper>
                    <ButtonComponent
                      disabled={disable_btn}
                      size="small"
                      mode="primary"
                      onClick={() => onClick(data)}
                    >
                      {"Approve"}
                    </ButtonComponent>
                  </ButtonWrapper>
                )}
              </>
            )}
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
};
