import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, User, Lock } from "lucide-react";
import { a as authAPI } from "./api-Ds5eIUY3.js";
function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.signup(email, password, name);
      if (response.user) {
        localStorage.setItem("cboms_user", JSON.stringify({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          unit: response.user.unit_id || "N/A"
        }));
        navigate({
          to: response.user.role === "admin" ? "/admin" : "/dashboard"
        });
      } else {
        navigate({
          to: "/"
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-7 sm:px-10 bg-[#0f1e42] text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl flex items-center justify-center bg-[#c9a84c] text-[#0f1e42]", children: /* @__PURE__ */ jsx(Building2, { size: 22 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "Register" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.24em] text-slate-100", children: "ONE SPATIAL ILOILO" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-slate-200", children: "Create your condominium management account to access bookings, residents, visitor logs, and support." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-8 sm:px-10", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2 text-slate-900", children: "Full Name" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 16 }),
            /* @__PURE__ */ jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Jane Doe", required: true, className: "w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2 text-slate-900", children: "Email" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 16 }),
            /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true, className: "w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2 text-slate-900", children: "Password" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 16 }),
            /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Create a secure password", required: true, className: "w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-900 outline-none transition" })
          ] })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "text-sm p-3 rounded-2xl bg-rose-50 text-rose-700 border border-rose-100", children: error }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-2xl py-3 text-sm font-semibold text-white transition", style: {
          background: loading ? "#6b7a99" : "#0f1e42"
        }, children: loading ? "Creating account…" : "Create account" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center text-sm text-slate-500", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => navigate({
          to: "/"
        }), className: "font-semibold text-slate-900", children: "Sign in" })
      ] })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
