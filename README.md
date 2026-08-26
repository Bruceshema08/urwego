# Urwego Student Portal

## Deploy to Vercel for free

1. Push this repository to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Keep the detected framework as **Vite** and deploy.
3. In Vercel project settings, add these environment variables for **Production** and
   **Preview**:
   - `VITE_SUPABASE_URL` - your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` - your Supabase publishable/anon key
   - `SUPABASE_SECRET_KEY` - your Supabase secret key (server-only; never use it as a
     `VITE_` variable)
   - `FRONTEND_URL` - your Vercel URL, such as `https://urwego.vercel.app`
4. Redeploy after saving the variables. The frontend and `/api` admin endpoints are
   served by the same Vercel project.

The Supabase dashboard must also allow the deployed URL as an authentication redirect
URL. Add `https://urwego.vercel.app/**` under **Authentication -> URL Configuration**.

For local development, create a `.env` file with the same variables and run
`npm run dev`. The Express API can be run separately with `npm run server`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
