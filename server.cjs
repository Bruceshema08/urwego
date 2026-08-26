const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const {
  VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY,
  FRONTEND_URL,
} = process.env;

if (!VITE_SUPABASE_URL) {
  throw new Error("Missing VITE_SUPABASE_URL in .env");
}

if (!VITE_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing VITE_SUPABASE_PUBLISHABLE_KEY in .env"
  );
}

if (!SUPABASE_SECRET_KEY) {
  throw new Error("Missing SUPABASE_SECRET_KEY in .env");
}

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

const supabasePublic = createClient(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_PUBLISHABLE_KEY
);

const supabaseAdmin = createClient(
  VITE_SUPABASE_URL,
  SUPABASE_SECRET_KEY
);

async function requireAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: "Authorization token is required.",
      });
    }

    const token = authorization.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabasePublic.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({
        error: "Invalid or expired session.",
      });
    }

    const { data: admin, error: adminError } = await supabaseAdmin
      .from("admins")
      .select("id, email")
      .eq("id", user.id)
      .maybeSingle();

    if (adminError || !admin) {
      return res.status(403).json({
        error: "Administrator access required.",
      });
    }

    req.admin = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Urwego server is running.",
  });
});

app.get("/api/admin/users", requireAdmin, async (req, res) => {
  const { data, error } =
    await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || "",
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at,
    confirmed_at: user.confirmed_at,
  }));

  res.json({
    users,
  });
});

app.get("/api/admin/activity", requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.json({
    logs: data || [],
  });
});

app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
  const userId = req.params.id;

  if (userId === req.admin.id) {
    return res.status(400).json({
      error: "You cannot delete your own admin account.",
    });
  }

  const { data: targetUser, error: targetError } =
    await supabaseAdmin.auth.admin.getUserById(userId);

  if (targetError || !targetUser?.user) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  const { error: deleteError } =
    await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    return res.status(500).json({
      error: deleteError.message,
    });
  }

  await supabaseAdmin.from("activity_logs").insert({
    user_id: req.admin.id,
    user_email: req.admin.email,
    action: "admin_deleted_user",
    details: `Deleted user ${targetUser.user.email}`,
  });

  res.json({
    message: "User deleted successfully.",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Urwego server running on port ${port}`);
});