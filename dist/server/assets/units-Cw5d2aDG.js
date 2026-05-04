import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Search, Building2, Wrench, CheckCircle2, Maximize2, BedDouble, MapPin, X } from "lucide-react";
import { m as mockUnits } from "./mockData-DU8hdjTT.js";
const typeColors = {
  Studio: "#8b5cf6",
  "1BR": "#3b82f6",
  "2BR": "#c9a84c",
  "3BR": "#10b981"
};
const statusConfig = {
  available: {
    icon: CheckCircle2,
    color: "#059669",
    bg: "#ecfdf5",
    label: "Available"
  },
  occupied: {
    icon: Building2,
    color: "#6b7a99",
    bg: "#f8fafc",
    label: "Occupied"
  },
  maintenance: {
    icon: Wrench,
    color: "#d97706",
    bg: "#fffbeb",
    label: "Maintenance"
  }
};
function UnitCard({
  unit,
  onBook
}) {
  const st = statusConfig[unit.status];
  const StatusIcon = st.icon;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow fade-in", style: {
    border: "1px solid #e8edf5"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "h-36 relative flex items-center justify-center", style: {
      background: `linear-gradient(135deg, ${typeColors[unit.type]}18, ${typeColors[unit.type]}08)`,
      borderBottom: `1px solid ${typeColors[unit.type]}22`
    }, children: [
      /* @__PURE__ */ jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: {
        opacity: 0.5
      }, children: [
        /* @__PURE__ */ jsx("rect", { x: "8", y: "8", width: "64", height: "64", rx: "4", stroke: typeColors[unit.type], strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ jsx("rect", { x: "8", y: "8", width: "38", height: "38", rx: "2", fill: typeColors[unit.type], fillOpacity: "0.1" }),
        /* @__PURE__ */ jsx("rect", { x: "50", y: "8", width: "22", height: "22", rx: "2", fill: typeColors[unit.type], fillOpacity: "0.08" }),
        /* @__PURE__ */ jsx("rect", { x: "8", y: "50", width: "64", height: "22", rx: "2", fill: typeColors[unit.type], fillOpacity: "0.06" }),
        /* @__PURE__ */ jsx("line", { x1: "46", y1: "8", x2: "46", y2: "72", stroke: typeColors[unit.type], strokeWidth: "1", strokeOpacity: "0.4" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "46", x2: "46", y2: "46", stroke: typeColors[unit.type], strokeWidth: "1", strokeOpacity: "0.4" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white", style: {
        background: typeColors[unit.type]
      }, children: unit.type }),
      /* @__PURE__ */ jsxs("span", { className: "absolute top-3 right-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full", style: {
        background: st.bg,
        color: st.color
      }, children: [
        /* @__PURE__ */ jsx(StatusIcon, { size: 11 }),
        st.label
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded-lg", style: {
        background: "rgba(255,255,255,0.9)",
        color: "#6b7a99"
      }, children: [
        "Floor ",
        unit.floor
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: [
            "Unit ",
            unit.number
          ] }),
          unit.tenant && /* @__PURE__ */ jsxs("p", { className: "text-xs mt-0.5", style: {
            color: "#9aa3b8"
          }, children: [
            "Tenant: ",
            unit.tenant
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold", style: {
            color: "#0f1e42"
          }, children: [
            "₱",
            unit.price.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
            color: "#9aa3b8"
          }, children: "/month" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-3 text-xs", style: {
        color: "#6b7a99"
      }, children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Maximize2, { size: 12 }),
          unit.area,
          " sqm"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(BedDouble, { size: 12 }),
          unit.type
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 12 }),
          "Floor ",
          unit.floor
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: unit.features.map((f) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
        background: "#f1f5f9",
        color: "#6b7a99"
      }, children: f }, f)) }),
      /* @__PURE__ */ jsx("button", { disabled: unit.status !== "available", onClick: () => unit.status === "available" && onBook(unit), className: "w-full py-2.5 rounded-xl text-sm font-semibold transition-all", style: unit.status === "available" ? {
        background: "#0f1e42",
        color: "#fff"
      } : {
        background: "#f1f5f9",
        color: "#9aa3b8",
        cursor: "not-allowed"
      }, children: unit.status === "available" ? "Book / Inquire" : unit.status === "occupied" ? "Currently Occupied" : "Under Maintenance" })
    ] })
  ] });
}
function BookingModal({
  unit,
  onClose
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    moveIn: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
    background: "rgba(0,0,0,0.5)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", style: {
      borderColor: "#e8edf5"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: [
          "Inquire — Unit ",
          unit.number
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: [
          "₱",
          unit.price.toLocaleString(),
          "/mo · ",
          unit.type,
          " · ",
          unit.area,
          " sqm"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100", children: /* @__PURE__ */ jsx(X, { size: 18, style: {
        color: "#6b7a99"
      } }) })
    ] }),
    submitted ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center fade-in", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { size: 40, style: {
        color: "#059669",
        margin: "0 auto 12px"
      } }),
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", style: {
        color: "#0f1e42"
      }, children: "Inquiry Submitted!" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 mb-5", style: {
        color: "#6b7a99"
      }, children: "Admin will contact you within 24 hours." }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "px-6 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
        background: "#0f1e42"
      }, children: "Close" })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Full Name" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "text", placeholder: "Juan dela Cruz", value: form.name, onChange: (e) => setForm((p) => ({
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
          }, children: "Phone" }),
          /* @__PURE__ */ jsx("input", { required: true, type: "tel", placeholder: "+63 9XX XXX XXXX", value: form.phone, onChange: (e) => setForm((p) => ({
            ...p,
            phone: e.target.value
          })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
          color: "#6b7a99"
        }, children: "Email Address" }),
        /* @__PURE__ */ jsx("input", { required: true, type: "email", placeholder: "juan@example.com", value: form.email, onChange: (e) => setForm((p) => ({
          ...p,
          email: e.target.value
        })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
          color: "#6b7a99"
        }, children: "Preferred Move-in Date" }),
        /* @__PURE__ */ jsx("input", { type: "date", value: form.moveIn, onChange: (e) => setForm((p) => ({
          ...p,
          moveIn: e.target.value
        })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
          color: "#6b7a99"
        }, children: "Message" }),
        /* @__PURE__ */ jsx("textarea", { rows: 3, placeholder: "Any questions or special requirements…", value: form.message, onChange: (e) => setForm((p) => ({
          ...p,
          message: e.target.value
        })), className: "w-full px-3 py-2.5 rounded-xl text-sm resize-none", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full py-3 rounded-xl text-sm font-semibold text-white", style: {
        background: "#0f1e42"
      }, children: "Submit Inquiry" })
    ] })
  ] }) });
}
function UnitsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const filtered = mockUnits.filter((u) => {
    const matchSearch = u.number.toLowerCase().includes(search.toLowerCase()) || (u.tenant || "").toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || u.type === typeFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });
  const stats = {
    total: mockUnits.length,
    available: mockUnits.filter((u) => u.status === "available").length,
    occupied: mockUnits.filter((u) => u.status === "occupied").length,
    maintenance: mockUnits.filter((u) => u.status === "maintenance").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 fade-in", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Unit Listings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#6b7a99"
      }, children: "Browse all condominium units — availability and details" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [{
      label: "Total Units",
      value: stats.total,
      color: "#0f1e42"
    }, {
      label: "Available",
      value: stats.available,
      color: "#059669"
    }, {
      label: "Occupied",
      value: stats.occupied,
      color: "#6b7a99"
    }, {
      label: "Maintenance",
      value: stats.maintenance,
      color: "#d97706"
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
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2", style: {
          color: "#9aa3b8"
        } }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search unit or tenant…", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: ["All", "Studio", "1BR", "2BR", "3BR"].map((t) => /* @__PURE__ */ jsx("button", { onClick: () => setTypeFilter(t), className: "px-3 py-2 rounded-xl text-xs font-semibold transition-all", style: typeFilter === t ? {
        background: "#0f1e42",
        color: "#fff"
      } : {
        background: "#f1f5f9",
        color: "#6b7a99"
      }, children: t }, t)) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: ["All", "available", "occupied", "maintenance"].map((s) => /* @__PURE__ */ jsx("button", { onClick: () => setStatusFilter(s), className: "px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize", style: statusFilter === s ? {
        background: "#c9a84c",
        color: "#fff"
      } : {
        background: "#f1f5f9",
        color: "#6b7a99"
      }, children: s }, s)) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-white rounded-2xl", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsx(Building2, { size: 40, style: {
        color: "#dde3ef",
        margin: "0 auto 12px"
      } }),
      /* @__PURE__ */ jsx("p", { className: "font-medium", style: {
        color: "#6b7a99"
      }, children: "No units match your filters" }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setSearch("");
        setTypeFilter("All");
        setStatusFilter("All");
      }, className: "mt-3 text-sm font-medium", style: {
        color: "#c9a84c"
      }, children: "Clear filters" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: filtered.map((unit) => /* @__PURE__ */ jsx(UnitCard, { unit, onBook: setSelectedUnit }, unit.id)) }),
    selectedUnit && /* @__PURE__ */ jsx(BookingModal, { unit: selectedUnit, onClose: () => setSelectedUnit(null) })
  ] });
}
export {
  UnitsPage as component
};
