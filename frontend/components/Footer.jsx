import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "../public/assets/Home.svg";
import MobileIcon from "../public/assets/MobileIcon.svg";
import MailIcon from "../public/assets/ic_mail.svg";

const FooterContainer = styled.footer`
  background-color: #181d29;
  /* padding: 40px 0; */
  color: white;
  text-align: left;

  margin-top: 100px;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  max-width: 260px;
  margin: 20px;
`;

const Title = styled.h3`
  font-size: 14px;
  margin-bottom: 10px;
  border-bottom: 2px solid #5a5e6b;
  display: inline-block;
  padding-bottom: 5px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #b0b3c1;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const Contacts = styled.div`
  margin: 18px 0 0 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  color: #b0b3c1;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  font-size: 14px;
  color: #b0b3c1;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: white;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: #b0b3c1;
`;

const Footer = () => {
  const location = useLocation();
  const isShipmentRoute = location.pathname.includes("/shipment");

  return isShipmentRoute ? (
    <>
      <FooterContainer>
        <FooterWrapper>
          {/* Column 1 */}
          <Column>
            <Title>FulFilNet</Title>
            <Text>
              Enabling resellers to auction unfulfilled orders, bid, and
              collaborate for seamless fulfillment.
            </Text>
          </Column>

          {/* Column 3 */}
          <Column>
            <Title>Resources</Title>
            <List>
              <ListItem
                onClick={() =>
                  window.open(
                    "https://example.com",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Walk through
              </ListItem>
              <ListItem>FAQs (Upcoming)</ListItem>
            </List>
          </Column>

          {/* Column 4 */}
          <Column>
            <Title>Contact</Title>
            <Contacts>
              <ContactItem>
                <Icon>
                  <img src={HomeIcon} />
                </Icon>
                Fynd, WeWork Vijay Diamond, Cross Rd B, M.I.D.C, Ajit Nagar,
                Kondivita, Andheri East, Mumbai, Maharashtra 400093
              </ContactItem>
              <ContactItem>
                <Icon>
                  <img src={MailIcon} />
                </Icon>
                hansrajdeghun@gofynd.com <br /> abhishekgupta@gofynd.com
              </ContactItem>
              <ContactItem>
                <Icon>
                  <img src={MobileIcon} />
                </Icon>
                +91 7758005274 <br /> +91 8830073205
              </ContactItem>
            </Contacts>
          </Column>
        </FooterWrapper>
        {/* <Copyright>© 2020 Copyright: MDBootstrap.com</Copyright> */}
      </FooterContainer>
    </>
  ) : (
    <></>
  );
};

export default Footer;
