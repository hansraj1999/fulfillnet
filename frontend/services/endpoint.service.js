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
  GET_ALL_BIDS_BY_COMPANY(params) {
    const { company_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${company_id}/list`);
  },
  GET_ALL_BIDS_BIDS() {
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/global/list`);
  },
};

export default Endpoints;
