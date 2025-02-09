import React from "react";
import styled, { css } from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-bottom: ${({ border, disabled, formType }) =>
    disabled && formType === "details"
      ? "none"
      : border
      ? "1px solid grey"
      : "none"};
  border-color: ${({ isError }) => (isError ? "red" : "#41434c")};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: #000000a6;
    `}

  ${({ type }) => {
    switch (type) {
      case "success":
        return css`
          border-color: #00b26b !important;
        `;
      case "error":
        return css`
          border-color: #cd1c40 !important;
        `;
      default:
        return css``;
    }
  }}

    ${({ inputStyle }) => {
    switch (inputStyle) {
      case "empty":
        return css`
          border: none !important;
        `;
      case "contained":
        return css`
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          padding: 3px 14px;
        `;
      default:
        return css``;
    }
  }}
`;

const StyledInput = styled.input`
  border: none;
  width: 100%;
  background: transparent;
  /* padding: ${({ size }) =>
    size === "small" ? "0px 0px 8px" : "0px 0px 8px"}; */
  height: 28px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: ${(props) => (props.disabled ? "#41434C" : "#41434C")};
  padding-right: ${(props) => props.paddingRight};

  ::placeholder {
    color: #8a8aa8;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #8a8aa8;
    `}

  ${({ formType }) =>
    formType === "details" &&
    css`
      color: #141414;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.005em;
    `}

        ${({ inputStyle }) => {
    switch (inputStyle) {
      case "contained":
        return css`
          padding: 0px !important;
        `;
      default:
        return css``;
    }
  }}
`;
export default function TextInput({
  leftChild,
  rightChild,
  children,
  label,
  type,
  size,
  placeholder,
  register,
  validation,
  testId,
  width,
  border = true,
  isError = false,
  disabled = false,
  fieldRegister,
  multiple = false,
  inputStyle = "",
  infoType = "",
  formType = "",
  ...restProps
}) {
  return (
    <InputWrapper
      width={width}
      border={border}
      isError={isError}
      disabled={disabled}
      type={isError ? "error" : infoType}
      formType={formType}
      inputStyle={inputStyle}
    >
      {leftChild}
      <StyledInput
        size={size}
        data-testid={testId ? testId : "inputField"}
        {...(register && register(label, validation))}
        {...(fieldRegister && fieldRegister)}
        {...restProps}
        type={type ? type : "text"}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
        multiple={multiple}
        formType={formType}
        inputStyle={inputStyle}
      />
      {rightChild}
    </InputWrapper>
  );
}
