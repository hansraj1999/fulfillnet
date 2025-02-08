import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import styled from "styled-components";

import router from "./router";
import Footer from "./components/Footer";
// import BidOrder from "./components/BidOrder";
const AppComponent = styled.div`
  background: white;
`;
const RouterContainer = styled.div`
  padding: 16px;
`;

function App() {
  return (
    <>
      <AppComponent>
        <RouterContainer>
          <RouterProvider router={router} />
        </RouterContainer>

        <Footer />
      </AppComponent>
    </>
  );
}

export default App;
