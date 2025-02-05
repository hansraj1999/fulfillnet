import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/Button";
import GetInput from "../../components/TextInput/GetInput";

const Wrapper = styled.div`
  .divider {
    border-bottom: 1px solid #e0e0e0;
    margin: 24px 0;
  }
`;
const DetailsWrapper = styled.div``;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Header = styled.div`
  font-weight: bold;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Section = styled.div`
  flex-basis: 25%;
  max-width: 25%;
  margin-bottom: 0px;
  padding-right: 0px;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const Label = styled.p`
  font-weight: bold;
  margin: 0;
`;
const Value = styled.p`
  margin: 0;
`;

const ButtonComponent = styled(Button)`
  font-size: 12px;
  padding: 10px 12px;
  height: 32px;
`;

const ModalComponent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(16, 17, 18, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalWrapper = styled.div`
  padding: 24px;
  background-color: white;
  border-radius: 24px;
  width: 480px;
`;
const ModelHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 16px;
`;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FORM_DATA = [
  {
    key: "account_number",
    label: "Account Number",
    name: "account_number",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Account Number",
    maxLength: 17,
    validation: {
      required: "Account Number is required.",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Please enter valid account number",
      },
    },
    onPaste: (e) => {
      e.preventDefault();
      return false;
    },
  },
  {
    key: "ifsc_code",
    label: "IFSC Code",
    name: "ifsc_code",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Code",
    validation: {
      required: "IFSC Code is required.",
      // pattern: {
      //     value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      //     message: "Please enter IFSC Code",
      // },
    },
  },
  {
    key: "beneficiary_name",
    label: "Beneficiary Name",
    name: "beneficiary_name",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Name",
    validation: {
      required: "Beneficiary Name is required.",
    },
  },
  {
    key: "upi_id",
    label: "UPI ID",
    name: "upi_id",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Name",
    validation: {
      // required: "Beneficiary Name is required.",
    },
  },
  {
    key: "account_type",
    label: "Account Type",
    name: "account_type",
    default: "",
    type: "select",
    options: [
      {
        key: "CURRENT",
        value: "CURRENT",
      },
      {
        key: "SAVING",
        value: "SAVING",
      },
      {
        key: "NODAL",
        value: "NODAL",
      },
      {
        key: "ESCROW",
        value: "ESCROW",
      },
    ],
    placeholder: "Enter Type",
    validation: {
      required: "Account Type is required.",
    },
    dropDownIcon: true,
    width: "100vw",
    removable: false,
  },
];

const getInitialFormValues = (formData) => {
  const intialValues = {};
  for (const field of formData) {
    intialValues[field?.name] = field.default;
  }

  return intialValues;
};

export default function Profile() {
  const [isModalOpen, setModalOpen] = useState(true);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: getInitialFormValues([FORM_DATA]),
  });
  const allValues = watch();

  const onSubmit = (formData) => {
    console.log("formData >>>", formData);
    // debugger;
    setModalOpen(false);
    reset();
  };

  return (
    <>
      <Wrapper>
        <DetailsWrapper>
          <HeaderWrapper>
            <Header>Profile Details</Header>
          </HeaderWrapper>
          <DetailWrapper>
            <Section>
              <Label>Company ID:</Label>
              <Value>1</Value>
            </Section>
            <Section>
              <Label>Company Name:</Label>
              <Value>TEST123456</Value>
            </Section>
          </DetailWrapper>
        </DetailsWrapper>

        <div className="divider"></div>

        <DetailsWrapper>
          <HeaderWrapper>
            <Header>Account Details</Header>
            <ButtonComponent onClick={() => setModalOpen(true)}>
              Add Account
            </ButtonComponent>
          </HeaderWrapper>
          <DetailWrapper>
            <Section>
              <Label>Accound ID:</Label>
              <Value>82828282828282</Value>
            </Section>
            <Section>
              <Label>IFSC Code:</Label>
              <Value>TEST123456</Value>
            </Section>
            <Section>
              <Label>Accoun Type:</Label>
              <Value>Savings</Value>
            </Section>
            <Section>
              <Label>UPI ID:</Label>
              <Value>Savings</Value>
            </Section>
          </DetailWrapper>
        </DetailsWrapper>
      </Wrapper>

      {isModalOpen && (
        <ModalComponent>
          <ModalWrapper>
            <HeaderWrapper>
              <ModelHeader>Account Details</ModelHeader>
              <Button
                mode={"text"}
                onClick={() => {
                  reset();
                  setModalOpen(false);
                }}
              >
                X
              </Button>
            </HeaderWrapper>

            <FormComponent onSubmit={handleSubmit(onSubmit)} noValidate>
              {FORM_DATA.map((item, index) => {
                return (
                  <GetInput
                    key={index}
                    label={item.label}
                    name={item?.name}
                    type={item?.type}
                    placeholder={item?.placeholder}
                    value={allValues[item?.name]}
                    error={errors[item?.name]}
                    options={item?.options}
                    register={register}
                    validation={item?.validation}
                    onKeyDown={item?.onKeyDown}
                    maxLength={item?.maxLength}
                    width={item?.width}
                    setValue={setValue}
                    info={item?.info}
                    removable={item?.removable}
                  />
                );
              })}

              <Button type="submit">Submit</Button>
            </FormComponent>
          </ModalWrapper>
        </ModalComponent>
      )}
    </>
  );
}
