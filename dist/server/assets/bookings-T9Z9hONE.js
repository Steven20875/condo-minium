import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { CheckCheck, XCircle, Clock, CheckCircle, CalendarCheck } from "lucide-react";
import { a as mockBookings } from "./mockData-DU8hdjTT.js";
const statusStyle = {
  confirmed: {
    bg: "#ecfdf5",
    color: "#059669",
    label: "Confirmed",
    icon: CheckCircle
  },
  pending: {
    bg: "#fffbeb",
    color: "#d97706",
    label: "Pending",
    icon: Clock
  },
  cancelled: {
    bg: "#fef2f2",
    color: "#dc2626",
    label: "Cancelled",
    icon: XCircle
  },
  completed: {
    bg: "#eff6ff",
    color: "#0284c7",
    label: "Completed",
    icon: CheckCheck
  }
};
function MyBookingsPage() {
  const [filter, setFilter] = useState("All");
  const myBookings = mockBookings.filter((b) => b.resident === "Maria Santos");
  const filtered = filter === "All" ? myBookings : myBookings.filter((b) => b.status === filter.toLowerCase());
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 fade-in", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "My Bookings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#6b7a99"
      }, children: "All your facility reservations" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-6 flex-wrap", children: ["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: "px-4 py-2 rounded-xl text-xs font-semibold transition-all", style: filter === f ? {
      background: "#0f1e42",
      color: "#fff"
    } : {
      background: "#f1f5f9",
      color: "#6b7a99"
    }, children: f }, f)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      filtered.map((b) => {
        const st = statusStyle[b.status];
        const StatusIcon = st.icon;
        return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm fade-in flex items-center gap-4", style: {
          border: "1px solid #e8edf5"
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", style: {
            background: "#f1f5f9"
          }, children: /* @__PURE__ */ jsx(CalendarCheck, { size: 22, style: {
            color: "#0f1e42"
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-base", style: {
              color: "#0f1e42"
            }, children: b.facility }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm mt-0.5", style: {
              color: "#6b7a99"
            }, children: [
              b.date,
              " · ",
              b.time,
              " · ",
              b.duration,
              " hour",
              b.duration > 1 ? "s" : ""
            ] }),
            b.notes && /* @__PURE__ */ jsx("div", { className: "text-xs mt-1", style: {
              color: "#9aa3b8"
            }, children: b.notes })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0", style: {
            background: st.bg,
            color: st.color
          }, children: [
            /* @__PURE__ */ jsx(StatusIcon, { size: 13 }),
            st.label
          ] })
        ] }, b.id);
      }),
      filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-white rounded-2xl", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx(CalendarCheck, { size: 36, style: {
          color: "#dde3ef",
          margin: "0 auto 12px"
        } }),
        /* @__PURE__ */ jsxs("p", { style: {
          color: "#9aa3b8"
        }, children: [
          "No ",
          filter.toLowerCase(),
          " bookings"
        ] })
      ] })
    ] })
  ] });
}
export {
  MyBookingsPage as component
};
