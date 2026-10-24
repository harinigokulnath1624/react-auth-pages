# React Auth Pages – Day 11

Login and Sign up pages built with **React (Vite)**, **Formik**, **Yup** and **Bootstrap 5**.

## Run it
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Routes
- `/signup` – create an account
- `/login` – log in
- `/welcome` – protected page (redirects to login when signed out)

## Validation (Yup – `src/validation/schemas.js`)
**Sign up:** full name (letters, 2–50 chars), valid email, strong password
(8+ chars, upper, lower, number, symbol), matching confirm password, terms accepted.
**Login:** valid email and password required.

## How it works
- Formik handles form state, touched/error tracking and submit status.
- `TextField` and `Checkbox` are reusable Formik + Bootstrap inputs.
- `src/services/auth.js` is a fake backend using `localStorage` – for learning only.
  A real app must use a server and hash passwords.

## Try it
1. Sign up with a new email, then log in with it.
2. Sign up with the same email again to see the "already exists" error.
3. Type a wrong password to see the login error.
