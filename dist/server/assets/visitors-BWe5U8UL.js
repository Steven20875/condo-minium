import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { UserPlus, LogIn, LogOut, Car, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { c as mockVisits } from "./mockData-DU8hdjTT.js";
function MyVisitorsPage() {
  const myVisits = mockVisits.filter((v) => v.resident === "Maria Santos");
  const [showModal, setShowModal] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "My Visitors" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: "Register and track your guests" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm", style: {
        background: "#0f1e42"
      }, children: [
        /* @__PURE__ */ jsx(UserPlus, { size: 16 }),
        "Register Visitor"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: myVisits.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-white rounded-2xl", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsx(UserPlus, { size: 36, style: {
        color: "#dde3ef",
        margin: "0 auto 12px"
      } }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#9aa3b8"
      }, children: "No visitor records yet" })
    ] }) : myVisits.map((v) => {
      const st = v.status === "inside" ? {
        bg: "#ecfdf5",
        color: "#059669",
        label: "Inside",
        Icon: CheckCircle
      } : v.status === "expected" ? {
        bg: "#fffbeb",
        color: "#d97706",
        label: "Expected",
        Icon: AlertCircle
      } : {
        bg: "#f8fafc",
        color: "#9aa3b8",
        label: "Departed",
        Icon: XCircle
      };
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm fade-in flex items-center gap-4", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0", style: {
          background: st.color
        }, children: v.visitorName.charAt(0) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", style: {
            color: "#0f1e42"
          }, children: v.visitorName }),
          /* @__PURE__ */ jsx("div", { className: "text-sm", style: {
            color: "#6b7a99"
          }, children: v.purpose }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mt-1.5 text-xs", style: {
            color: "#9aa3b8"
          }, children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(LogIn, { size: 11 }),
              v.checkIn
            ] }),
            v.checkOut && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(LogOut, { size: 11 }),
              v.checkOut
            ] }),
            v.vehicle && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Car, { size: 11 }),
              v.vehicle
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0", style: {
          background: st.bg,
          color: st.color
        }, children: [
          /* @__PURE__ */ jsx(st.Icon, { size: 13 }),
          st.label
        ] })
      ] }, v.id);
    }) }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-sm shadow-2xl fade-in p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Register Visitor" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ["Visitor Name", "Purpose of Visit", "Expected Date & Time", "Vehicle Plate (optional)"].map((f) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
          color: "#6b7a99"
        }, children: f }),
        /* @__PURE__ */ jsx("input", { type: "text", className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }, f)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold", style: {
          background: "#f1f5f9",
          color: "#6b7a99"
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
          background: "#0f1e42"
        }, children: "Submit" })
      ] })
    ] }) })
  ] });
}
export {
  MyVisitorsPage as component
};
