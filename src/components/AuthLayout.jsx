export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-shell">
      <aside className="auth-side" aria-hidden="true">
        {/* <div className="brand">
          <i className="bi bi-compass" /> Waypoint
        </div> */}
        {/* <div>
          <h2 className="side-title">Pick up where you left off.</h2>
          <p className="side-text">Your saved routes, notes and photos are one sign-in away.</p>
        </div> */}
        <svg
          viewBox="0 0 400 160"
          className="side-art"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 110 L70 60 L130 95 L210 30 L290 90 L350 55 L400 85 L400 160 L0 160Z"
            fill="#1c4745"
          />
          <path
            d="M0 140 L90 100 L180 135 L260 105 L340 138 L400 115 L400 160 L0 160Z"
            fill="#0b2423"
          />
        </svg>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </main>
    </div>
  );
}
