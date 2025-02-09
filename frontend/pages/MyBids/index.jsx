import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import BidCardComponent from "../../components/BidCards/BidCardComponent";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MainService from "../../services/main-service";
import NotFound from "../NotFound";
// import { getCompany } from "../../Utilities/company.util";

const Wrapper = styled.div`
  .divider {
    border-bottom: 1px solid #e0e0e0;
  }
`;
const TabsContainer = styled.div``;
const ListingContainer = styled.div``;

let tabsData = [
  {
    key: "runnig",
    label: "Running",
    // count: 0,
  },
  // {
  //   key: "approved",
  //   label: "Approved",
  //   count: 0,
  // },
  // {
  //   key: "rejected",
  //   label: "Rejected",
  //   count: 0,
  // },
  // {
  //   key: "cancelled",
  //   label: "Cancelled",
  //   count: 0,
  // },
];

export default function MyBids() {
  const navigate = useNavigate();
  const { application_id, company_id } = useParams();
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);

  const [bidList, setBidList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllBids();
  }, [limit, currentPage]);

  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const getAllBids = async () => {
    try {
      const result = await MainService.getAllBidsByCompany({
        company_id: company_id,
        pageNo: currentPage,
        pageSize: limit,
      });

      const { data, item_total, pageNo } = result?.data;

      setBidList(() => data || []);
      setTotal(() => item_total || 0);
      setCurrentPage(() => pageNo || 0);
      // debugger;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderClick = (data) => {
    navigate(`/company/${company_id}/my-bids/${data._id}/details`, {
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
            key: "mybids",
            label: "My Bids",
            link: "current",
          },
        ]}
      />
      {bidList?.length > 0 ? (
        <Wrapper>
          <TabsContainer>
            <Tabs
              selectedTab={activeTab}
              tabList={tabsData}
              onClick={handleTabClick}
            />
          </TabsContainer>

          <ListingContainer>
            {bidList.map((data, index) => (
              <BidCardComponent
                key={index}
                onClick={handleOrderClick}
                data={data}
              />
            ))}
            <div className="divider"></div>
            <Pagination
              total={total}
              tablePageNumber={currentPage}
              rowsPerPage={limit}
              setTablePageNumber={(num) => {
                setCurrentPage(num);
              }}
            />
          </ListingContainer>
        </Wrapper>
      ) : (
        <>
          <NotFound text={"No Bids Available"} />
        </>
      )}
    </>
  );
}
