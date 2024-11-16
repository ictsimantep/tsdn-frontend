import { useQuery } from "@tanstack/react-query";
import { IFilter } from "../../../interface/IFilter";
import { getHealths } from "../../../api/admin/healths";

export const useHealthsQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: ["healths-data", filter],
    queryFn: () => getHealths(filter),
    enabled: !!filter,
  });
};
