import { useQuery } from "@tanstack/react-query";
import { findHealth } from "../../../api/admin/health";

export const useGetHealth = (id: string) =>
  useQuery({
    queryKey: ["get-health-data", id],
    queryFn: () => findHealth(id),
    enabled: !!id,
  });
