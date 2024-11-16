import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const EventValidationSchema = yup.object({
  title: yup.string().required("Title must be fill"),
  content: yup.string().required("Caption must be fill"),
  description: yup.string().required("Description must be fill"),
  image_url: yup.mixed().required("An image file is required"),
  status: yup.number().min(0).max(1),
  slug: yup.string().optional(),
  uuid: yup.string().optional(),
});

export const AdminEventResolver = yupResolver(EventValidationSchema);

export interface AdminEventValues
  extends yup.InferType<typeof EventValidationSchema> {}
