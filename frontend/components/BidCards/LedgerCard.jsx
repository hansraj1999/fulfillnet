import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

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

const ButtonComponent = styled(Button)`
  font-size: 12px;
  padding: 10px 14px;
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

export default function LedgerCard(props = {}) {
  const { onClick, orderData: order_data } = props;
  return (
    <>
      <ListComponent className="list-component">
        <ListWrapper>
          <LeftWrapper>
            <ImageComponent>
              <img src={order_data.image} />
            </ImageComponent>
            <BlockComponent>
              <p>
                <span>Winner Company:</span> {order_data?.winner_company?.name}
              </p>
              <p>
                <span>Created At:</span>{" "}
                {isoDateConverter(order_data?.created_at)}
              </p>
            </BlockComponent>
            <BlockComponent>
              <p>
                <span>Price:</span> {order_data?.amount}
              </p>
              <p>
                <span>Bid Offered:</span> {order_data?.amount}
              </p>
            </BlockComponent>
            <BlockComponent>
              <p>
                <span>Status:</span> {order_data?.status}
              </p>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            <BlockComponent>
              <ButtonComponent
                mode="text"
                size="small"
                mode="primary"
                onClick={() => onClick(order_data)}
              >
                {"Settle"}
              </ButtonComponent>
            </BlockComponent>
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
}
