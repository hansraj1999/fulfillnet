import URLS from "./endpoint.service";
import axios from "axios";
import { getCompany } from "../Utilities/company.util";

axios.interceptors.request.use((config) => {
  config.headers["x-company-id"] = getCompany();
  return config;
});

const MainService = {
  getAllProducts(params = {}) {
    return axios.get(URLS.GET_ALL_PRODUCTS(), { params });
  },
  registerCompany(body = {}) {
    return axios.post(URLS.REGISTER_COMPANY(), body);
  },
  registerNewBid(body = {}) {
    return axios.post(URLS.REGISTER_NEW_BID(), body);
  },
  addBankDetails(body = {}) {
    return axios.post(URLS.ADD_BANK_DETAILS(), body);
  },
  profileDetails(body = {}) {
    return axios.get(URLS.PROFILE_DETAILS(), body);
  },
  getAllBidsByCompany(params = {}) {
    const { company_id, ...rest } = params;
    return axios.get(URLS.GET_ALL_BIDS_BY_COMPANY({ company_id }), {
      params: { ...rest },
    });
  },
  getAllGlobalBids(params = {}) {
    const { company_id, ...rest } = params;
    return axios.get(URLS.GET_ALL_BIDS_BIDS(), {
      params: { ...rest },
    });
  },
  applyBid(params = {}) {
    const { company_id, bid_id, ...rest } = params;
    return axios.post(URLS.APPLY_BID({ company_id, bid_id }), { ...rest });
  },
  getAllAppliedBids(params = {}) {
    const { bid_id } = params;
    return axios.get(URLS.GET_ALL_APPLIED_BIDS({ bid_id }));
  },
  approveBid(params = {}) {
    const { bid_id, winner_company_id, shipment_id } = params;
    return axios.post(URLS.APPROVE_BID({ bid_id }), {
      winner_company_id,
      shipment_id,
    });
  },
  getOrderByID(params = {}) {
    const { order_id, winning_company_id } = params;
    return axios.get(URLS.GET_ORDER_BY_ID({ order_id, winning_company_id }));
  },
  getAllLedgers(params = {}) {
    const { company_id, ...rest } = params;
    return axios.get(URLS.GET_ALL_LEDGERS({ company_id }), {
      params: { ...rest },
    });
  },
  payoutLedger(params = {}) {
    const { company_id, ledger_id, utr } = params;
    return axios.post(URLS.PAYOUT_LEDGER({ company_id, ledger_id }), { utr });
  },
  getProfileDetailsByCompanyID(params = {}) {
    const { company_id } = params;
    return axios.get(URLS.PROFILE_BY_COMPANY_ID({ company_id }));
  },
};

export default MainService;
