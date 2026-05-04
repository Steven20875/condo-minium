import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { UserPlus, Search, XCircle, CheckCircle, AlertCircle, LogIn, LogOut, Car } from "lucide-react";
import { c as mockVisits } from "./mockData-DU8hdjTT.js";
const statusConfig = {
  expected: {
    bg: "#fffbeb",
    color: "#d97706",
    label: "Expected",
    icon: AlertCircle
  },
  inside: {
    bg: "#ecfdf5",
    color: "#059669",
    label: "Inside",
    icon: CheckCircle
  },
  departed: {
    bg: "#f8fafc",
    color: "#9aa3b8",
    label: "Departed",
    icon: XCircle
  }
};
function VisitRow({
  visit,
  onStatusChange
}) {
  const st = statusConfig[visit.status];
  const StatusIcon = st.icon;
  return /* @__PURE__ */ jsxs("tr", { className: "border-b transition-colors hover:bg-gray-50", style: {
    borderColor: "#f0f4fa"
  }, children: [
    /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0", style: {
        background: st.color
      }, children: visit.visitorName.charAt(0) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", style: {
          color: "#1a2040"
        }, children: visit.visitorName }),
        /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
          color: "#9aa3b8"
        }, children: visit.purpose })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold px-2.5 py-1 rounded-lg", style: {
      background: "#0f1e42",
      color: "#c9a84c"
    }, children: [
      "Unit ",
      visit.unit
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5 text-sm", style: {
      color: "#1a2040"
    }, children: visit.resident }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-3.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs", style: {
        color: "#6b7a99"
      }, children: [
        /* @__PURE__ */ jsx(LogIn, { size: 13, style: {
          color: "#059669"
        } }),
        visit.checkIn
      ] }),
      visit.checkOut && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs mt-1", style: {
        color: "#9aa3b8"
      }, children: [
        /* @__PURE__ */ jsx(LogOut, { size: 13, style: {
          color: "#9aa3b8"
        } }),
        visit.checkOut
      ] })
    ] }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: visit.vehicle ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs", style: {
      color: "#6b7a99"
    }, children: [
      /* @__PURE__ */ jsx(Car, { size: 13 }),
      visit.vehicle
    ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs", style: {
      color: "#d0d7e6"
    }, children: "—" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit", style: {
      background: st.bg,
      color: st.color
    }, children: [
      /* @__PURE__ */ jsx(StatusIcon, { size: 11 }),
      st.label
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
      visit.status === "expected" && /* @__PURE__ */ jsx("button", { onClick: () => onStatusChange(visit.id, "inside"), className: "px-3 py-1.5 rounded-lg text-xs font-semibold text-white", style: {
        background: "#059669"
      }, children: "Check In" }),
      visit.status === "inside" && /* @__PURE__ */ jsx("button", { onClick: () => onStatusChange(visit.id, "departed"), className: "px-3 py-1.5 rounded-lg text-xs font-semibold text-white", style: {
        background: "#6b7a99"
      }, children: "Check Out" }),
      visit.status === "departed" && /* @__PURE__ */ jsx("span", { className: "text-xs", style: {
        color: "#d0d7e6"
      }, children: "Completed" })
    ] }) })
  ] });
}
function VisitsPage() {
  const [visits, setVisits] = useState(mockVisits);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    unit: "",
    resident: "",
    purpose: "",
    vehicle: ""
  });
  const handleStatusChange = (id, status) => {
    setVisits((prev) => prev.map((v) => {
      if (v.id !== id) return v;
      if (status === "inside") return {
        ...v,
        status,
        checkIn: (/* @__PURE__ */ new Date()).toLocaleString("en-PH", {
          hour12: false
        })
      };
      if (status === "departed") return {
        ...v,
        status,
        checkOut: (/* @__PURE__ */ new Date()).toLocaleString("en-PH", {
          hour12: false
        })
      };
      return {
        ...v,
        status
      };
    }));
  };
  const handleAddVisitor = (e) => {
    e.preventDefault();
    const newV = {
      id: `v${Date.now()}`,
      visitorName: newVisitor.name,
      unit: newVisitor.unit,
      resident: newVisitor.resident,
      purpose: newVisitor.purpose,
      checkIn: (/* @__PURE__ */ new Date()).toLocaleString("en-PH", {
        hour12: false
      }),
      status: "expected",
      vehicle: newVisitor.vehicle || void 0
    };
    setVisits((prev) => [newV, ...prev]);
    setShowModal(false);
    setNewVisitor({
      name: "",
      unit: "",
      resident: "",
      purpose: "",
      vehicle: ""
    });
  };
  const filtered = visits.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = v.visitorName.toLowerCase().includes(q) || v.unit.toLowerCase().includes(q) || v.resident.toLowerCase().includes(q) || v.purpose.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const counts = {
    all: visits.length,
    inside: visits.filter((v) => v.status === "inside").length,
    expected: visits.filter((v) => v.status === "expected").length,
    departed: visits.filter((v) => v.status === "departed").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Visit Logs" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: "Gate and visitor management" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm", style: {
        background: "#0f1e42"
      }, children: [
        /* @__PURE__ */ jsx(UserPlus, { size: 16 }),
        "Log Visitor"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [{
      label: "Total Visitors",
      value: counts.all,
      color: "#0f1e42",
      bg: "#f1f5f9"
    }, {
      label: "Currently Inside",
      value: counts.inside,
      color: "#059669",
      bg: "#ecfdf5"
    }, {
      label: "Expected",
      value: counts.expected,
      color: "#d97706",
      bg: "#fffbeb"
    }, {
      label: "Departed",
      value: counts.departed,
      color: "#6b7a99",
      bg: "#f8fafc"
    }].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm text-center", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", style: {
        fontFamily: "'DM Serif Display', serif",
        color: s.color
      }, children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "text-xs mt-0.5", style: {
        color: "#9aa3b8"
      }, children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2", style: {
          color: "#9aa3b8"
        } }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search visitor, unit, purpose…", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "inside", "expected", "departed"].map((s) => /* @__PURE__ */ jsx("button", { onClick: () => setStatusFilter(s), className: "px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize", style: statusFilter === s ? {
        background: "#0f1e42",
        color: "#fff"
      } : {
        background: "#f1f5f9",
        color: "#6b7a99"
      }, children: s }, s)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden", style: {
      border: "1px solid #e8edf5"
    }, children: /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[900px]", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: {
          background: "#f8fafc",
          borderBottom: "1px solid #e8edf5"
        }, children: ["Visitor", "Unit", "Resident", "Check In / Out", "Vehicle", "Status", "Action"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-4 lg:px-5 py-3 text-left text-xs font-semibold", style: {
          color: "#9aa3b8"
        }, children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((v) => /* @__PURE__ */ jsx(VisitRow, { visit: v, onStatusChange: handleStatusChange }, v.id)) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#9aa3b8"
      }, children: "No visits match your search" }) })
    ] }) }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Log New Visitor" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddVisitor, className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Visitor Name" }),
            /* @__PURE__ */ jsx("input", { required: true, type: "text", placeholder: "Full name", value: newVisitor.name, onChange: (e) => setNewVisitor((p) => ({
              ...p,
              name: e.target.value
            })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Unit to Visit" }),
            /* @__PURE__ */ jsx("input", { required: true, type: "text", placeholder: "e.g. 4A", value: newVisitor.unit, onChange: (e) => setNewVisitor((p) => ({
              ...p,
              unit: e.target.value
            })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Resident Name" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "text", placeholder: "Resident being visited", value: newVisitor.resident, onChange: (e) => setNewVisitor((p) => ({
            ...p,
            resident: e.target.value
          })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Purpose of Visit" }),
          /* @__PURE__ */ jsxs("select", { required: true, value: newVisitor.purpose, onChange: (e) => setNewVisitor((p) => ({
            ...p,
            purpose: e.target.value
          })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040",
            background: "#fff"
          }, children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select purpose…" }),
            ["Family Visit", "Friend Visit", "Package Delivery", "Maintenance Work", "Medical Visit", "Spouse", "Business", "Other"].map((p) => /* @__PURE__ */ jsx("option", { value: p, children: p }, p))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Vehicle Plate (optional)" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "e.g. ABC 1234", value: newVisitor.vehicle, onChange: (e) => setNewVisitor((p) => ({
            ...p,
            vehicle: e.target.value
          })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold", style: {
            background: "#f1f5f9",
            color: "#6b7a99"
          }, children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "flex-1 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
            background: "#0f1e42"
          }, children: "Log Visitor" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  VisitsPage as component
};
