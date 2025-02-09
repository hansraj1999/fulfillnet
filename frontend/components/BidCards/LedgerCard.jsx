import { isoDateConverter } from "../../Utilities/date.util";
import React from "react";
import styled from "styled-components";
import Button from "../Button";

const ListComponent = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(224, 224, 224);
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

const ButtonComponent = styled(Button)`
  font-size: 12px;
  padding: 10px 14px;
`;

const data = {
  image:
    "https://cdn.pixelbin.io/v2/jiomart-fynd/jio-np/wrkr/jmrtz0/company/4/applications/6662dc89737d4feb4a159821/application/pictures/free-logo/original/oihGd7-9G-JioMart-Bazaar-MP.png",
  shipment_id: "17374414491481935071",
  shipment_created_at: "2025-01-21T12:07:29+00:00",
  payment_mode: "cod",
  price: 2000,
  status: "confirmed",
};

export default function LedgerCard(props = {}) {
  const { onClick, data, activeTab, company_id } = props;

  let button_text =
    activeTab === "paid" && Number(company_id) === data?.winner_company_id
      ? "Got Paid"
      : "Paid";

  return (
    <>
      <ListComponent className="list-component">
        <ListWrapper>
          <LeftWrapper>
            <BlockComponent>
              <BlockText color="#2e31be">
                <span>Order ID:</span> {data?.new_fynd_order_id}
              </BlockText>
              <BlockText>
                <span>Created At:</span> {isoDateConverter(data?.created_at)}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Amount:</span> {data?.amount}
              </BlockText>
              <BlockText>
                <span>Item ID:</span> {data?.item_id}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Company Name:</span> {data?.ordering_company_name}
              </BlockText>
              <BlockText>
                <span>Company ID:</span> {data?.ordering_company_id}
              </BlockText>
            </BlockComponent>
            <BlockComponent>
              <BlockText>
                <span>Status:</span> {data?.status}
              </BlockText>
            </BlockComponent>
          </LeftWrapper>
          <RightWrapper>
            {activeTab === "to_pay" ? (
              <>
                <BlockComponent>
                  <ButtonComponent
                    size="small"
                    mode="primary"
                    onClick={() => onClick(data)}
                  >
                    {"Settle"}
                  </ButtonComponent>
                </BlockComponent>
              </>
            ) : activeTab === "to_be_get_paid" ? (
              <></>
            ) : (
              <>
                <BlockComponent>
                  <ButtonComponent
                    size="small"
                    mode="primary"
                    // onClick={() => onClick(data)}
                  >
                    {button_text}
                  </ButtonComponent>
                </BlockComponent>
              </>
            )}
          </RightWrapper>
        </ListWrapper>
      </ListComponent>
    </>
  );
}
