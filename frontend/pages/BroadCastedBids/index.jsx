import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import BidCardComponent from "../../components/BidCards/BidCardComponent";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";
// import { getCompany } from "../../Utilities/company.util";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

const Wrapper = styled.div``;
const TabsContainer = styled.div``;
const ListingContainer = styled.div``;

let tabsData = [
  {
    key: "runnig",
    label: "Running",
    count: 0,
  },
  {
    key: "approved",
    label: "Approved",
    count: 0,
  },
  {
    key: "rejected",
    label: "Rejected",
    count: 0,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    count: 0,
  },
];

export default function BroadCastedBids() {
  const { application_id, company_id } = useParams();
  const navigate = useNavigate();
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleBidClick = (data) => {
    navigate(`/company/${company_id}/broadcasted-bids/${data._id}/details`);
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
            key: "broadcasted-bids",
            label: "Broadcasted Bids",
            link: "current",
          },
        ]}
      />
      <Wrapper>
        <TabsContainer>
          <Tabs
            selectedTab={activeTab}
            tabList={tabsData}
            onClick={handleTabClick}
          />
        </TabsContainer>

        <ListingContainer>
          {ORDERS_DATA.map((orderData, index) => (
            <BidCardComponent
              key={index}
              onClick={handleBidClick}
              orderData={orderData}
            />
          ))}
          <Pagination
            total={1000}
            tablePageNumber={tablePageNumber}
            setTablePageNumber={(num) => {
              setTablePageNumber(num);
            }}
          />
        </ListingContainer>
      </Wrapper>
    </>
  );
}
