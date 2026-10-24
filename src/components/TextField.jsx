import { useState } from "react";
import { useField } from "formik";

/** Formik-connected Bootstrap input. Pass type="password" to get a show/hide toggle. */
export default function TextField({ label, hint, type = "text", ...props }) {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const invalid = meta.touched && !!meta.error;
  const id = props.id || props.name;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group has-validation">
        <input
          {...field}
          {...props}
          id={id}
          type={isPassword && show ? "text" : type}
          className={`form-control ${invalid ? "is-invalid" : ""}`}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="btn btn-outline-secondary toggle-pw"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
          </button>
        )}
        {invalid && (
          <div id={`${id}-error`} className="invalid-feedback">{meta.error}</div>
        )}
      </div>
      {hint && !invalid && <div className="form-text">{hint}</div>}
    </div>
  );
}
