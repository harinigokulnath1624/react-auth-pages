import { Form, Formik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Checkbox from "../components/Checkbox";
import TextField from "../components/TextField";
import { getSession, signup } from "../services/auth";
import { signupSchema } from "../validation/schemas";

export default function Signup() {
  const navigate = useNavigate();
  if (getSession()) return <Navigate to="/welcome" replace />;

  const onSubmit = async (
    values,
    { setFieldError, setStatus, setSubmitting },
  ) => {
    setStatus(null);
    try {
      const clean = signupSchema.cast(values);
      await signup({
        fullName: clean.fullName,
        email: clean.email,
        password: clean.password,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      if (err.field) setFieldError(err.field, err.message);
      else setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already registered? <Link to="/login">Log in</Link>
        </>
      }
    >
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            {status && (
              <div className="alert alert-danger py-2" role="alert">
                {status}
              </div>
            )}
            <TextField
              label="Full name"
              name="fullName"
              placeholder="Your Name"
              autoComplete="name"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              hint="8+ characters with upper, lower, number and a symbol."
            />
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
            />
            <Checkbox name="terms">
              I agree to the terms and privacy policy
            </Checkbox>
            <button
              type="submit"
              className="btn btn-dark w-100 submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Creating account…
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
