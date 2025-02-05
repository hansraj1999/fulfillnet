import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/Button";
import { getCompany } from "./Utilities/company.util";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin: 22px;

  p {
    margin: 0;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 1.2rem;
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

const CustomCards = (props) => {
  const { item, onClick } = props;
  const { title, desc, buttonText } = item || {};
  return (
    <>
      <Card>
        <CardBody>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </CardBody>
        <CardFooter>
          <Button size="small" onClick={onClick}>
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

function App() {
  const navigate = useNavigate();
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
      title: "Ledger",
      desc: "List of transactions",
      route: "ledger",
      buttonText: "Next",
    },
    {
      title: "Profile Details",
      desc: "Profile Details",
      route: "profile",
      buttonText: "Next",
    },
  ]);

  const handleClick = (route) => {
    navigate(`/company/${getCompany()}/${route}`);
  };

  return (
    <>
      <Wrapper>
        {actionCards?.map((item, idx) => {
          return (
            <CustomCards
              key={idx}
              item={item}
              onClick={() => handleClick(item.route)}
            />
          );
        })}
      </Wrapper>
    </>
  );
}

export default App;
