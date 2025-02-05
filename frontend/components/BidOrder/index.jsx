import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import GetInput from "../TextInput/GetInput";
import Button from "../Button";
import { setCompany } from "../../Utilities/company.util";
import MainService from "../../services/main-service";

const Header = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const BidOrderComponent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const ErrorMsg = styled.div`
  font-size: 14px;
  color: red;
`;

const FORM_DATA = [
  {
    key: "bid_amount",
    label: "Bid Amount",
    name: "bid_amount",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Bid Amount",
    maxLength: 17,
    validation: {
      required: "Bid amount is required.",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Please enter valid bid amount",
      },
    },
    onPaste: (e) => {
      e.preventDefault();
      return false;
    },
  },
];

const getInitialFormValues = (formData) => {
  const intialValues = {};
  for (const field of formData) {
    intialValues[field?.name] = field.default;
  }

  return intialValues;
};

export default function BidOrder(props = {}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [bidCreated, setBidCreated] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shipmentId = queryParams.get("shipment_id");
  const pageUrl = queryParams.get("pageUrl");
  console.log("pageUrl----", pageUrl);

  useEffect(() => {
    if (pageUrl) {
      const regex = /\/company\/(\d+)\//;
      const match = pageUrl.match(regex);
      const companyId = match[1];

      setCompany(companyId);
    }
  }, pageUrl);
  // debugger;

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

  const onSubmit = async (formData) => {
    try {
      setErrorMessage(null);
      console.log("formData >>>", formData, shipmentId);

      const result = await MainService.registerNewBid({
        shipment_id: shipmentId,
        initial_bid_price: formData?.bid_amount,
      });
      const data = result.data;

      if (data?.success) {
        setBidCreated(true);
      } else {
        setErrorMessage(data?.message);
      }

      // debugger;
      reset({ bid_amount: null });
    } catch (err) {
      console.log(err);
      setErrorMessage("Internal Server Error");
    }
  };

  return (
    <>
      <BidOrderComponent>
        {bidCreated ? (
          <>
            <Header>Created Successfully</Header>
          </>
        ) : (
          <>
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

              {errorMessage && <ErrorMsg>Error: {errorMessage}</ErrorMsg>}

              <Button type="submit">Submit</Button>
            </FormComponent>
          </>
        )}
      </BidOrderComponent>
    </>
  );
}
