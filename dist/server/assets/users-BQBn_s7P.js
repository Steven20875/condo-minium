import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { UserPlus, Search, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { d as mockUsers } from "./mockData-DU8hdjTT.js";
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}
const avatarColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#c9a84c", "#ef4444", "#0284c7"];
function UserRow({
  user,
  index,
  onAction
}) {
  const [open, setOpen] = useState(false);
  const color = avatarColors[index % avatarColors.length];
  return /* @__PURE__ */ jsxs("tr", { className: "border-b transition-colors hover:bg-gray-50", style: {
    borderColor: "#f0f4fa"
  }, children: [
    /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0", style: {
        background: color
      }, children: getInitials(user.name) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", style: {
          color: "#1a2040"
        }, children: user.name }),
        /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
          color: "#9aa3b8"
        }, children: user.email })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-lg inline-block", style: {
      background: "#0f1e42",
      color: "#c9a84c"
    }, children: [
      "Unit ",
      user.unit
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full capitalize", style: user.role === "admin" ? {
      background: "rgba(201,168,76,0.15)",
      color: "#c9a84c"
    } : {
      background: "#eff6ff",
      color: "#3b82f6"
    }, children: user.role }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
      user.status === "active" ? /* @__PURE__ */ jsx(CheckCircle, { size: 14, style: {
        color: "#059669"
      } }) : /* @__PURE__ */ jsx(XCircle, { size: 14, style: {
        color: "#dc2626"
      } }),
      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium capitalize", style: {
        color: user.status === "active" ? "#059669" : "#dc2626"
      }, children: user.status })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5 text-xs", style: {
      color: "#6b7a99"
    }, children: user.phone }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold", style: {
      color: user.balance < 0 ? "#dc2626" : user.balance > 0 ? "#059669" : "#9aa3b8"
    }, children: [
      user.balance < 0 ? "−" : user.balance > 0 ? "+" : "",
      "₱",
      Math.abs(user.balance).toLocaleString()
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5 text-xs", style: {
      color: "#9aa3b8"
    }, children: user.joinDate }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100", children: /* @__PURE__ */ jsx(MoreVertical, { size: 16, style: {
        color: "#9aa3b8"
      } }) }),
      open && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-9 bg-white rounded-xl shadow-xl z-20 py-1 w-36 fade-in", style: {
        border: "1px solid #e8edf5"
      }, children: ["View Profile", "Send Message", "Edit Details", user.status === "active" ? "Deactivate" : "Activate"].map((action) => /* @__PURE__ */ jsx("button", { onClick: () => {
        onAction(user);
        setOpen(false);
      }, className: "w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors", style: {
        color: action === "Deactivate" ? "#dc2626" : "#1a2040"
      }, children: action }, action)) })
    ] }) })
  ] });
}
function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = mockUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.unit.toLowerCase().includes(q);
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Residents & Users" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: [
          filtered.length,
          " of ",
          mockUsers.length,
          " users"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm", style: {
        background: "#0f1e42"
      }, children: [
        /* @__PURE__ */ jsx(UserPlus, { size: 16 }),
        "Add Resident"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2", style: {
          color: "#9aa3b8"
        } }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search name, email, unit…", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "resident", "admin"].map((r) => /* @__PURE__ */ jsx("button", { onClick: () => setRoleFilter(r), className: "px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize", style: roleFilter === r ? {
        background: "#0f1e42",
        color: "#fff"
      } : {
        background: "#f1f5f9",
        color: "#6b7a99"
      }, children: r }, r)) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "active", "inactive"].map((s) => /* @__PURE__ */ jsx("button", { onClick: () => setStatusFilter(s), className: "px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize", style: statusFilter === s ? {
        background: "#c9a84c",
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
        }, children: ["Resident", "Unit", "Role", "Status", "Phone", "Balance", "Since", "Actions"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-4 lg:px-5 py-3 text-left text-xs font-semibold", style: {
          color: "#9aa3b8"
        }, children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((user, i) => /* @__PURE__ */ jsx(UserRow, { user, index: i, onAction: setSelectedUser }, user.id)) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#9aa3b8"
      }, children: "No users match your search" }) })
    ] }) }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Add New Resident" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [{
        label: "Full Name",
        placeholder: "Juan dela Cruz",
        type: "text"
      }, {
        label: "Email Address",
        placeholder: "juan@email.com",
        type: "email"
      }, {
        label: "Phone Number",
        placeholder: "+63 9XX XXX XXXX",
        type: "tel"
      }, {
        label: "Unit Number",
        placeholder: "e.g. 4A",
        type: "text"
      }].map((f) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
          color: "#6b7a99"
        }, children: f.label }),
        /* @__PURE__ */ jsx("input", { type: f.type, placeholder: f.placeholder, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }, f.label)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold", style: {
          background: "#f1f5f9",
          color: "#6b7a99"
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
          background: "#0f1e42"
        }, children: "Save Resident" })
      ] })
    ] }) })
  ] });
}
export {
  UsersPage as component
};
