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
import { isoDateConverter } from "../../Utilities/date.util";
import Pagination from "../../components/Pagination";

const DetailsComponent = styled.div`
  background-color: white;
  border-radius: 25px;
  /* padding: 24px; */
  margin-top: 16px;

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

const BidListing = styled.div``;
const ListingWrapper = styled.div`
  .pagination-divider {
    border-bottom: 1px solid #e0e0e0;
    /* margin: 24px 0; */
  }
`;

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
  const { company_id } = useParams();
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const [bidData, setBidData] = useState(location.state?.data);

  const [appliedBids, setAppliedBids] = useState([]);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  // const handleTabClick = (selectedTab) => {
  //   let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
  //   setActiveTab(newTab);
  // };

  useEffect(() => {
    if (bidData?.new_fynd_order_id) {
      getOrderDetails();
    }
    listAppliedBids();
  }, [bidData]);

  const fetchBidData = async () => {
    try {
      const result = await MainService.getBidDetails({
        bid_id: bidData?.bid_id,
      });
      const { data } = result?.data;
      debugger;

      setAppliedBids(data);
    } catch (err) {
      console.log(err);
    }
  };

  const listAppliedBids = async () => {
    try {
      const result = await MainService.getAllAppliedBids({
        bid_id: bidData?.bid_id,
      });
      const { data } = result?.data;
      const { applied_bids, total, page } = data;

      setAppliedBids(applied_bids);
      setTotal(() => total || 0);
      setCurrentPage(() => page || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const bidApprovalHandler = async (bidData) => {
    try {
      const result = await MainService.approveBid({
        bid_id: bidData?.bid_id,
        winner_company_id: bidData?.company_id,
        shipment_id: bidData?.shipment_id,
      });

      const data = result?.data;

      await fetchBidData();
      // await getOrderDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderDetails = async () => {
    try {
      const result = await MainService.getOrderByID({
        order_id: bidData?.new_fynd_order_id,
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
                <Label>Shipment ID:</Label>
                <Value>{bidData?.shipment_id}</Value>
              </Section>
              <Section>
                <Label>Order ID:</Label>
                <Value>{bidData?.fynd_order_id}</Value>
              </Section>
              <Section>
                <Label>Quantity:</Label>
                <Value>{bidData?.quantity}</Value>
              </Section>
              <Section>
                <Label>Bid Price:</Label>
                <Value>{bidData?.initial_bid_price}</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>{bidData?.status}</Value>
              </Section>
              <Section>
                <Label>Company Name:</Label>
                <Value>{bidData?.company_name}</Value>
              </Section>
              <Section>
                <Label>Company ID:</Label>
                <Value>{bidData?.ordering_company_id}</Value>
              </Section>

              <Section>
                <Label>Bid Placed:</Label>
                <Value>{isoDateConverter(bidData?.created_at)}</Value>
              </Section>
            </DetailWrapper>

            <div className="divider"></div>

            <Header>Article Details</Header>
            <DetailWrapper>
              <Section>
                <Label>Brand:</Label>
                <Value>{bidData?.item_details?.brand || "-"}</Value>
              </Section>
              <Section>
                <Label>Name:</Label>
                <Value>{bidData?.item_details?.name || "-"}</Value>
              </Section>
              <Section>
                <Label>Size:</Label>
                <Value>{bidData?.item_details?.size}</Value>
              </Section>
              <Section>
                <Label>Item ID:</Label>
                <Value>{bidData?.item_details?.id}</Value>
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
                <>
                  {appliedBids?.length > 0 && (
                    <BidListing>
                      {appliedBids?.map((data, index) => (
                        <AppliedBidCard
                          key={index}
                          onClick={bidApprovalHandler}
                          data={data}
                          type="approval"
                          active={data?.is_winner}
                        />
                      ))}
                    </BidListing>
                  )}
                </>
              ) : (
                <>
                  <NotFound text={"No Bids Available"} />
                </>
              )}

              <div className="pagination-divider"></div>
              <Pagination
                total={total}
                tablePageNumber={currentPage}
                rowsPerPage={limit}
                setTablePageNumber={(num) => {
                  setCurrentPage(num);
                }}
              />
            </ListingWrapper>
          </DetailsComponent>
        </>
      )}
    </>
  );
}
