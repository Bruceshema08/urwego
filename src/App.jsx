import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import {
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute left-[12%] top-[20%] h-5 w-5 animate-pulse rounded-full bg-teal-300 shadow-[0_0_35px_12px_rgba(45,212,191,0.25)]" />
      <div className="absolute right-[18%] top-[25%] h-3 w-3 animate-bounce rounded-full bg-indigo-300" />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <img
        src="/favicon.svg"
        alt="Urwego logo"
        className="h-12 w-12 object-contain"
      />

      <span className="text-xl font-black tracking-[0.2em] text-white">
        URWEGO
      </span>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="rounded-xl bg-teal-400/10 p-3 text-teal-300">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{text}</p>
      </div>
    </div>
  );
}

async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}

function Landing({ onLogin, onRegister }) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setErrorMessage("");

    try {
      await loginWithGoogle();
    } catch (error) {
      setErrorMessage(error.message);
      setGoogleLoading(false);
    }
  }

  return (
    <main className="relative z-10 min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex justify-center">
          <Logo />
        </header>

        <div className="grid min-h-[calc(100vh-130px)] items-center gap-12 py-16 md:grid-cols-2">
          <section>
            <div className="mb-6 inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-200">
              Your academic journey, organized
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-tight text-white md:text-7xl">
              Move forward with{" "}
              <span className="bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
                confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Urwego gives students one simple place for documents,
              communication, and academic information.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={onRegister}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-6 py-3 font-bold text-white transition hover:scale-105 hover:opacity-90"
              >
                Create account
                <UserPlus size={18} />
              </button>

              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Login
                <LogIn size={18} />
              </button>

              <button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-6 py-3 font-bold text-slate-800 transition hover:bg-slate-100 disabled:opacity-50"
              >
                <span className="text-lg font-black text-blue-600">G</span>
                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Welcome to</p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Student workspace
                </h2>
              </div>

              <GraduationCap className="text-teal-300" size={34} />
            </div>

            <div className="space-y-4">
              <Feature
                icon={<FileText size={20} />}
                title="Documents"
                text="Access your academic files"
              />

              <Feature
                icon={<MessageCircle size={20} />}
                title="Student chat"
                text="Stay connected and informed"
              />

              <Feature
                icon={<BookOpen size={20} />}
                title="Academic progress"
                text="Keep your goals in view"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleGoogleLogin() {
    setLoading(true);
    setErrorMessage("");

    try {
      await loginWithGoogle();
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-lg font-black text-blue-600">G</span>
        {loading ? "Connecting..." : "Continue with Google"}
      </button>

      {errorMessage && (
        <p className="mt-3 text-center text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </>
  );
}

function Auth({
  type,
  onBack,
  onGoToLogin,
  onGoToRegister,
}) {
  const isRegister = type === "register";
  const isForgotPassword = type === "forgot";
  const isResetPassword = type === "reset";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function submit(event) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (isForgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/?reset=true`,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage(
          "Password reset email sent. Check your inbox."
        );
      }

      setLoading(false);
      return;
    }

    if (isResetPassword) {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage(
          "Password updated. You can now sign in."
        );
      }

      setLoading(false);
      return;
    }

    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("activity_logs").insert({
          user_id: data.user.id,
          user_email: data.user.email,
          action: "registration",
          details: `New account created for ${name}`,
        });
      }

      if (!data.session) {
        setSuccessMessage(
          "Account created. Check your email, confirm it, then sign in."
        );
      }

      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("activity_logs").insert({
        user_id: data.user.id,
        user_email: data.user.email,
        action: "login",
        details: "User logged in with email and password",
      });
    }

    setLoading(false);
  }

  const title = isForgotPassword
    ? "Recover your password"
    : isResetPassword
      ? "Create a new password"
      : isRegister
        ? "Create your account"
        : "Welcome back";

  const description = isForgotPassword
    ? "Enter your email and we will send you a reset link."
    : isResetPassword
      ? "Choose a new password for your account."
      : isRegister
        ? "Create your Urwego student account."
        : "Sign in to continue to Urwego.";

  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
        <Logo />

        <h1 className="mt-10 text-3xl font-black text-white">{title}</h1>

        <p className="mt-2 text-slate-400">{description}</p>

        {errorMessage && (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-xl border border-teal-400/20 bg-teal-400/10 p-3 text-sm text-teal-200">
            {successMessage}
          </div>
        )}

        {(isRegister || (!isForgotPassword && !isResetPassword)) && (
          <div className="mt-8">
            <GoogleButton />

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs uppercase tracking-widest text-slate-500">
                or
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          {isRegister && (
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                Full name
              </span>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your full name"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-teal-400"
              />
            </label>
          )}

          {!isResetPassword && (
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                Email address
              </span>

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-teal-400"
              />
            </label>
          )}

          {!isForgotPassword && (
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">
                {isResetPassword ? "New password" : "Password"}
              </span>

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                minLength={6}
                placeholder="At least 6 characters"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-teal-400"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isForgotPassword
                ? "Send reset email"
                : isResetPassword
                  ? "Update password"
                  : isRegister
                    ? "Create account"
                    : "Login"}
          </button>
        </form>

        {!isForgotPassword && !isResetPassword && (
          <button
            onClick={isRegister ? onGoToLogin : onGoToRegister}
            className="mt-6 w-full text-center text-sm text-slate-400 hover:text-white"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Create one"}
          </button>
        )}

        {!isForgotPassword && !isResetPassword && !isRegister && (
          <button
            onClick={() => {
              window.history.pushState({}, "", "/?forgot=true");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="mt-4 w-full text-center text-sm text-teal-300 hover:text-teal-200"
          >
            Forgot your password?
          </button>
        )}

        <button
          onClick={onBack}
          className="mt-7 w-full text-center text-sm text-teal-300 hover:text-teal-200"
        >
          ← Back to home
        </button>
      </section>
    </main>
  );
}

function Sidebar({
  page,
  setPage,
  onLogout,
  onAdmin,
}) {
  const links = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
    },
    {
      id: "chat",
      label: "Student Chat",
      icon: MessageCircle,
    },
  ];

  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
        <Logo />

        <nav className="mt-10 space-y-2">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                page === id
                  ? "bg-teal-400/15 text-teal-200"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={onAdmin}
          className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-indigo-400/10 hover:text-indigo-300"
        >
          <ShieldCheck size={19} />
          Admin dashboard
        </button>

        <button
          onClick={onLogout}
          className="mt-5 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"
        >
          <LogOut size={19} />
          Log out
        </button>
      </div>
    </aside>
  );
}

function DashboardHome({ user }) {
  return (
    <>
      <p className="text-sm text-teal-300">Student workspace</p>

      <h1 className="mt-2 text-4xl font-black text-white">
        Hello, {user} 👋
      </h1>

      <p className="mt-3 text-slate-400">
        Here is an overview of your academic activity.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <Stat icon={<FileText />} title="Documents" value="0" />
        <Stat icon={<MessageCircle />} title="Messages" value="0" />
        <Stat icon={<BookOpen />} title="Courses" value="0" />
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-8 text-center">
        <GraduationCap className="mx-auto text-teal-300" size={38} />

        <h2 className="mt-4 text-xl font-bold text-white">
          Your journey starts here
        </h2>

        <p className="mx-auto mt-2 max-w-md text-slate-400">
          Upload documents, communicate with other students, and manage your
          academic progress from one place.
        </p>
      </div>
    </>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
      <div className="flex items-center justify-between text-teal-300">
        {icon}
        <span className="text-3xl font-black text-white">{value}</span>
      </div>

      <p className="mt-5 text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Documents() {
  return (
    <>
      <FileText className="text-teal-300" size={36} />

      <h1 className="mt-5 text-3xl font-black text-white">Documents</h1>

      <p className="mt-2 text-slate-400">
        Your academic documents will appear here.
      </p>

      <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-bold text-white transition hover:bg-teal-400">
        <Upload size={18} />
        Upload document
      </button>
    </>
  );
}

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        text: message,
      },
    ]);

    setMessage("");
  }

  return (
    <div className="flex min-h-[calc(100vh-110px)] flex-col">
      <MessageCircle className="text-teal-300" size={36} />

      <h1 className="mt-5 text-3xl font-black text-white">
        Student Chat
      </h1>

      <p className="mt-2 text-slate-400">
        Connect and communicate with other students.
      </p>

      <div className="mt-8 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-black/10 p-5">
        {messages.length === 0 ? (
          <div className="flex h-full min-h-60 items-center justify-center text-center text-slate-500">
            No messages yet. Start the conversation.
          </div>
        ) : (
          messages.map((item) => (
            <div key={item.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-3 text-white">
                {item.text}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-5 flex gap-3">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a message..."
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-teal-400"
        />

        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 px-5 py-3 font-bold text-white hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function AdminDashboard({ session, onBack, onLogout }) {
  const [tab, setTab] = useState("activity");
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadActivity();
    loadUsers();
  }, []);

  async function getToken() {
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    return currentSession?.access_token || session?.access_token;
  }

  async function loadActivity() {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_BASE_URL}/api/admin/activity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load activity.");
      }

      setLogs(result.logs || []);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  }

  async function loadUsers() {
    try {
      const token = await getToken();

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load users.");
      }

      setUsers(result.users || []);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function deleteUser(userId, email) {
    const confirmed = window.confirm(
      `Delete ${email}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_BASE_URL}/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete user.");
      }

      setSuccessMessage("User deleted successfully.");
      await loadUsers();
      await loadActivity();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="relative z-10 min-h-screen px-5 py-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl md:p-9">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-teal-300">
                Administrator area
              </p>

              <h1 className="mt-2 text-4xl font-black text-white">
                Website management
              </h1>

              <p className="mt-3 text-slate-400">
                Monitor logins, users, and website activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBack}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
              >
                Main dashboard
              </button>

              <button
                onClick={onLogout}
                className="rounded-xl bg-red-500/80 px-4 py-3 font-semibold text-white hover:bg-red-500"
              >
                Log out
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-3 border-b border-white/10 pb-4">
            <button
              onClick={() => setTab("activity")}
              className={`rounded-xl px-4 py-3 font-semibold ${
                tab === "activity"
                  ? "bg-teal-400/15 text-teal-200"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Activity
            </button>

            <button
              onClick={() => setTab("users")}
              className={`rounded-xl px-4 py-3 font-semibold ${
                tab === "users"
                  ? "bg-teal-400/15 text-teal-200"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Users size={17} />
                Users
              </span>
            </button>
          </div>

          {successMessage && (
            <div className="mt-8 rounded-xl border border-teal-400/20 bg-teal-400/10 p-4 text-teal-200">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-8 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-200">
              {errorMessage}
            </div>
          )}

          {tab === "users" ? (
            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
              <div className="flex items-center justify-between p-5">
                <h2 className="text-2xl font-bold text-white">
                  Registered users
                </h2>

                <button
                  onClick={loadUsers}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <p className="p-5 text-slate-400">Loading users...</p>
              ) : (
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-black/20 text-sm text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Name</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Created</th>
                      <th className="px-5 py-4">Last login</th>
                      <th className="px-5 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-white/10 text-sm text-slate-300"
                      >
                        <td className="px-5 py-4">
                          {item.name || "-"}
                        </td>

                        <td className="px-5 py-4">{item.email}</td>

                        <td className="px-5 py-4 text-slate-500">
                          {new Date(item.created_at).toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {item.last_sign_in_at
                            ? new Date(
                                item.last_sign_in_at
                              ).toLocaleString()
                            : "Never"}
                        </td>

                        <td className="px-5 py-4">
                          {item.id === session?.user?.id ? (
                            <span className="text-xs text-teal-300">
                              Current admin
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                deleteUser(item.id, item.email)
                              }
                              className="rounded-lg bg-red-500/80 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
              <div className="flex items-center justify-between p-5">
                <h2 className="text-2xl font-bold text-white">
                  Website activity
                </h2>

                <button
                  onClick={loadActivity}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <p className="p-5 text-slate-400">
                  Loading activity...
                </p>
              ) : (
                <table className="w-full min-w-[750px] text-left">
                  <thead className="bg-black/20 text-sm text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Action</th>
                      <th className="px-5 py-4">User email</th>
                      <th className="px-5 py-4">Details</th>
                      <th className="px-5 py-4">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {logs.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-5 py-10 text-center text-slate-500"
                        >
                          No activity recorded yet.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr
                          key={log.id}
                          className="border-t border-white/10 text-sm text-slate-300"
                        >
                          <td className="px-5 py-4">
                            <span className="rounded-full bg-teal-400/10 px-3 py-1 text-teal-300">
                              {log.action}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            {log.user_email || "-"}
                          </td>

                          <td className="px-5 py-4">
                            {log.details || "-"}
                          </td>

                          <td className="px-5 py-4 text-slate-500">
                            {new Date(
                              log.created_at
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Dashboard({ user, session, onLogout, onAdmin }) {
  const [page, setPage] = useState("dashboard");

  return (
    <main className="relative z-10 min-h-screen px-5 py-5 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row">
        <Sidebar
          page={page}
          setPage={setPage}
          onLogout={onLogout}
          onAdmin={onAdmin}
        />

        <section className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-40px)] rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl md:p-9">
            {page === "dashboard" && <DashboardHome user={user} />}
            {page === "documents" && <Documents />}
            {page === "chat" && <Chat />}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [screen, setScreen] = useState("landing");
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("forgot") === "true") {
      setScreen("forgot");
    }

    if (params.get("reset") === "true") {
      setScreen("reset");
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
    setSession(null);
    setAdminMode(false);
    setScreen("landing");
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b18] text-teal-300">
        Loading Urwego...
      </div>
    );
  }

  const username =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <div className="min-h-screen bg-[#070b18]">
      <AnimatedBackground />

      {user ? (
        adminMode ? (
          <AdminDashboard
            session={session}
            onBack={() => setAdminMode(false)}
            onLogout={logout}
          />
        ) : (
          <Dashboard
            user={username}
            session={session}
            onLogout={logout}
            onAdmin={() => setAdminMode(true)}
          />
        )
      ) : (
        <>
          {screen === "landing" && (
            <Landing
              onLogin={() => setScreen("login")}
              onRegister={() => setScreen("register")}
            />
          )}

          {screen === "login" && (
            <Auth
              type="login"
              onBack={() => setScreen("landing")}
              onGoToLogin={() => setScreen("login")}
              onGoToRegister={() => setScreen("register")}
            />
          )}

          {screen === "register" && (
            <Auth
              type="register"
              onBack={() => setScreen("landing")}
              onGoToLogin={() => setScreen("login")}
              onGoToRegister={() => setScreen("register")}
            />
          )}

          {screen === "forgot" && (
            <Auth
              type="forgot"
              onBack={() => setScreen("login")}
              onGoToLogin={() => setScreen("login")}
              onGoToRegister={() => setScreen("register")}
            />
          )}

          {screen === "reset" && (
            <Auth
              type="reset"
              onBack={() => setScreen("login")}
              onGoToLogin={() => setScreen("login")}
              onGoToRegister={() => setScreen("register")}
            />
          )}
        </>
      )}
    </div>
  );
}