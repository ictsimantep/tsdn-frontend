import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const healthValidationSchema = yup.object({
  key: yup.string().required("Key must be fill"),
  value: yup.string().required("Value must be fill"),
  uuid: yup.string(),
});

export const AdminHealthResolver = yupResolver(healthValidationSchema);

export interface AdminHealthValues
  extends yup.InferType<typeof healthValidationSchema> {}
