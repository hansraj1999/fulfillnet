import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import { routeGuard } from "./guard";

import MyBids from "./pages/MyBids/index";
import BroadCastedBids from "./pages/BroadCastedBids";
import BidDetails from "./pages/BroadCastedBids/BidDetails";
import MyBidDetails from "./pages/MyBids/BidDetails";
import Profile from "./pages/Profile";
import Ledgers from "./pages/Ledgers";
import { Home } from "./pages/Home";
import BidOrder from "./components/BidOrder";
// import Orders from "./pages/Orders/index";
// import OrderDetail from "./pages/Orders/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/company/:company_id/profile/",
    element: <Profile />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/ledgers/",
    element: <Ledgers />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/broadcasted-bids",
    element: <BroadCastedBids />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/broadcasted-bids/:bid_id/details",
    element: <BidDetails />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/my-bids/:bid_id/details",
    element: <MyBidDetails />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/my-bids",
    element: <MyBids />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/products",
    element: <Home />,
    loader: routeGuard,
  },
  {
    path: "/company/:company_id/",
    element: <App />,
    loader: routeGuard,
  },
  {
    path: "/shipment",
    element: <BidOrder />,
    loader: routeGuard,
  },
  // {
  //   path: "/company/:company_id/",
  //   element: <Orders />,
  //   loader: routeGuard,
  // },

  {
    path: "/*", // Fallback route for all unmatched paths
    element: <NotFound />, // Component to render for unmatched paths
    loader: routeGuard,
  },
]);

export default router;
