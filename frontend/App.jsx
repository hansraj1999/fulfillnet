import React from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";

import router from "./router";
// import BidOrder from "./components/BidOrder";

function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* <ToastContainer /> */}
      {/* <BidOrder /> */}
    </>
  );
}

export default App;
