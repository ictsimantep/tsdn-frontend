import { useQuery } from "@tanstack/react-query";
import { IFilter } from "../../../interface/IFilter";
import { getHealth } from "../../../api/admin/health";

export const useHealthQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: ["health-data", filter],
    queryFn: () => getHealth(filter),
    enabled: !!filter,
  });
};
