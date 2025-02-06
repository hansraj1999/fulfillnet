import React from "react";
import styled from "styled-components";

// Styled Components
const TrackingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
  font-weight: ${({ isCurrent }) => (isCurrent ? "bold" : "normal")};
  color: ${({ isCurrent }) => (isCurrent ? "#22c55e" : "#6b7280")};
`;

const Line = styled.div`
  height: 4px;
  width: 50px;
  background-color: ${({ isPassed }) => (isPassed ? "#22c55e" : "#e5e7eb")};
  transition: background-color 0.3s ease-in-out;
`;

const TrackingSteps = ({ trackingList }) => {
  return (
    <TrackingContainer>
      {trackingList.map((step, index) => (
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
  const { tracking_list: trackingList } = props;
  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Order Tracking
      </h3>
      <TrackingSteps trackingList={trackingList} />
    </div>
  );
}
