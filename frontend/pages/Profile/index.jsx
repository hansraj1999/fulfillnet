import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import GetInput from "../../components/TextInput/GetInput";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MainService from "../../services/main-service";
import CrossIcon from "../../public/assets/Cross.svg";
// import { getCompany } from "../../Utilities/company.util";

const Wrapper = styled.div`
  margin-top: 16px;
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
  font-size: 16px;
  font-weight: 600;
  color: #41434c;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Section = styled.div`
  flex-basis: 20%;
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
  padding: 32px 24px;
  background-color: white;
  border-radius: 4px;
  width: 480px;
`;
const ModelHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 16px;
  color: #41434c;
`;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const CrossButton = styled.img`
  cursor: pointer;
`;
const FORM_DATA = [
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
    key: "ifsc",
    label: "IFSC Code",
    name: "ifsc",
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
    key: "bank_name",
    label: "Bank Name",
    name: "bank_name",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Name",
    validation: {
      required: "Bank Name is required.",
    },
  },
  {
    key: "vpa",
    label: "VPA",
    name: "vpa",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter VPA",
    validation: {
      required: "VPA is required.",
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
  const [profileDetails, setProfileDetails] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { application_id, company_id } = useParams();
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

  useEffect(() => {
    if (!profileDetails) {
      getProfileDetails();
    }
  }, [profileDetails]);

  const getProfileDetails = async () => {
    try {
      const result = await MainService.profileDetails();
      const { data: profile_details } = result?.data;
      console.log(result?.data);
      setProfileDetails(profile_details);
    } catch (err) {
      console.log(err);
      setProfileDetails(null);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        beneficiary_name: formData?.beneficiary_name,
        account_number: formData?.account_number,
        account_type: formData?.account_type,
        bank_name: formData?.bank_name,
        ifsc: formData?.ifsc,
        vpa: formData?.vpa,
      };

      await MainService.addBankDetails(payload);

      await getProfileDetails();

      setModalOpen(false);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BreadCrumb
        breadCrumbList={[
          {
            key: "home",
            label: "Home",
            link: `/company/${company_id}/`,
          },
          {
            key: "profile",
            label: "Profile",
            link: "current",
          },
        ]}
      />
      <Wrapper>
        <DetailsWrapper>
          <HeaderWrapper>
            <Header>Profile Details</Header>
          </HeaderWrapper>
          <DetailWrapper>
            <Section>
              <Label>Company Name:</Label>
              <Value>{profileDetails?.name || "-"}</Value>
            </Section>
            <Section>
              <Label>Company ID:</Label>
              <Value>{profileDetails?.company_id || "-"}</Value>
            </Section>
            <Section>
              <Label>Mobile Number:</Label>
              <Value>+91 {profileDetails?.mobile_number || "-"}</Value>
            </Section>
          </DetailWrapper>
        </DetailsWrapper>

        <div className="divider"></div>

        <DetailsWrapper>
          <HeaderWrapper>
            <Header>Account Details</Header>
            {!profileDetails?.account_number && (
              <ButtonComponent onClick={() => setModalOpen(true)}>
                Add Account
              </ButtonComponent>
            )}
          </HeaderWrapper>
          <DetailWrapper>
            <Section>
              <Label>Accound Number:</Label>
              <Value>{profileDetails?.account_number || "-"}</Value>
            </Section>
            <Section>
              <Label>Beneficiary Name:</Label>
              <Value>{profileDetails?.beneficiary_name || "-"}</Value>
            </Section>
            <Section>
              <Label>IFSC Code:</Label>
              <Value>{profileDetails?.ifsc || "-"}</Value>
            </Section>
            <Section>
              <Label>Bank Name:</Label>
              <Value>{profileDetails?.bank_name || "-"}</Value>
            </Section>
            <Section>
              <Label>Accoun Type:</Label>
              <Value>{profileDetails?.account_type || "-"}</Value>
            </Section>
            <Section>
              <Label>VPA ID:</Label>
              <Value>{profileDetails?.vpa || "-"}</Value>
            </Section>
          </DetailWrapper>
        </DetailsWrapper>
      </Wrapper>

      {isModalOpen && (
        <ModalComponent>
          <ModalWrapper>
            <HeaderWrapper>
              <ModelHeader>Account Details</ModelHeader>
              <CrossButton
                src={CrossIcon}
                onClick={() => {
                  reset();
                  setModalOpen(false);
                }}
              />
              {/* <Button
                mode={"text"}
                onClick={() => {
                  reset();
                  setModalOpen(false);
                }}
              >
                X
              </Button> */}
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
              <div style={{ marginTop: "12px" }}>
                <Button type="submit" width={"100%"}>
                  Submit
                </Button>
              </div>
            </FormComponent>
          </ModalWrapper>
        </ModalComponent>
      )}
    </>
  );
}
