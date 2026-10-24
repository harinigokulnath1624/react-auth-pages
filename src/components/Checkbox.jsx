import { useField } from "formik";

export default function Checkbox({ children, ...props }) {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const invalid = meta.touched && !!meta.error;
  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          {...field}
          {...props}
          type="checkbox"
          id={props.name}
          className={`form-check-input ${invalid ? "is-invalid" : ""}`}
        />
        <label className="form-check-label" htmlFor={props.name}>{children}</label>
        {invalid && <div className="invalid-feedback d-block">{meta.error}</div>}
      </div>
    </div>
  );
}
