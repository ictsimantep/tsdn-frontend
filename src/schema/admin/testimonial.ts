import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const testimonialValidationSchema = yup.object({
  title: yup.string().required("Title must be fill"),
  subtitle: yup.string().required("SubTitle must be fill"),
  link: yup.string().required("Link must be fill"),
  image_url: yup.mixed().required("An image file is required"),
  active: yup.boolean().required("Active must be fill"),
});

export const AdminTestimonialResolver = yupResolver(testimonialValidationSchema);

export interface AdminTestimonialValues
  extends yup.InferType<typeof testimonialValidationSchema> {}
