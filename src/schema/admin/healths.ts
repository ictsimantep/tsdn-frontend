import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const healthsValidationSchema = yup.object({
  key: yup.string().required("Key must be fill"),
  value: yup.string().required("Value must be fill"),
  uuid: yup.string(),
});

export const AdminHealthsResolver = yupResolver(healthsValidationSchema);

export interface AdminHealthsValues
  extends yup.InferType<typeof healthsValidationSchema> {}
