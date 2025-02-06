import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import loaderGif from "../../public/assets/loader.gif";
import { AppliedBidCard } from "../../components/BidCards/AppliedBidCard";

import { ORDERS_DATA } from "./constant";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
// import { getCompany } from "../../Utilities/company.util";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import GetInput from "../../components/TextInput/GetInput";
import MainService from "../../services/main-service";

const BreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsComponent = styled.div`
  background-color: white;
  border-radius: 25px;
  /* padding: 24px; */

  .divider {
    border-bottom: 1px solid #e0e0e0;
    margin: 24px 0;
  }
`;

const Header = styled.div`
  font-size: 16px;
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

const BidListing = styled.div``;
const ListingWrapper = styled.div``;

const TabsContainer = styled.div``;
const ButtonComponent = styled(Button)`
  padding: 16px;
  font-size: 14px;
  height: 12px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
    key: "amount",
    label: "Bid Price",
    name: "amount",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter Bid Price",
    maxLength: 17,
    validation: {
      required: "Bid Priceis required.",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Please enter valid bid price",
      },
    },
    onPaste: (e) => {
      e.preventDefault();
      return false;
    },
  },
];

let tabsData = [
  {
    key: "request",
    label: "Request",
    count: 0,
  },
  {
    key: "rejected",
    label: "Rejected",
    count: 0,
  },
];

const getInitialFormValues = (formData) => {
  const intialValues = {};
  for (const field of formData) {
    intialValues[field?.name] = field.default;
  }

  return intialValues;
};

export default function BidDetails() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [appliedBids, setAppliedBids] = useState([]);
  const location = useLocation();
  const { application_id, company_id } = useParams();
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const bid_data = location.state?.data;

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
    listAppliedBids();
  }, []);

  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleOrderClick = (orderData) => {
    // console.log(`/company/${getCompany()}/order/`);
    // navigate(`/company/${company_id}/order/`);
  };

  const onBidSubmit = async (formData) => {
    try {
      const payload = {
        company_id,
        bid_id: bid_data?.bid_id,
        amount: formData?.amount,
      };
      const result = await MainService.applyBid(payload);

      setModalOpen(false);
      reset({});
    } catch (err) {
      console.log(err);
    }
  };

  const listAppliedBids = async () => {
    try {
      const result = await MainService.getAllAppliedBids({
        bid_id: bid_data?.bid_id,
      });
      const { data } = result?.data;

      setAppliedBids(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BreadCrumbWrapper>
        <BreadCrumb
          breadCrumbList={[
            {
              key: "home",
              label: "Home",
              link: `/company/${company_id}/`,
            },
            {
              key: "broadcasted-bids",
              label: "Broadcasted Bids",
              link: `/company/${company_id}/broadcasted-bids`,
            },
            {
              key: "broadcasted-bids-details",
              label: "Detail",
              link: "current",
            },
          ]}
        />

        <ButtonComponent size="sm" onClick={() => setModalOpen(true)}>
          Apply for Bid
        </ButtonComponent>
      </BreadCrumbWrapper>
      {false ? (
        <div className="loader" data-testid="loader">
          <img src={loaderGif} alt="loader GIF" />
        </div>
      ) : (
        <>
          <DetailsComponent>
            <Header>Order Details</Header>
            <DetailWrapper>
              <Section>
                <Label>Company ID:</Label>
                <Value>{bid_data?.ordering_company_id}</Value>
              </Section>
              <Section>
                <Label>Company Name:</Label>
                <Value>{bid_data?.company_name}</Value>
              </Section>
              <Section>
                <Label>Shipment ID:</Label>
                <Value>{bid_data?.shipment_id}</Value>
              </Section>
              <Section>
                <Label>Created Date:</Label>
                <Value>{bid_data?.created_at}</Value>
              </Section>
              <Section>
                <Label>Bid Price:</Label>
                <Value>{bid_data?.initial_bid_price}</Value>
              </Section>
              <Section>
                <Label>Quantity:</Label>
                <Value>{bid_data?.quantity}</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>{bid_data?.status}</Value>
              </Section>
            </DetailWrapper>

            <div className="divider"></div>

            <Header>Article Details</Header>
            <DetailWrapper>
              <Section>
                <Label>Name:</Label>
                <Value>{bid_data?.item_details?.name}</Value>
              </Section>
              <Section>
                <Label>Size:</Label>
                <Value>{bid_data?.item_details?.size}</Value>
              </Section>
              <Section>
                <Label>Created Date:</Label>
                <Value>{bid_data?.created_at}</Value>
              </Section>
              <Section>
                <Label>Bid Price:</Label>
                <Value>{bid_data?.initial_bid_price}</Value>
              </Section>
              <Section>
                <Label>Quantity:</Label>
                <Value>{bid_data?.quantity}</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>{bid_data?.status}</Value>
              </Section>
            </DetailWrapper>

            <div className="divider"></div>

            <Header>Delivery Details</Header>
            <DetailWrapper>
              <Section>
                <Label>Contact Person:</Label>
                <Value>
                  {bid_data?.delivery_details?.store_address_json?.name}
                </Value>
              </Section>
              <Section>
                <Label>Store Name:</Label>
                <Value>{bid_data?.delivery_details?.store_name}</Value>
              </Section>
              <Section>
                <Label>Store Email:</Label>
                <Value>{bid_data?.delivery_details?.store_email}</Value>
              </Section>
              <Section>
                <Label>Store Mobile:</Label>
                <Value>{bid_data?.delivery_details?.phone}</Value>
              </Section>
            </DetailWrapper>
            <DetailWrapper>
              <Section>
                <Label>Address:</Label>
                <Value>{bid_data?.delivery_details?.address}</Value>
              </Section>
              <Section>
                <Label>City:</Label>
                <Value>{bid_data?.delivery_details?.city}</Value>
              </Section>
              <Section>
                <Label>State:</Label>
                <Value>{bid_data?.delivery_details?.state}</Value>
              </Section>
              <Section>
                <Label>Pincode:</Label>
                <Value>{bid_data?.delivery_details?.pincode}</Value>
              </Section>
            </DetailWrapper>

            <div className="divider"></div>

            <ListingWrapper>
              <Header>Bid List</Header>

              {/* <TabsContainer>
                <Tabs
                  selectedTab={activeTab}
                  tabList={tabsData}
                  onClick={handleTabClick}
                />
              </TabsContainer> */}
              {appliedBids?.length > 0 && (
                <BidListing>
                  {appliedBids?.map((data, index) => {
                    return (
                      <AppliedBidCard
                        key={index}
                        onClick={handleOrderClick}
                        data={data}
                        active={data?.bid_id === bid_data?.bid_id}
                      />
                    );
                  })}
                </BidListing>
              )}
            </ListingWrapper>
          </DetailsComponent>
        </>
      )}

      {isModalOpen && (
        <ModalComponent>
          <ModalWrapper>
            <HeaderWrapper>
              <ModelHeader>Apply for Bid</ModelHeader>
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

            <FormComponent onSubmit={handleSubmit(onBidSubmit)} noValidate>
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
