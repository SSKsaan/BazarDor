# বাজার দর (BazarDor)

Daily essential-goods prices of Bangladesh in one Bangla website. Prices,
changes, and market-wise min/max come from a public API; the UI, auth, and
sorting are built with Next.js.

Live: https://bazardor-better.vercel.app/

## Features

- Home page with price risers, price fallers, and all 33 products in a
  responsive grid with sorting (low to high, high to low).
- Product detail page (sign-in required) with minimum, maximum, and average
  prices plus a market-wise price table across 6 divisions.
- Category pages with product cards, sorting, loading skeletons, and an
  empty state.
- Sign up / sign in with email and password, Google, and GitHub sign-in
  (Better Auth + MongoDB), with toast feedback for every auth action.
  Note: Google login may not work until the app's consent screen is
  published; GitHub login works.
- Sticky category navigator with active highlight, infinite price ticker,
  custom 404 page, and full Bangla UI with Bengali digits throughout.

## Technologies

Next.js (App Router), React, TypeScript, Tailwind CSS, DaisyUI,
Better Auth, MongoDB Atlas (mongodb driver), react-hot-toast, npm.

