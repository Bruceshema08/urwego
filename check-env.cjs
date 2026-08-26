const dotenv = require("dotenv");

dotenv.config();

console.log({
  url: process.env.VITE_SUPABASE_URL || false,
  publishable: Boolean(process.env.VITE_SUPABASE_PUBLISHABLE_KEY),
  secret: Boolean(process.env.SUPABASE_SECRET_KEY),
});
