import useRecords from "./api/useRecords";
import useCodes from "./api/useCodes";
import useLinkOrganizations from "./api/useLinkOrganizations";
import useProfile from "./api/useProfile";

export default function useApi() {
  return {
    ...useRecords(),
    ...useCodes(),
    ...useLinkOrganizations(),
    ...useProfile(),
  };
}
