import React, { useState, useEffect, useRef, useMemo } from "react";
import styled, { css } from "styled-components";
import DOWN_ARROW_ICON from "../../public/assets/down_arrow.svg";

const ContainedWrapper = styled.div`
  position: relative;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
  margin-top: 4px;
`;

const SelectWrapper = styled.div`
  padding: 10px 16px 10px;
  /* width: 100%; */
  div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  span {
    color: grey;
    font-size: 14px;
  }

  color: grey;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.005em;
  margin: 0;

  /* ${({ width }) => {
    switch (width) {
      case "100vw":
        return css`
          width: 100%;
          div {
            max-width: 100%;
          }
        `;
      case "fullWidth":
        return css`
          width: 80vw;
          div {
            max-width: 80vw;
          }
        `;
      case "lg":
        return css`
          width: 30vw;
          div {
            max-width: 30vw;
          }
        `;
      case "md":
        return css`
          width: 20vw;
          div {
            max-width: 20vw;
          }
        `;
      case "sm":
        return css`
          width: 12vw;
          div {
            max-width: 12vw;
          }
        `;
      default:
        return css`
          width: ${(props) => (props.width ? props.width : "6vw")};
          div {
            max-width: ${(props) => (props.width ? props.width : "6vw")};
          }
        `;
    }
  }} */

  ${({ type }) => {
    switch (type) {
      case "outlined":
        return css`
          border-bottom: 2px solid #41434c;
          padding-left: 0px;
        `;
      case "borderless":
        return css`
          border: none;
          padding: 0px;
        `;
      case "calendar":
        return css`
          width: 102px;
          height: 48px;
          padding: 12px 16px;
          gap: 8px;
          border: 1px solid grey;
          border-radius: 1000px;
        `;
      case "contained":
        return css`
          background-color: white;
          border: 1px solid grey;
          border-radius: 12px;
        `;
      default:
        return css`
          border: 1px solid grey;
          border-radius: 4px;
        `;
    }
  }}
`;

const SelectInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownIcon = styled.img`
  position: absolute;
  right: 0px;

  ${({ type }) => {
    switch (type) {
      case "calendar":
        return css`
          right: 8px;
        `;
      default:
        return css``;
    }
  }}
`;

const SelectTitle = styled.div`
  color: grey;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.005em;
`;

const SelectedOption = styled.div`
  color: #41434c;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.005em;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ type }) => {
    switch (type) {
      case "borderless":
        return css`
          font-style: normal;
          font-weight: 700;
          font-size: 16px
          line-height: 24px;
          letter-spacing: -0.005em;
          color: #41434c;
        `;
      default:
        return css``;
    }
  }}
`;

const SelectBox = styled.div`
  position: absolute;
  color: #41434c;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.005em;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(132, 116, 116, 0.1),
    0 8px 8px 0 rgba(0, 0, 0, 0.05);
  background: white;
  top: 40px;
  z-index: 1;
  max-height: 30vh;
  overflow: scroll;
  width: 100%;

  ${({ customWidth }) =>
    customWidth !== "" &&
    `
        width: ${customWidth} !important;
    `}
`;

const Options = styled.div`
  padding: 12px;
  &:hover {
    background: var(--grey);
  }
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;

  ${({ active }) =>
    active &&
    `
        background: var(--grey);
    `}

  ${({ customWidth }) =>
    customWidth !== "" &&
    `
        width: ${customWidth} !important;
    `}
`;

const Placeholder = styled.div`
  color: #bfbfcf;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.005em;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ type }) => {
    switch (type) {
      case "borderless":
        return css`
          font-style: normal;
          font-weight: 700
          font-size: 16px
          line-height: var(--line-height-24);
          letter-spacing: -0.005em;
          color: #41434c;
        `;
      default:
        return css``;
    }
  }}
`;

const SearchWrapper = styled.div`
  padding: 12px;
  input[type="text"] {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.005em;
    color: #41434c;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  margin: 5px 0 0 10px;
`;

const Input = styled.input`
  width: 80%;
  margin-left: 10px;
`;

const IconImage = styled.img`
  height: 25px;
`;

// 📌 Custom Hook for Dropdown Logic
const useDropdownHandlers = (
  register,
  setValue,
  selectKey,
  setOpenSelectBox
) => {
  const node = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        setOpenSelectBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelection = (key, value) => {
    register(key, { value });
    setValue(key, value);
    setOpenSelectBox(false);
  };

  const handleCloseButton = (event) => {
    event.stopPropagation();
    setOpenSelectBox(false);
    setValue(selectKey, "");
  };

  return { node, handleOptionSelection, handleCloseButton };
};

// 📌 Dropdown List Component
const DropdownList = ({
  options,
  multiple,
  selectedValue,
  selectKey,
  handleOptionSelection,
  customWidth,
}) => (
  <SelectBox customWidth={customWidth}>
    {options.map((option, index) => (
      <Options
        key={option.key + index}
        active={
          multiple
            ? selectedValue?.includes(option.key)
            : option.value === selectedValue
        }
        onClick={() => handleOptionSelection(selectKey, option.value)}
      >
        {option.value}
      </Options>
    ))}
  </SelectBox>
);

// 📌 Selected Display Component
const SelectedDisplay = ({ selectedValue, placeholder, Icon, type }) => (
  <div className="dFA">
    {Icon && (typeof Icon === "string" ? <IconImage src={Icon} /> : <Icon />)}
    <SelectedOption type={type}>
      {selectedValue || <Placeholder>{placeholder}</Placeholder>}
    </SelectedOption>
  </div>
);

// 📌 Main Select Component
const Select = (props) => {
  const {
    field,
    register,
    className,
    items = [],
    selectKey,
    placeholder = "Select...",
    selectedValue = "",
    customWidth = "",
    title = "",
    width = "sm",
    type = "contained",
    margin = "0px",
    multiple = false,
    removable = true,
    dropDownIcon = false,
    setValue,
    Icon,
    reqError,
  } = props;

  const [openSelectBox, setOpenSelectBox] = useState(false);
  const { node, handleOptionSelection, handleCloseButton } =
    useDropdownHandlers(register, setValue, selectKey, setOpenSelectBox);

  const sortedOptions = useMemo(() => {
    return multiple
      ? [...items].sort((a, b) => (selectedValue?.includes(a.key) ? -1 : 1))
      : [...items];
  }, [items, selectedValue]);

  return (
    <ContainedWrapper
      ref={node}
      className={`${className} pR dF fdC`}
      margin={margin}
    >
      <SelectWrapper
        onClick={() => setOpenSelectBox(!openSelectBox)}
        width={width}
        type={type}
      >
        {title && type !== "borderless" && <SelectTitle>{title}</SelectTitle>}
        <SelectInnerWrapper>
          <SelectedDisplay
            selectedValue={selectedValue}
            placeholder={placeholder}
            Icon={Icon}
            type={type}
          />
          {removable && selectedValue && (
            <span onClick={handleCloseButton}>x</span>
          )}
          {dropDownIcon && <DropdownIcon src={DOWN_ARROW_ICON} />}
        </SelectInnerWrapper>
      </SelectWrapper>

      {reqError?.[selectKey] && (
        <ErrorMessage>{reqError[selectKey]}</ErrorMessage>
      )}

      {openSelectBox && (
        <DropdownList
          options={sortedOptions}
          multiple={multiple}
          selectedValue={selectedValue}
          selectKey={selectKey}
          handleOptionSelection={handleOptionSelection}
          customWidth={customWidth}
        />
      )}
    </ContainedWrapper>
  );
};

export default Select;
