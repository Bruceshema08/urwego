import { supabase } from "./supabase";

export async function logActivity(action, details = "") {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase.from("activity_logs").insert({
    user_id: user.id,
    user_email: user.email,
    action,
    details,
  });

  if (error) {
    console.error("Activity log error:", error.message);
  }
}