import useRecords from "./api/useRecords";
import useCodes from "./api/useCodes";

export default function useApi() {
  return {
    ...useRecords(),
    ...useCodes(),
  };
}
