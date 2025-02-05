import urlJoin from "url-join";

const EXAMPLE_MAIN_URL = window.location.origin;

const Endpoints = {
  GET_ALL_PRODUCTS() {
    return urlJoin(EXAMPLE_MAIN_URL, "/api/products");
  },
  REGISTER_COMPANY() {
    return urlJoin(EXAMPLE_MAIN_URL, "/api/company/register");
  },
  REGISTER_NEW_BID() {
    return urlJoin(EXAMPLE_MAIN_URL, "/api/bids/register/bid");
  },
};

export default Endpoints;
