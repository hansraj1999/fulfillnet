import React from "react";
import { Orders } from "./pages/Orders";
import styled from "styled-components";

const RootWrapper = styled.div`
  font-family: Inter;
  p {
    font-size: 14px;
  }
`;

const AppWrapper = styled.div`
  padding: 16px;
`;
function App() {
  return (
    <RootWrapper className="root">
      <AppWrapper>
        <Orders />
      </AppWrapper>
    </RootWrapper>
  );
}

export default App;
