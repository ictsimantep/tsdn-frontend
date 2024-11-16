import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import { createSettings } from "../../../../api/admin/settings";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const useCreateSettings = () => {
  const config = useConfig();

  return useMutation({
    mutationFn: createSettings,
    ...config,
  });
};

const useConfig = () => {
  const onSuccess = useCallback(
    (response: any) => {
      const SwalWithReactContent = withReactContent(Swal);

      SwalWithReactContent.fire({
        title: "Success",
        text: "Success Create Data",
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
          text: "Error Create Data",
          icon: "error",
        });
      } else {
        const SwalWithReactContent = withReactContent(Swal);

        SwalWithReactContent.fire({
          title: "Error from server",
          text: "Error Create Data",
          icon: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  return { onError, onSuccess };
};
