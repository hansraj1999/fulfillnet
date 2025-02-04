import React, { useState } from "react";
import loaderGif from "../../public/assets/loader.gif";
import { OrderList } from "../../components/List/OrderList";
import Tabs from "../../components/Tabs";
import { ORDERS_DATA } from "./constant";
import styled from "styled-components";
import Pagination from "../../components/Pagination";

const ListtingWrapper = styled.div``;

let tabsData = [
  {
    key: "active",
    label: "Active",
    count: 0,
  },
  {
    key: "inactive",
    label: "Inactive",
    count: 0,
  },
];

export const Orders = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [tablePageNumber, setTablePageNumber] = useState(1);

  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  return (
    <>
      {false ? (
        <div className="loader" data-testid="loader">
          <img src={loaderGif} alt="loader GIF" />
        </div>
      ) : (
        <>
          <div>
            <Tabs
              selectedTab={activeTab}
              tabList={tabsData}
              onClick={handleTabClick}
            />
            <ListtingWrapper>
              {ORDERS_DATA.map((product, index) => (
                <OrderList key={index} />
              ))}
            </ListtingWrapper>
            <div>
              <Pagination
                total={1000}
                tablePageNumber={tablePageNumber}
                setTablePageNumber={(num) => {
                  setTablePageNumber(num);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
