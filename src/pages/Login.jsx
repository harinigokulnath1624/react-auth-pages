import { Form, Formik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Checkbox from "../components/Checkbox";
import TextField from "../components/TextField";
import { getSession, login } from "../services/auth";
import { loginSchema } from "../validation/schemas";

export default function Login() {
  const navigate = useNavigate();
  if (getSession()) return <Navigate to="/welcome" replace />;

  const onSubmit = async (values, { setStatus, setSubmitting }) => {
    setStatus(null);
    try {
      await login(loginSchema.cast(values));
      navigate("/welcome");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue."
      footer={<>New here? <Link to="/signup">Create an account</Link></>}
    >
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            {status && (
              <div className="alert alert-danger py-2" role="alert">{status}</div>
            )}
            <TextField label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            <TextField label="Password" name="password" type="password" placeholder="Your password" autoComplete="current-password" />
            <Checkbox name="remember">Keep me signed in</Checkbox>
            <button type="submit" className="btn btn-dark w-100 submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (<><span className="spinner-border spinner-border-sm me-2" />Logging in…</>) : "Log in"}
            </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
