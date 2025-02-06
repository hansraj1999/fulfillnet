import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import loaderGif from "../../public/assets/loader.gif";
import { BidCard } from "../../components/BidCards/BidCard";

import { ORDERS_DATA } from "./constant";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
// import { getCompany } from "../../Utilities/company.util";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { AppliedBidCard } from "../../components/BidCards/AppliedBidCard";
import MainService from "../../services/main-service";
import OrderTrackingComponent from "../../components/OrderTracking";
import NotFound from "../NotFound";

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
  const location = useLocation();
  const [shipmentData, setShipmentData] = useState(null);
  const [appliedBids, setAppliedBids] = useState([]);
  const { company_id } = useParams();
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const bid_data = location.state?.data;

  // const handleTabClick = (selectedTab) => {
  //   let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
  //   setActiveTab(newTab);
  // };

  useEffect(() => {
    listAppliedBids();

    if (bid_data?.new_fynd_order_id) {
      getOrderDetails();
    }
  }, [bid_data]);

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

  const bidApprovalHandler = async (bidData) => {
    try {
      const result = await MainService.approveBid({
        bid_id: bidData?.bid_id,
        winner_company_id: bidData?.company_id,
        shipment_id: bid_data?.shipment_id,
      });

      const data = result?.data;

      await listAppliedBids();
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
      <BreadCrumb
        breadCrumbList={[
          {
            key: "home",
            label: "Home",
            link: `/company/${company_id}/`,
          },
          {
            key: "my-bids",
            label: "My Bids",
            link: `/company/${company_id}/my-bids`,
          },
          {
            key: "my-bids-details",
            label: "Detail",
            link: "current",
          },
        ]}
      />
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

            {shipmentData?.tracking_list?.length && (
              <>
                <div className="divider"></div>
                <OrderTrackingComponent
                  tracking_list={shipmentData?.tracking_list}
                />
              </>
            )}

            <div className="divider"></div>
            <ListingWrapper>
              <Header>Bid List</Header>
              {appliedBids?.length > 0 ? (
                <>
                  {/* <TabsContainer>
                <Tabs
                  selectedTab={activeTab}
                  tabList={tabsData}
                  onClick={handleTabClick}
                />
              </TabsContainer> */}
                  {appliedBids?.length > 0 && (
                    <BidListing>
                      {appliedBids?.map((data, index) => (
                        <AppliedBidCard
                          key={index}
                          onClick={bidApprovalHandler}
                          data={data}
                          type="approval"
                          // active={data?.bid_id === bid_data?.bid_id}
                        />
                      ))}
                    </BidListing>
                  )}
                </>
              ) : (
                <>
                  <NotFound />
                </>
              )}
            </ListingWrapper>
          </DetailsComponent>
        </>
      )}
    </>
  );
}
