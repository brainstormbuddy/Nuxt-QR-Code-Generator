import useRecords from "./api/useRecords";
import useCodes from "./api/useCodes";
import useLinkOrganizations from "./api/useLinkOrganizations";

export default function useApi() {
  return {
    ...useRecords(),
    ...useCodes(),
    ...useLinkOrganizations(),
  };
}
