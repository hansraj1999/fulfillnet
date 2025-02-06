import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Tabs from "../../components/Tabs";
import LedgerCard from "../../components/BidCards/LedgerCard";
import { ORDERS_DATA } from "./constant";
import Pagination from "../../components/Pagination";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MainService from "../../services/main-service";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import GetInput from "../../components/TextInput/GetInput";
// import { getCompany } from "../../Utilities/company.util";

const Wrapper = styled.div``;
const TabsContainer = styled.div``;
const ListingContainer = styled.div``;

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
  padding: 24px;
  background-color: white;
  border-radius: 24px;
  width: 620px;
`;
const ModelHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 16px;
`;
const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

let tabsData = [
  {
    key: "to_pay",
    label: "Yet to pay",
    // count: 0,
  },
  {
    key: "to_be_get_paid",
    label: "Payment Pending",
    // count: 0,
  },
  {
    key: "paid",
    label: "Payment Completed",
    // count: 0,
  },
];

const FORM_DATA = [
  {
    key: "utr",
    label: "UTR",
    name: "utr",
    default: "",
    type: "text",
    inputStyle: "contained",
    placeholder: "Enter UTR",
    maxLength: 17,
    validation: {
      required: "Amount is required.",
    },
    onPaste: (e) => {
      e.preventDefault();
      return false;
    },
  },
];

const getInitialFormValues = (formData) => {
  const intialValues = {};
  for (const field of formData) {
    intialValues[field?.name] = field.default;
  }

  return intialValues;
};

export default function Ledgers() {
  const [ledgerAccountDetails, setLedgerAccountDetails] = useState(null);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { application_id, company_id } = useParams();
  const navigate = useNavigate();
  const [tablePageNumber, setTablePageNumber] = useState(1);
  const [activeTab, setActiveTab] = useState(tabsData[0].key);

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

  const [dataList, setDataList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleTabClick = (selectedTab) => {
    let newTab = tabsData.find((eachTab) => eachTab.key === selectedTab)?.key;
    setActiveTab(newTab);
  };

  const handleCardClick = (data) => {};

  useEffect(() => {
    getAllLedgers();
  }, [limit, currentPage, activeTab]);

  const getAllLedgers = async () => {
    try {
      const result = await MainService.getAllLedgers({
        company_id: company_id,
        pageNo: currentPage,
        pageSize: limit,
        filter: activeTab,
      });

      const { data, item_total, pageNo } = result?.data;

      setDataList(() => data || []);
      setTotal(() => item_total || 0);
      setCurrentPage(() => pageNo || 0);
      // debugger;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayout = async (ledger) => {
    try {
      const result = await MainService.getProfileDetailsByCompanyID({
        company_id: ledger?.winner_company_id,
      });
      const data = result?.data?.data;

      setLedgerAccountDetails(data);
      setSelectedLedger(ledger);
      setModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onPaymentSubmit = async (formData) => {
    try {
      console.log("selectedLedger>>>>>", selectedLedger);
      const result = await MainService.payoutLedger({
        company_id,
        ledger_id: selectedLedger?.ledger_id,
        utr: formData?.utr,
      });

      const data = result.data;
      debugger;

      if (data?.success) {
        reset();
        setModalOpen(false);
        setLedgerAccountDetails(null);
        setSelectedLedger(null);
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
            key: "ledgers",
            label: "Ledgers",
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
          {dataList.map((data, index) => (
            <LedgerCard
              key={index}
              onClick={handlePayout}
              data={data}
              activeTab={activeTab}
            />
          ))}
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

      {isModalOpen && (
        <ModalComponent>
          <ModalWrapper>
            <HeaderWrapper>
              <ModelHeader>Account Details</ModelHeader>
              <Button
                mode={"text"}
                onClick={() => {
                  reset();
                  setModalOpen(false);
                  setLedgerAccountDetails(null);
                  setSelectedLedger(null);
                }}
              >
                X
              </Button>
            </HeaderWrapper>

            {ledgerAccountDetails && (
              <DetailWrapper>
                {console.log(ledgerAccountDetails)}

                <Section>
                  <Label>Beneficiary Name:</Label>
                  <Value>{ledgerAccountDetails?.beneficiary_name}</Value>
                </Section>
                <Section>
                  <Label>Beneficiary Mobile:</Label>
                  <Value>{ledgerAccountDetails?.mobile_number}</Value>
                </Section>
                <Section>
                  <Label>Accound Number:</Label>
                  <Value>{ledgerAccountDetails?.account_number}</Value>
                </Section>
                <Section>
                  <Label>IFSC Code:</Label>
                  <Value>{ledgerAccountDetails?.ifsc}</Value>
                </Section>
                <Section>
                  <Label>Bank Name:</Label>
                  <Value>{ledgerAccountDetails?.bank_name}</Value>
                </Section>
                <Section>
                  <Label>Accoun Type:</Label>
                  <Value>{ledgerAccountDetails?.account_type}</Value>
                </Section>
                <Section>
                  <Label>VPA ID:</Label>
                  <Value>{ledgerAccountDetails?.vpa}</Value>
                </Section>
              </DetailWrapper>
            )}

            <FormComponent onSubmit={handleSubmit(onPaymentSubmit)} noValidate>
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

              <Button type="submit">Submit</Button>
            </FormComponent>
          </ModalWrapper>
        </ModalComponent>
      )}
    </>
  );
}
