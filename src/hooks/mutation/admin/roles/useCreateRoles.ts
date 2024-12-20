import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { createRoles } from "../../../../api/admin/roles";
export const useCreateRoles = () => {
  const config = useConfig();

  return useMutation({
    mutationFn: createRoles,
    ...config,
  });
};

const useConfig = () => {
  const onSuccess = useCallback(
    (response: any) => {
      const SwalWithReactContent = withReactContent(Swal);

      SwalWithReactContent.fire({
        title: "Success",
        text: "Success Update Role",
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
          text: "Error Update Role",
          icon: "error",
        });
      } else {
        const SwalWithReactContent = withReactContent(Swal);

        SwalWithReactContent.fire({
          title: "Error from server",
          text: "Error Update Role",
          icon: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return { onError, onSuccess };
};
