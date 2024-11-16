import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import { updateHealth } from "@/api/admin/health";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export const useUpdateHealth = () => {
  const config = useConfig();

  return useMutation({
    mutationFn: updateHealth,
    ...config,
  });
};

const useConfig = () => {
  const onSuccess = useCallback(
    (response: any) => {
      const SwalWithReactContent = withReactContent(Swal);

      SwalWithReactContent.fire({
        title: "Success",
        text: "Success Update Health",
        icon: "success",
      });
    },
    [] // Dependency array for useCallback
  );
  const onError = useCallback(
    (error: any) => {
      if (error.response) {
        const SwalWithReactContent = withReactContent(Swal);

        SwalWithReactContent.fire({
          title: "Error from server",
          text: "Error Update Health",
          icon: "error",
        });
      } else {
        const SwalWithReactContent = withReactContent(Swal);

        SwalWithReactContent.fire({
          title: "Error from server",
          text: "Error Update Health",
          icon: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return { onError, onSuccess };
};
