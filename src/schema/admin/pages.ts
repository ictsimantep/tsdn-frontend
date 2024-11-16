import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const pagesValidationSchema = yup.object({
  title: yup.string().required("Title must be fill"),
  subtitle: yup.string().required("SubTitle must be fill"),
  link: yup.string().required("Link must be fill"),
  image_url: yup.mixed().required("An image file is required"),
  active: yup.boolean().required("Active must be fill"),
});

export const AdminPagesResolver = yupResolver(pagesValidationSchema);

export interface AdminPagesValues
  extends yup.InferType<typeof pagesValidationSchema> {}
