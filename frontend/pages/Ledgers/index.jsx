import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import LedgerCard from "../../components/BidCards/LedgerCard";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";
// import { getCompany } from "../../Utilities/company.util";

const Wrapper = styled.div``;
const TabsContainer = styled.div``;
const ListingContainer = styled.div``;

let tabsData = [
  {
    key: "all",
    label: "All",
    // count: 0,
  },
  {
    key: "settled",
    label: "Settled",
    // count: 0,
  },
];

export default function Ledgers() {
  const navigate = useNavigate();
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleCardClick = (data) => {
    // navigate(`/company/${getCompany()}/broadcasted-bids/${data._id}/details`);
  };

  return (
    <>
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
            <LedgerCard
              key={index}
              onClick={handleCardClick}
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
