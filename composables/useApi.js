import useRecords from "./api/useRecords";
import useCodes from "./api/useCodes";
import useLinkOrganizations from "./api/useLinkOrganizations";
import useProfile from "./api/useProfile";
import useOrganizations from "./api/useOrganizations";

export default function useApi() {
  return {
    ...useRecords(),
    ...useCodes(),
    ...useLinkOrganizations(),
    ...useProfile(),
    ...useOrganizations(),
  };
}
