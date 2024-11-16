import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const userValidationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(
      /^\+\d{10,15}$/,
      "Mobile number must start with + and contain 10 to 15 digits"
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),
  role_guard_name: yup
    .string()
    .required("Role is required")
    .oneOf(["admin", "user"], "Role must be either admin or user"),
  uuid: yup.string().optional(),
});

export const AdminUserResolver = yupResolver(userValidationSchema);

export interface AdminUserValues
  extends yup.InferType<typeof userValidationSchema> {}
