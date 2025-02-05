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
  ADD_BANK_DETAILS() {
    return urlJoin(EXAMPLE_MAIN_URL, "/api/company/add-account-details");
  },
  PROFILE_DETAILS() {
    return urlJoin(EXAMPLE_MAIN_URL, "/api/company/profile-details");
  },
};

export default Endpoints;
