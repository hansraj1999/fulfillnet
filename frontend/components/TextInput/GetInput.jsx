import styled from "styled-components";
import TextInput from ".";
import Dropdown from "../Select";

const Wrapper = styled.div``;

const InputLabel = styled.p`
  font-style: normal;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.48px;
  color: black;

  margin: 0;
`;

const ErrorWrapper = styled.div``;

const ErrorText = styled.p`
  color: red;
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.08px;
  padding: 0px;
  margin: 0px;
`;
const InfoText = styled.p`
  color: black;
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.07px;
  padding-top: 5px;
  margin: 0;
`;

const GetInput = (props) => {
  const {
    label = "Label",
    type,
    name,
    placeholder,
    value,
    options,
    error,
    register,
    isError = false,
    leftChild = null,
    rightChild = null,
    validation = null,
    onKeyDown = null,
    maxLength = null,
    info = null,
    setValue,
  } = props;
  return (
    <Wrapper>
      <InputLabel>{label}</InputLabel>
      {type === "select" ? (
        <Dropdown
          value={value}
          register={register}
          items={options}
          selectedValue={value}
          selectKey={name}
          setValue={setValue}
          {...props}
        />
      ) : (
        <TextInput
          label={name}
          type={type}
          placeholder={placeholder}
          value={value}
          isError={isError}
          register={register}
          validation={validation}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          leftChild={leftChild}
          rightChild={rightChild}
        />
      )}

      {type !== "file" && info && <InfoText role="info">{info}</InfoText>}
      <ErrorWrapper>
        {type !== "file" && error && (
          <ErrorText role="error">{error.message}</ErrorText>
        )}
      </ErrorWrapper>
    </Wrapper>
  );
};
export default GetInput;
