import * as yup from "yup";

export const validationSchema = yup.object().shape({
  identifier: yup.string().required("Required !"),
  password: yup.string().min(8, "To Short").required("Required !"),
});
