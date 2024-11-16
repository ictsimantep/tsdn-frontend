import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const healthValidationSchema = yup.object({
  nama: yup.string().required("Name must be fill"),
  jenis_kelamin: yup.string().required("Gender must be fill"),
  umur: yup.string().required("Age must be fill"),
  bb: yup.string().required("Weight must be fill"),
  tb: yup.string().required("Height must be fill"),
  systol: yup.string().required("Systol must be fill"),
  diastol: yup.string().required("Diastol must be fill"),
  heart_rate: yup.string().required("Heart Rate must be fill"),
  profesi: yup.string().required("Profession must be fill"),
  uuid: yup.string(),
});

export const AdminHealthResolver = yupResolver(healthValidationSchema);

export interface AdminHealthValues
  extends yup.InferType<typeof healthValidationSchema> {}
