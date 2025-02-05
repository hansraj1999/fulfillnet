import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button";
// import { getCompany } from "./Utilities/company.util";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import MainService from "./services/main-service";
// import BidOrder from "./components/BidOrder";

const HeaderComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  /* margin: 22px; */

  p {
    margin: 0;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

const CardBody = styled.div``;
const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 130%;
  color: #41434c;
`;
const Desc = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 160%;
  color: #828282;
  margin: 0.8rem 0 0 0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonComponent = styled(Button)`
  border-radius: 12px;
`;

const CustomCards = (props) => {
  const { item, onClick, disabled } = props;
  const { title, desc, buttonText } = item || {};
  return (
    <>
      <Card>
        <CardBody>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </CardBody>
        <CardFooter>
          <ButtonComponent disabled={disabled} size="small" onClick={onClick}>
            {buttonText}
          </ButtonComponent>
        </CardFooter>
      </Card>
    </>
  );
};

function App() {
  const { company_id } = useParams();
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(false);
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
    {
      title: "Products",
      desc: "List Products",
      route: "products",
      buttonText: "Next",
    },
  ]);

  const handleCompanyRegisteration = async () => {
    const result = await MainService.registerCompany({
      company_id,
    });
    const data = result?.data;
    toast(data?.message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
    });

    setRegistered(true);
  };

  useEffect(() => {
    if (!isRegistered) {
      handleCompanyRegisteration();
    }
  });

  const handleClick = (route) => {
    navigate(`/company/${company_id}/${route}`);
  };

  return (
    <>
      <HeaderComponent>
        <BreadCrumb
          breadCrumbList={[
            {
              key: "home",
              label: "Home",
              // link: "current",
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
              disabled={!isRegistered}
            />
          );
        })}
      </Wrapper>

      <ToastContainer />
      {/* <BidOrder /> */}
    </>
  );
}

export default App;
