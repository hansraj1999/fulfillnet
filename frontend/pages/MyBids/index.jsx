import React, { useState } from "react";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import BidCardComponent from "../../components/BidCards/BidCardComponent";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";

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

export default function MyBids() {
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleOrderClick = (data) => {
    console.log(data);
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
            <BidCardComponent
              key={index}
              onClick={handleOrderClick}
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
