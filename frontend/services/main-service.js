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
};

export default MainService;
