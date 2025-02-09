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
import OrderTrackingComponent from "../../components/OrderTracking";
import NotFound from "../NotFound";
import { isoDateConverter } from "../../Utilities/date.util";
import CrossIcon from "../../public/assets/Cross.svg";

const BreadCrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsComponent = styled.div`
  background-color: white;
  border-radius: 25px;
  margin-top: 16px;
  /* padding: 24px; */

  .divider {
    border-bottom: 1px solid #e0e0e0;
    margin: 24px 0;
  }
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
  flex-basis: 24%;
  margin-bottom: 0px;
  padding-right: 0px;
  padding: 16px 0;
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

const BidListing = styled.div``;
const ListingWrapper = styled.div``;

const TabsContainer = styled.div``;
const ButtonComponent = styled(Button)`
  padding: 16px;
  font-size: 12px;
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
  padding: 24px 12px;
  background-color: white;
  border-radius: 4px;
  width: 480px;
  padding: 32px 24px;
`;
const ModelHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 16px;
`;
const CrossButton = styled.img`
  cursor: pointer;
`;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMsg = styled.div`
  font-size: 14px;
  color: red;
`;

const FORM_DATA = [
  {
    key: "pdp_link",
    label: "PDP Link",
    name: "pdp_link",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter PDP Link",
    validation: {
      required: "PDP link is required.",
    },
  },
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

const trackingList = [
  { text: "Placed", is_passed: true, is_current: true },
  { text: "Confirmed", is_passed: false, is_current: false },
  { text: "DP Assigned", is_passed: false, is_current: false },
  { text: "Packed", is_passed: false, is_current: false },
  { text: "In Transit", is_passed: false, is_current: false },
  { text: "Out for Delivery", is_passed: false, is_current: false },
  { text: "Delivered", is_passed: false, is_current: false },
];

export default function BidDetails() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [shipmentData, setShipmentData] = useState(null);
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

    if (bid_data?.new_fynd_order_id) {
      getOrderDetails();
    }
  }, [bid_data]);

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
        pdp_link: formData?.pdp_link,
      };
      const result = await MainService.applyBid(payload);
      const data = result.data;
      if (data.success) {
        await listAppliedBids();
        setModalOpen(false);
        reset({});
      } else {
        setErrorMessage(data?.message);
      }
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

  const getOrderDetails = async () => {
    try {
      const result = await MainService.getOrderByID({
        order_id: bid_data?.new_fynd_order_id,
        winning_company_id: company_id,
      });
      const { success, data } = result.data;

      if (success) {
        const { shipments } = data;
        // const shipment = order?.shipments[]
        setShipmentData(shipments[0]);
      }
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
            <Header>Bid Details</Header>
            <DetailWrapper>
              <Section>
                <Label>Brand:</Label>
                <Value>{bid_data?.item_details?.brand}</Value>
              </Section>
              <Section>
                <Label>Name:</Label>
                <Value>{bid_data?.item_details?.name}</Value>
              </Section>
              <Section>
                <Label>Size:</Label>
                <Value>{bid_data?.item_details?.size}</Value>
              </Section>
              <Section>
                <Label>Quantity:</Label>
                <Value>{bid_data?.quantity}</Value>
              </Section>
              <Section>
                <Label>Bid Price:</Label>
                <Value>{bid_data?.initial_bid_price}</Value>
              </Section>
              <Section>
                <Label>Bid Placed:</Label>
                <Value>{isoDateConverter(bid_data?.created_at)}</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>{bid_data?.status}</Value>
              </Section>
              <Section>
                <Label>Company ID:</Label>
                <Value>{bid_data?.ordering_company_id}</Value>
              </Section>
              <Section>
                <Label>Company Name:</Label>
                <Value>{bid_data?.company_name}</Value>
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

            {shipmentData?.tracking_list?.length && (
              <>
                <div className="divider"></div>
                <OrderTrackingComponent
                  tracking_list={shipmentData?.tracking_list}
                  onRefreshClick={getOrderDetails}
                />
              </>
            )}

            <div className="divider"></div>

            <ListingWrapper>
              <Header>Bid List</Header>

              {appliedBids?.length > 0 ? (
                <BidListing>
                  {appliedBids?.map((data, index) => {
                    // debugger;
                    return (
                      <AppliedBidCard
                        key={index}
                        onClick={handleOrderClick}
                        data={data}
                        active={data?.is_winner}
                      />
                    );
                  })}
                </BidListing>
              ) : (
                <NotFound text={"No Bid Available"} />
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
              <CrossButton
                src={CrossIcon}
                onClick={() => {
                  reset();
                  setModalOpen(false);
                }}
              />
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

              {errorMessage && <ErrorMsg>Error: {errorMessage}</ErrorMsg>}
              <div style={{ marginTop: "12px" }}>
                <Button width="100%" type="submit">
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
