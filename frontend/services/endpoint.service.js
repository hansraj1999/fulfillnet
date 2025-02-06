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
  APPLY_BID(params) {
    const { bid_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${bid_id}/apply`);
  },
  GET_ALL_APPLIED_BIDS(params) {
    const { bid_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${bid_id}/applied/list`);
  },
  APPROVE_BID(params) {
    const { bid_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${bid_id}/approve`);
  },
  GET_ORDER_BY_ID(params) {
    const { order_id, winning_company_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/orders/${order_id}/winning_company_id/${winning_company_id}`);
  },
  GET_ALL_LEDGERS(params) {
    const { company_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${company_id}/ledger/list`);
  },
  PAYOUT_LEDGER(params) {
    const { company_id, ledger_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/bids/${company_id}/ledger/${ledger_id}`);
  },
  PROFILE_BY_COMPANY_ID(params) {
    const { company_id } = params;
    return urlJoin(EXAMPLE_MAIN_URL, `/api/company/${company_id}/profile-details`);
  },
};

export default Endpoints;
