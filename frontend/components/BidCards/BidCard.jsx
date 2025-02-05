import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ListComponent = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(224, 224, 224);
  border-radius: 1.2rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonComponent = styled(Button)`
  font-size: 12px;
  padding: 10px 14px;
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

const order_data = {
  image:
    "https://cdn.pixelbin.io/v2/jiomart-fynd/jio-np/wrkr/jmrtz0/company/4/applications/6662dc89737d4feb4a159821/application/pictures/free-logo/original/oihGd7-9G-JioMart-Bazaar-MP.png",
  shipment_id: "17374414491481935071",
  shipment_created_at: "2025-01-21T12:07:29+00:00",
  payment_mode: "cod",
  price: 2000,
  status: "confirmed",
};

export const BidCard = (props = {}) => {
  const { onClick, orderData: order_data } = props;
  return (
    <>
      <ListComponent className="bid-card-component">
        <ListWrapper>
          <LeftWrapper>
            <ImageComponent>
              <img src={order_data.image} />
            </ImageComponent>
            <BlockComponent>
              <p>
                <span>Seller Name:</span> {order_data?.shipment_id}
              </p>
              <p>
                <span>Shipment Date:</span>{" "}
                {isoDateConverter(order_data?.shipment_created_at)}
              </p>
            </BlockComponent>
            <BlockComponent>
              <p>
                <span>Order Price:</span> {order_data?.price}
              </p>
              <p>
                <span>Bid Offer:</span> {order_data?.status}
              </p>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            <Badge type="rejected">Rejected</Badge>
            <Badge type="approved">Approved</Badge>
            <ButtonWrapper>
              <ButtonComponent
                mode="text"
                size="small"
                onClick={() => onClick(order_data)}
                mode="outline"
              >
                {"Reject"}
              </ButtonComponent>
              <ButtonComponent
                mode="text"
                size="small"
                mode="primary"
                onClick={() => onClick(order_data)}
              >
                {"Approve"}
              </ButtonComponent>
            </ButtonWrapper>
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
};
