import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import BidCardComponent from "../../components/BidCards/BidCardComponent";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";
// import { getCompany } from "../../Utilities/company.util";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MainService from "../../services/main-service";
import NotFound from "../NotFound";

const Wrapper = styled.div`
  .divider {
    border-bottom: 1px solid #e0e0e0;
  }
`;
const TabsContainer = styled.div``;
const ListingContainer = styled.div``;

let tabsData = [
  {
    key: "active",
    label: "Running",
    // count: 0,
  },
  {
    key: "completed",
    label: "Completed",
    // count: 0,
  },
  // {
  //   key: "delivered",
  //   label: "Delivered",
  //   count: 0,
  // },
  // {
  //   key: "cancelled",
  //   label: "Cancelled",
  //   count: 0,
];

export default function BroadCastedBids() {
  const { application_id, company_id } = useParams();
  const navigate = useNavigate();
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);

  const [bidList, setBidList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllBids({ filter: activeTab });
  }, [limit, currentPage, activeTab]);

  const getAllBids = async ({ filter }) => {
    try {
      const result = await MainService.getAllGlobalBids({
        company_id: company_id,
        pageNo: currentPage,
        pageSize: limit,
        filter: filter,
      });

      const { data, item_total, pageNo } = result?.data;
      // debugger;

      setBidList(() => data || []);
      setTotal(() => item_total || 0);
      setCurrentPage(() => pageNo || 0);
      // debugger;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleBidClick = (data) => {
    navigate(`/company/${company_id}/broadcasted-bids/${data._id}/details`, {
      state: { data },
    });
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

        {bidList?.length > 0 ? (
          <ListingContainer>
            {bidList.map((data, index) => (
              <BidCardComponent
                type="broadcasted_card"
                key={index}
                onClick={handleBidClick}
                data={data}
              />
            ))}
          </ListingContainer>
        ) : (
          <>
            <NotFound text={"No Bids Available"} />
          </>
        )}

        <div className="divider"></div>
        <Pagination
          total={total}
          tablePageNumber={currentPage}
          rowsPerPage={limit}
          setTablePageNumber={(num) => {
            setCurrentPage(num);
          }}
        />
      </Wrapper>
    </>
  );
}
