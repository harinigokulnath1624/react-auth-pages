import * as Yup from "yup";

const email = Yup.string()
  .trim()
  .lowercase()
  .email("Enter a valid email address")
  .required("Email is required");

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

export const signupSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or fewer")
    .matches(/^[A-Za-z][A-Za-z\s'.-]*$/, "Name can only contain letters and spaces")
    .required("Full name is required"),
  email,
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "Add a lowercase letter")
    .matches(/[A-Z]/, "Add an uppercase letter")
    .matches(/\d/, "Add a number")
    .matches(/[^A-Za-z0-9]/, "Add a special character (e.g. @ # !)")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms to continue"),
});
