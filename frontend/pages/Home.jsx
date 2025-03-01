import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
// import { getCompany } from "./Utilities/company.util";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import MainService from "../services/main-service";
import InfoIcon from "../public/assets/Info.svg";
import { useAppContext } from "../ContextProvider";
// import BidOrder from "./components/BidOrder";

const HeaderComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 16px 0;
  /* margin: 22px; */

  p {
    margin: 0;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e4e5e6;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

const CardBody = styled.div``;
const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  color: #41434c;
`;
const Desc = styled.p`
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: #828282;
  margin: 0.8rem 0 0 0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background: #e7eeff;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #2e31be;

  margin-bottom: 12px;
`;
const NoteIcon = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #41434c;
`;
const NoteText = styled.div``;

const CustomCards = (props) => {
  const { item, onClick, disabled, userVeirfied } = props;
  const { title, desc, buttonText } = item || {};
  return (
    <>
      <Card>
        <CardBody>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </CardBody>
        <CardFooter>
          <Button
            disabled={item?.route === "profile" ? false : disabled}
            size="small"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

function Home() {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const { company_id } = useParams();
  const navigate = useNavigate();
  const [userVeirfied, setUserVerified] = useState(true);
  const [actionCards, setActionCards] = useState([
    {
      title: "My Bids",
      desc: "List all bids raised for your orders",
      route: "my-bids",
      buttonText: "Next",
    },
    {
      title: "Broadcasted Bids",
      desc: "List all Broadcasted raised by other sellers",
      route: "broadcasted-bids",
      buttonText: "Next",
    },
    {
      title: "Ledgers",
      desc: "List of transactions",
      route: "ledgers",
      buttonText: "Next",
    },
    {
      title: "Profile Details",
      desc: "Profile Details",
      route: "profile",
      buttonText: "Next",
    },
    // {
    //   title: "Products",
    //   desc: "List Products",
    //   route: "products",
    //   buttonText: "Next",
    // },
  ]);

  useEffect(() => {
    const isShipmentRoute = location.pathname.includes("/shipment");
    dispatch({
      type: "IS_SHIPMENT_PAGE",
      payload: { isShipmentPage: isShipmentRoute },
    });
  }, [location.pathname, dispatch]);

  const handleCompanyRegisteration = async () => {
    setUserVerified(false);

    const result = await MainService.registerCompany({
      company_id,
    });

    const data = result?.data;

    if (data?.success) {
      toast(data?.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
      });
    }
  };

  const getCompanyProfile = async () => {
    const result = await MainService.getProfileDetailsByCompanyID({
      company_id,
    });
    const { data: profileDetails, success } = result?.data; 
    const is_verified = profileDetails?.is_verified;

    if (!is_verified) {
      setUserVerified(false);
      handleCompanyRegisteration();
    }
  };

  useEffect(() => {
    getCompanyProfile();
  });

  const handleClick = (route) => {
    navigate(`/company/${company_id}/${route}`);
  };

  return (
    <>
      {!userVeirfied && (
        <NoteWrapper>
          <NoteIcon>
            <img src={InfoIcon} />
          </NoteIcon>
          <NoteIcon>Please fill the profile details</NoteIcon>
        </NoteWrapper>
      )}

      <>
        <HeaderComponent>
          <BreadCrumb
            breadCrumbList={[
              {
                key: "home",
                label: "Home",
                link: "current",
              },
            ]}
          />
        </HeaderComponent>

        <Wrapper>
          {actionCards?.map((item, idx) => {
            return (
              <CustomCards
                key={idx}
                item={item}
                onClick={() => handleClick(item.route)}
                userVeirfied={userVeirfied}
                disabled={!userVeirfied}
              />
            );
          })}
        </Wrapper>
      </>

      <ToastContainer />
      {/* <BidOrder /> */}
    </>
  );
}

export default Home;
