import React from "react";
import styled, { css } from "styled-components";

const BaseButton = styled.button`
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  border-radius: 50px;
  font-size: ${({ size }) =>
    size === "default" ? "16px" : size === "small" ? "14px" : "16px"};
  letter-spacing: ${({ size }) =>
    size === "default" ? "0.005em" : size === "small" ? "1.5%" : "1%"};
  color: white;
  overflow: hidden;
  position: relative;
  display: ${(props) => (props.truncateText ? "unset" : "flex")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${(props) => props.width};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  white-space: ${({ truncateText }) => truncateText && "nowrap"};
  text-overflow: ${({ truncateText }) => truncateText && "ellipsis"};
  padding: ${({ size }) =>
    size === "default" ? "20px 16px" : size === "small" ? "0 16px" : "0 40px"};
  height: ${({ size }) =>
    size === "default" ? "48px" : size === "small" ? "40px" : "56px"};
  @media (max-width: 767px) {
    font-size: 12px;
    // in mobile button size will always be small
    font-size: 14px;
    height: ${({ size }) =>
      size === "default" ? "40px" : size === "small" ? "45px" : "50px"};
    padding: 0 16px;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding} !important;
    `};

  ${({ height }) =>
    height &&
    css`
      height: ${height} !important;
    `};
`;

const OutlineButton = styled(BaseButton)`
  color: #25408f;
  background: white;
  border: 1px solid #e0e0e0;
`;

const PrimaryButton = styled(BaseButton)`
  background: #25408f;
`;

const TextButton = styled(BaseButton)`
  color: #17317d;
  background: transparent;
  padding: 0;
  height: auto;
  border: none;
`;

const Button = ({
  children,
  mode, // cta, primary, secondary, tertiary, danger
  size = "default", // default, small, large
  onClick,
  ...props
}) => {
  switch (mode) {
    case "cta":
      return (
        <PrimaryButton
          data-testid="cta-btn"
          size={size}
          onClick={onClick}
          {...props}
        >
          {children}
        </PrimaryButton>
      );
    case "primary":
      return (
        <PrimaryButton
          data-testid="primary-btn"
          size={size}
          onClick={onClick}
          {...props}
        >
          {children}
        </PrimaryButton>
      );
    case "outline":
      return (
        <OutlineButton
          data-testid="outline-btn"
          size={size}
          onClick={onClick}
          {...props}
        >
          {children}
        </OutlineButton>
      );
    case "text":
      return (
        <TextButton
          data-testid="text-btn"
          size={size}
          onClick={onClick}
          {...props}
        >
          {children}
        </TextButton>
      );
    default:
      return (
        <PrimaryButton
          data-testid="primary-btn"
          size={size}
          onClick={onClick}
          {...props}
        >
          {children}
        </PrimaryButton>
      );
  }
};

export default Button;
