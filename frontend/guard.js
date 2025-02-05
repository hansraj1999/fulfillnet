import { setCompany } from "./Utilities/company.util";

export const routeGuard = ({ params }) => {
  if (params.company_id) {
    setCompany(params.company_id);
  }
  return null;
};
