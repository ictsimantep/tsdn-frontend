import { useQuery } from "@tanstack/react-query";
import { IFilter } from "../../../interface/IFilter";
import { getEvent } from "../../../api/admin/event";

export const useEventQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: ["event-data", filter],
    queryFn: () => getEvent(filter),
    enabled: !!filter,
  });
};
