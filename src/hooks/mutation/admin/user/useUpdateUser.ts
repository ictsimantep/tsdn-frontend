import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import { updateUser } from "@/api/admin/user";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export const useUpdateUser = () => {
  const config = useConfig();

  return useMutation({
    mutationFn: updateUser,
    ...config,
  });
};

const useConfig = () => {
  const onSuccess = useCallback(
    (response: any) => {
      const SwalWithReactContent = withReactContent(Swal);

      SwalWithReactContent.fire({
        title: "Success",
        text: "Success Update User",
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
          text: "Error Update User",
          icon: "error",
        });
      } else {
        const SwalWithReactContent = withReactContent(Swal);

        SwalWithReactContent.fire({
          title: "Error from server",
          text: "Error Update User",
          icon: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return { onError, onSuccess };
};
