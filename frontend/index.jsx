import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import styled from "styled-components";

const RootWrapper = styled.div`
  font-family: Inter;
  p {
    font-size: 14px;
  }

  padding: 16px;
  background-color: white;
  /* height: 100vh; */
  margin: 12px;

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
    </RootWrapper>
  </React.StrictMode>
);
