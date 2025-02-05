import React, { useState } from "react";
import loaderGif from "../../public/assets/loader.gif";
import { BidCard } from "../../components/BidCards/BidCard";

import { ORDERS_DATA } from "./constant";
import styled from "styled-components";
import Tabs from "../../components/Tabs";

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

export default function BidDetails() {
  const [activeTab, setActiveTab] = useState(tabsData[0].key);
  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleOrderClick = (orderData) => {
    // console.log(`/company/${getCompany()}/order/`);
    // navigate(`/company/${getCompany()}/order/`);
  };

  return (
    <>
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
                <Value>313123</Value>
              </Section>
              <Section>
                <Label>Shipment Date:</Label>
                <Value>313123</Value>
              </Section>
              <Section>
                <Label>Price:</Label>
                <Value>313123</Value>
              </Section>
              <Section>
                <Label>Payment Mode:</Label>
                <Value>COD</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>COD</Value>
              </Section>
            </DetailWrapper>

            <div className="divider"></div>

            <ListingWrapper>
              <Header>Bid List</Header>

              <TabsContainer>
                <Tabs
                  selectedTab={activeTab}
                  tabList={tabsData}
                  onClick={handleTabClick}
                />
              </TabsContainer>
              <BidListing>
                {ORDERS_DATA.map((orderData, index) => (
                  <BidCard
                    key={index}
                    onClick={handleOrderClick}
                    orderData={orderData}
                  />
                ))}
              </BidListing>
            </ListingWrapper>
          </DetailsComponent>
        </>
      )}
    </>
  );
}
