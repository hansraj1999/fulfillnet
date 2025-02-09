import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 24px; */
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #41434c;
  margin: 0;
`;

// Styled Components
const TrackingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 20px;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  align-items: baseline;
`;

const StepDetail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Step = styled.div`
  font-size: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  ${({ isPassed, isCurrent }) =>
    isPassed
      ? `background-color: #22c55e; color: white;`
      : isCurrent
      ? `border: 3px solid #22c55e; color: #22c55e;`
      : `background-color: #e5e7eb; color: #6b7280;`}
`;

const StepText = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 8px;
  font-weight: ${({ isCurrent }) => (isCurrent ? "600" : "normal")};
  color: ${({ isCurrent }) => (isCurrent ? "#22c55e" : "#6b7280")};
`;

const Line = styled.div`
  height: 4px;
  width: 50px;
  background-color: ${({ isPassed }) => (isPassed ? "#22c55e" : "#e5e7eb")};
  transition: background-color 0.3s ease-in-out;
`;

const ButtonComponent = styled(Button)`
  padding: 14px;
  font-size: 12px;
  height: 12px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Section = styled.div`
  flex-basis: 24%;
  margin-bottom: 0px;
  padding-right: 0px;
  padding: 12px 0;
`;
const Label = styled.p`
  margin: 0;
  color: #9b9b9b;
  font-weight: 400;
  line-height: 18px;
`;
const Value = styled.p`
  margin: 0;
  color: #4d4d4e;
  font-weight: 500;
  line-height: 18px;
`;

const TrackingSteps = ({ trackingList }) => {
  return (
    <TrackingContainer>
      {trackingList?.map((step, index) => (
        <StepWrapper key={index}>
          <StepDetail className="flex flex-col items-center">
            <Step isPassed={step.is_passed} isCurrent={step.is_current}>
              {step.is_passed ? "✔️" : index + 1}
            </Step>
            <StepText isCurrent={step.is_current}>{step.text}</StepText>
          </StepDetail>
          {index < trackingList.length - 1 && (
            <Line isPassed={trackingList[index + 1].is_passed} />
          )}
        </StepWrapper>
      ))}
    </TrackingContainer>
  );
};

// Example Usage
export default function OrderTrackingComponent(props = {}) {
  const { onRefreshClick, shipmentData, bidData, winnerProfileData } = props;
  // const [trackingList, setTrackingList] = useState(shipmentData?.tracking_list);
  // debugger

  return (
    <div>
      <HeaderWrapper>
        <Header style={{ textAlign: "center" }}>Order Tracking</Header>
        <ButtonComponent size="sm" onClick={onRefreshClick}>
          Refresh
        </ButtonComponent>
      </HeaderWrapper>
      <DetailWrapper>
        <Section>
          <Label>Order ID:</Label>
          <Value>{shipmentData?.order?.fynd_order_id || "-"}</Value>
        </Section>
        <Section>
          <Label>Shipment ID:</Label>
          <Value>{shipmentData?.shipment_id || "-"}</Value>
        </Section>
        <Section>
          <Label>Company Name:</Label>
          <Value>{winnerProfileData?.name || "-"}</Value>
        </Section>
        <Section>
          <Label>Company Mobile:</Label>
          <Value>{winnerProfileData?.mobile_number || "-"}</Value>
        </Section>
        <Section>
          <Label>Company Email:</Label>
          <Value>{winnerProfileData?.mail_id || "-"}</Value>
        </Section>
      </DetailWrapper>
      <TrackingSteps trackingList={shipmentData?.tracking_list} />
    </div>
  );
}
