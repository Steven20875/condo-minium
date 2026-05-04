import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link, useNavigate, Outlet } from "@tanstack/react-router";
import { X, Menu, LayoutDashboard, BarChart3, Building2, Users, CalendarCheck, ClipboardList, MessageSquare, Home, LogOut } from "lucide-react";
import { useState } from "react";
const residentLinks = [
  { to: "/dashboard", icon: Home, label: "Dashboard", exact: true },
  { to: "/units", icon: Building2, label: "Unit Listings", exact: false },
  { to: "/dashboard/bookings", icon: CalendarCheck, label: "My Bookings", exact: false },
  { to: "/dashboard/visitors", icon: Users, label: "Visitors", exact: false },
  { to: "/dashboard/messages", icon: MessageSquare, label: "Messages", exact: false }
];
const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview", exact: true },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics", exact: false },
  { to: "/admin/units", icon: Building2, label: "Units Management", exact: false },
  { to: "/admin/users", icon: Users, label: "Residents", exact: false },
  { to: "/admin/bookings", icon: CalendarCheck, label: "Bookings", exact: false },
  { to: "/admin/visits", icon: ClipboardList, label: "Visit Logs", exact: false },
  { to: "/admin/chat", icon: MessageSquare, label: "Chatbot", exact: false }
];
function Sidebar({ role, userName, userUnit, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const links = role === "admin" ? adminLinks : residentLinks;
  const isActive = (to, exact) => {
    if (exact) return currentPath === to;
    return currentPath === to || currentPath.startsWith(to + "/");
  };
  const NavContent = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "px-5 py-5 border-b", style: { borderColor: "rgba(255,255,255,0.08)" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0",
          style: { background: "#c9a84c", color: "#0f1e42" },
          children: "S"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-white font-semibold text-sm leading-tight", children: "ONE SPATIAL" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium", style: { color: "#c9a84c", letterSpacing: "0.08em" }, children: "ILOILO" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "px-5 pt-4 pb-2", children: /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-xs font-semibold px-2.5 py-1 rounded-full",
        style: role === "admin" ? { background: "rgba(201,168,76,0.15)", color: "#c9a84c" } : { background: "rgba(96,165,250,0.15)", color: "#93c5fd" },
        children: role === "admin" ? "Administrator" : "Resident Portal"
      }
    ) }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-2 space-y-0.5 overflow-y-auto", children: links.map(({ to, icon: Icon, label, exact }) => {
      const active = isActive(to, exact);
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to,
          onClick: () => setMobileOpen(false),
          className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium sidebar-link",
          style: active ? { background: "rgba(201,168,76,0.12)", color: "#c9a84c", borderLeft: "2px solid #c9a84c", paddingLeft: "10px" } : { color: "#8899bb", borderLeft: "2px solid transparent", paddingLeft: "10px" },
          children: [
            /* @__PURE__ */ jsx(Icon, { size: 17 }),
            /* @__PURE__ */ jsx("span", { children: label })
          ]
        },
        to
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-4 mt-auto", style: { borderColor: "rgba(255,255,255,0.08)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
            style: { background: "#c9a84c", color: "#0f1e42" },
            children: userName.charAt(0)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-white text-sm font-medium truncate", children: userName }),
          /* @__PURE__ */ jsx("div", { className: "text-xs truncate", style: { color: "#6b7a99" }, children: userUnit })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onLogout,
          className: "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
          style: { color: "#6b7a99" },
          onMouseEnter: (e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.background = "rgba(248,113,113,0.08)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.color = "#6b7a99";
            e.currentTarget.style.background = "transparent";
          },
          children: [
            /* @__PURE__ */ jsx(LogOut, { size: 15 }),
            /* @__PURE__ */ jsx("span", { children: "Sign Out" })
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: "hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-64 shadow-2xl",
        style: { background: "#0f1e42" },
        children: /* @__PURE__ */ jsx(NavContent, {})
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg",
        style: { background: "#0f1e42" },
        onClick: () => setMobileOpen(!mobileOpen),
        "aria-label": "Toggle navigation",
        children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
      }
    ),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden fixed inset-0 z-40 flex", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-64 h-full shadow-2xl", style: { background: "#0f1e42" }, children: /* @__PURE__ */ jsx("div", { className: "pt-16 h-full", children: /* @__PURE__ */ jsx(NavContent, {}) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex-1",
          style: { background: "rgba(0,0,0,0.5)" },
          onClick: () => setMobileOpen(false)
        }
      )
    ] })
  ] });
}
function AppLayout() {
  const navigate = useNavigate();
  let user = {
    name: "User",
    role: "resident",
    unit: "N/A"
  };
  if (typeof window !== "undefined") {
    const s = localStorage.getItem("cboms_user");
    if (s) user = JSON.parse(s);
  }
  const handleLogout = () => {
    localStorage.removeItem("cboms_user");
    localStorage.removeItem("token");
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", style: {
    background: "#eef1f8"
  }, children: [
    /* @__PURE__ */ jsx(Sidebar, { role: user.role, userName: user.name, userUnit: user.unit, onLogout: handleLogout }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 lg:ml-64 min-h-screen", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  AppLayout as component
};
