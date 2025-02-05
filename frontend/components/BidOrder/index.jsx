import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import GetInput from "../TextInput/GetInput";
import Button from "../Button";

const BidOrderComponent = styled.div``;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shipmentId = queryParams.get("shipment_id");

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
    console.log("formData >>>", formData, shipmentId);
    // debugger;
    reset({ bid_amount: null });
  };

  return (
    <BidOrderComponent>
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
    </BidOrderComponent>
  );
}
