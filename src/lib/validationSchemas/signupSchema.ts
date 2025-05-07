import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(12, "Max 12 characters")
    .required("Required!"),
  gender: yup.string().required("Required!"),
  email: yup.string().email("Invalid email").required("Required!"),
  password: yup.string().min(8, "Too short").required("Required!"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required!"),
  avatar: yup.string().required("Required!"),
  role: yup.string().required("Required!"),
});
