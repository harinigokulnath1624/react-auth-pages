// Demo-only "backend": users and session live in localStorage.
// Never store plain-text passwords in a real app – use a server and hashing.
const USERS_KEY = "demo_users";
const SESSION_KEY = "demo_session";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export async function signup({ fullName, email, password }) {
  await delay(700);
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    const err = new Error("An account with this email already exists");
    err.field = "email";
    throw err;
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, { fullName, email, password }]));
}

export async function login({ email, password, remember }) {
  await delay(700);
  const user = readUsers().find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Incorrect email or password");
  const session = JSON.stringify({ fullName: user.fullName, email: user.email });
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, session);
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
