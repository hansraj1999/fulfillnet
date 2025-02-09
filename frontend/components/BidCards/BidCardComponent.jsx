import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ListComponent = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid #e4e5e6;
  border-radius: 4px;
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
  align-items: center;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
const ImageComponent = styled.div`
  img {
    border-radius: 4px;
    height: 35px;
    object-fit: cover;
    width: 35px;
  }
`;
// const Image = styled.image``;
const BlockComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

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

const order_data = {
  image:
    "https://cdn.pixelbin.io/v2/jiomart-fynd/jio-np/wrkr/jmrtz0/company/4/applications/6662dc89737d4feb4a159821/application/pictures/free-logo/original/oihGd7-9G-JioMart-Bazaar-MP.png",
  shipment_id: "17374414491481935071",
  shipment_created_at: "2025-01-21T12:07:29+00:00",
  payment_mode: "cod",
  price: 2000,
  status: "confirmed",
};

export default function BidCardComponent(props = {}) {
  const { onClick, data, type = null } = props;
  return (
    <>
      <ListComponent className="list-component">
        <ListWrapper>
          <LeftWrapper>
            <ImageComponent>
              <img src={data.item_image} />
            </ImageComponent>
            <BlockComponent>
              {type === "broadcasted_card" ? (
                <>
                  <BlockText color="#2e31be">
                    <span>Name: </span>
                    {data?.item_details?.name}
                  </BlockText>
                </>
              ) : (
                <>
                  <BlockText color="#2e31be">
                    <span>Shipment ID: </span>
                    {data?.shipment_id}
                  </BlockText>
                </>
              )}

              <BlockText>
                <span>Bid Placed:</span> {isoDateConverter(data?.created_at)}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Bid Price:</span> {data?.initial_bid_price}
              </BlockText>
              <BlockText>
                <span>Quantity:</span> {data?.quantity}
              </BlockText>
              {/* <p>
                <span>Bid Offer Price:</span> {data?.price}
              </p> */}
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Status:</span> {data?.status}
              </BlockText>
              <BlockText>
                <span>Company Name:</span> {data?.company_name}
              </BlockText>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            <BlockComponent>
              <Button mode="text" size="small" onClick={() => onClick(data)}>
                {"Details"}
              </Button>
            </BlockComponent>
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
}
