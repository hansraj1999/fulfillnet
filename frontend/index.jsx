import React from "react";
import "./root.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import styled from "styled-components";
import Footer from "./components/Footer";

const RootWrapper = styled.div`
  font-family: Inter;
  p {
    font-size: 14px;
  }

  padding: 16px;
  background-color: white;
  /* height: 100vh; */
  margin: 12px;
  /* height: 100%; */

  input:focus {
    outline: none; /* Removes the default outline */
    border: none; /* Removes the border */
  }
  /* margin: 24px; */
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootWrapper className="root">
      <RouterProvider router={router} />

      <Footer />
    </RootWrapper>
  </React.StrictMode>
);
