import useRecords from "./api/useRecords";

export default function useApi() {
  return {
    ...useRecords(),
  };
}
