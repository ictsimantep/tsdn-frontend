import { useQuery } from "@tanstack/react-query";
import { findHealths } from "../../../api/admin/healths";

export const useGetHealths = (id: string) =>
  useQuery({
    queryKey: ["get-healths-data", id],
    queryFn: () => findHealths(id),
    enabled: !!id,
  });
