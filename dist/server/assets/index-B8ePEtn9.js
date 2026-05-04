import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, CheckCircle2, User, Shield, Lock, ChevronRight } from "lucide-react";
import { a as authAPI } from "./api-Ds5eIUY3.js";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("cboms_user", JSON.stringify({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        unit: response.user.unit_id || "N/A"
      }));
      if (response.user.role === "admin") {
        navigate({
          to: "/admin"
        });
      } else {
        navigate({
          to: "/dashboard"
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };
  const quickLogin = (role) => {
    if (role === "admin") {
      setEmail("admin@condo.com");
      setPassword("admin123");
    } else {
      setEmail("resident@condo.com");
      setPassword("resident123");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex lg:w-[58%] relative overflow-hidden flex-col justify-between p-12", style: {
      background: "linear-gradient(135deg, #0a1428 0%, #0f1e42 50%, #122254 100%)"
    }, children: [
      /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full", style: {
        opacity: 0.04
      }, xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: "grid", width: "48", height: "48", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx("path", { d: "M 48 0 L 0 0 0 48", fill: "none", stroke: "white", strokeWidth: "1" }) }) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute rounded-full blur-3xl", style: {
        width: 400,
        height: 400,
        top: "30%",
        right: "5%",
        background: "rgba(201,168,76,0.06)"
      } }),
      /* @__PURE__ */ jsx("div", { className: "absolute rounded-full blur-3xl", style: {
        width: 300,
        height: 300,
        bottom: "10%",
        left: "5%",
        background: "rgba(59,130,246,0.05)"
      } }),
      /* @__PURE__ */ jsxs("svg", { className: "absolute bottom-0 left-0 right-0 w-full", viewBox: "0 0 900 340", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMax slice", style: {
        opacity: 1
      }, children: [
        /* @__PURE__ */ jsx("rect", { x: "30", y: "200", width: "70", height: "140", fill: "rgba(255,255,255,0.025)" }),
        /* @__PURE__ */ jsx("rect", { x: "110", y: "155", width: "85", height: "185", fill: "rgba(255,255,255,0.035)" }),
        /* @__PURE__ */ jsx("rect", { x: "205", y: "100", width: "100", height: "240", fill: "rgba(255,255,255,0.03)" }),
        /* @__PURE__ */ jsx("rect", { x: "315", y: "55", width: "80", height: "285", fill: "rgba(255,255,255,0.045)" }),
        /* @__PURE__ */ jsx("rect", { x: "405", y: "30", width: "110", height: "310", fill: "rgba(255,255,255,0.04)" }),
        /* @__PURE__ */ jsx("rect", { x: "525", y: "85", width: "95", height: "255", fill: "rgba(255,255,255,0.03)" }),
        /* @__PURE__ */ jsx("rect", { x: "630", y: "130", width: "90", height: "210", fill: "rgba(255,255,255,0.035)" }),
        /* @__PURE__ */ jsx("rect", { x: "730", y: "175", width: "75", height: "165", fill: "rgba(255,255,255,0.025)" }),
        /* @__PURE__ */ jsx("rect", { x: "815", y: "210", width: "65", height: "130", fill: "rgba(255,255,255,0.02)" }),
        Array.from({
          length: 7
        }).map((_, row) => Array.from({
          length: 3
        }).map((_2, col) => /* @__PURE__ */ jsx("rect", { x: 420 + col * 32, y: 48 + row * 38, width: 14, height: 20, rx: 2, fill: Math.random() > 0.4 ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.08)" }, `w${row}${col}`))),
        Array.from({
          length: 5
        }).map((_, row) => Array.from({
          length: 2
        }).map((_2, col) => /* @__PURE__ */ jsx("rect", { x: 325 + col * 34, y: 72 + row * 42, width: 13, height: 18, rx: 2, fill: Math.random() > 0.5 ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.07)" }, `w2${row}${col}`)))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-14", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: {
            background: "#c9a84c"
          }, children: /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5", style: {
            color: "#0f1e42"
          } }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-base leading-tight", children: "ONE SPATIAL ILOILO" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold tracking-widest", style: {
              color: "#c9a84c",
              letterSpacing: "0.1em"
            }, children: "CONDOMINIUM MANAGEMENT" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl xl:text-6xl text-white mb-5 leading-tight", style: {
          fontFamily: "'DM Serif Display', serif"
        }, children: [
          "Your home,",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#c9a84c"
          }, children: "managed" }),
          " ",
          "with care."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg max-w-md leading-relaxed", style: {
          color: "#7a8fb5"
        }, children: "The complete platform for condominium living — book facilities, track visitors, manage dues, and stay connected with your community." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-3", children: ["Facility booking in seconds", "Real-time visitor tracking", "Transparent billing & dues"].map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { size: 16, style: {
            color: "#c9a84c",
            flexShrink: 0
          } }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", style: {
            color: "#8899bb"
          }, children: f })
        ] }, f)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 grid grid-cols-3 gap-4", children: [{
        value: "120",
        label: "Residents"
      }, {
        value: "88%",
        label: "Occupancy Rate"
      }, {
        value: "12",
        label: "Amenities"
      }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl p-4", style: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(4px)"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#c9a84c"
        }, children: stat.value }),
        /* @__PURE__ */ jsx("div", { className: "text-sm mt-1", style: {
          color: "#7a8fb5"
        }, children: stat.label })
      ] }, stat.label)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-8 bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: {
          background: "#0f1e42"
        }, children: /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", style: {
          color: "#0f1e42"
        }, children: "ONE SPATIAL ILOILO" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl mb-1.5", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Welcome back" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mb-8", style: {
          color: "#6b7a99"
        }, children: "Sign in to your resident portal" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => quickLogin("resident"), className: "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all", style: {
            border: "2px solid #dde3ef",
            color: "#1a2040"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "#0f1e42";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "#dde3ef";
          }, children: [
            /* @__PURE__ */ jsx(User, { size: 15, style: {
              color: "#3b82f6"
            } }),
            "Resident Demo"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => quickLogin("admin"), className: "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all", style: {
            border: "2px solid #dde3ef",
            color: "#1a2040"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "#c9a84c";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "#dde3ef";
          }, children: [
            /* @__PURE__ */ jsx(Shield, { size: 15, style: {
              color: "#c9a84c"
            } }),
            "Admin Demo"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px", style: {
            background: "#e5eaf3"
          } }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: {
            color: "#9aa3b8"
          }, children: "or enter manually" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px", style: {
            background: "#e5eaf3"
          } })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1.5", style: {
              color: "#1a2040"
            }, children: "Email" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(User, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2", style: {
                color: "#9aa3b8"
              } }),
              /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter email", required: true, className: "w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all", style: {
                border: "1.5px solid #dde3ef",
                color: "#1a2040",
                background: "#fff"
              }, onFocus: (e) => {
                e.target.style.borderColor = "#0f1e42";
                e.target.style.boxShadow = "0 0 0 3px rgba(15,30,66,0.06)";
              }, onBlur: (e) => {
                e.target.style.borderColor = "#dde3ef";
                e.target.style.boxShadow = "none";
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1.5", style: {
              color: "#1a2040"
            }, children: "Password" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2", style: {
                color: "#9aa3b8"
              } }),
              /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter password", required: true, className: "w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all", style: {
                border: "1.5px solid #dde3ef",
                color: "#1a2040",
                background: "#fff"
              }, onFocus: (e) => {
                e.target.style.borderColor = "#0f1e42";
                e.target.style.boxShadow = "0 0 0 3px rgba(15,30,66,0.06)";
              }, onBlur: (e) => {
                e.target.style.borderColor = "#dde3ef";
                e.target.style.boxShadow = "none";
              } })
            ] })
          ] }),
          error && /* @__PURE__ */ jsx("div", { className: "text-sm p-3 rounded-xl", style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca"
          }, children: error }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all", style: {
            background: loading ? "#6b7a99" : "#0f1e42"
          }, children: loading ? /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Sign In ",
            /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => navigate({
          to: "/register"
        }), className: "text-sm font-semibold", style: {
          color: "#0f1e42"
        }, children: "Create an account" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-xs mt-6", style: {
          color: "#9aa3b8"
        }, children: [
          "Demo accounts:",
          " ",
          /* @__PURE__ */ jsx("code", { className: "px-1.5 py-0.5 rounded text-xs", style: {
            background: "#f1f5f9",
            color: "#1a2040"
          }, children: "admin@condo.com / admin123" }),
          " ",
          "or",
          " ",
          /* @__PURE__ */ jsx("code", { className: "px-1.5 py-0.5 rounded text-xs", style: {
            background: "#f1f5f9",
            color: "#1a2040"
          }, children: "resident@condo.com / resident123" })
        ] })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
