import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/auth";

export default function Welcome() {
  const navigate = useNavigate();
  const user = getSession();

  return (
    <div className="welcome">
      <div className="auth-card text-center">
        <i className="bi bi-check-circle-fill welcome-icon" />
        <h1 className="auth-title">Hi, {user.fullName.split(" ")[0]}!</h1>
        <p className="auth-subtitle mb-4">You are signed in as {user.email}.</p>
        <button
          type="button"
          className="btn btn-outline-dark px-4"
          onClick={() => { logout(); navigate("/login"); }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
