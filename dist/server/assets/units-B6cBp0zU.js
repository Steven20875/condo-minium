import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Building2, Wrench, CheckCircle2, Maximize2, BedDouble, Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import { u as unitsAPI } from "./api-Ds5eIUY3.js";
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
function UnitsManagementPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    unit_number: "",
    type: "1BR",
    floor: 1,
    status: "available",
    price: 0,
    area: 0,
    tenant: ""
  });
  useEffect(() => {
    const mockUnits = [{
      id: 1,
      unit_number: "101",
      type: "1BR",
      floor: 1,
      status: "available",
      price: 15e3,
      area: 45.5,
      tenant: null
    }, {
      id: 2,
      unit_number: "102",
      type: "1BR",
      floor: 1,
      status: "occupied",
      price: 15e3,
      area: 45.5,
      tenant: "John Doe"
    }, {
      id: 3,
      unit_number: "201",
      type: "2BR",
      floor: 2,
      status: "available",
      price: 22e3,
      area: 65,
      tenant: null
    }, {
      id: 4,
      unit_number: "202",
      type: "2BR",
      floor: 2,
      status: "maintenance",
      price: 22e3,
      area: 65,
      tenant: null
    }, {
      id: 5,
      unit_number: "301",
      type: "3BR",
      floor: 3,
      status: "available",
      price: 3e4,
      area: 85,
      tenant: null
    }, {
      id: 6,
      unit_number: "302",
      type: "3BR",
      floor: 3,
      status: "occupied",
      price: 3e4,
      area: 85,
      tenant: "Jane Smith"
    }];
    setUnits(mockUnits);
    setLoading(false);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await unitsAPI.update(editingId, formData);
        setUnits(units.map((u) => u.id === editingId ? updated : u));
      } else {
        const created = await unitsAPI.create(formData);
        setUnits([...units, created]);
      }
      resetForm();
      setError("");
    } catch (err) {
      setError("Failed to save unit");
    }
  };
  const handleEdit = (unit) => {
    setFormData({
      unit_number: unit.unit_number,
      type: unit.type,
      floor: unit.floor,
      status: unit.status,
      price: unit.price,
      area: unit.area,
      tenant: unit.tenant || ""
    });
    setEditingId(unit.id || null);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    try {
      await unitsAPI.delete(id);
      setUnits(units.filter((u) => u.id !== id));
      setDeleteConfirm(null);
      setError("");
    } catch (err) {
      setError("Failed to delete unit");
    }
  };
  const resetForm = () => {
    setFormData({
      unit_number: "",
      type: "1BR",
      floor: 1,
      status: "available",
      price: 0,
      area: 0,
      tenant: ""
    });
    setEditingId(null);
    setShowForm(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Units Management" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: [
          "Add, edit, or delete units. Total: ",
          units.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        resetForm();
        setShowForm(true);
      }, className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
        background: "#0f1e42"
      }, children: [
        /* @__PURE__ */ jsx(Plus, { size: 16 }),
        "Add Unit"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-xl text-sm", style: {
      background: "#fef2f2",
      color: "#dc2626",
      border: "1px solid #fecaca"
    }, children: error }),
    loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-12", style: {
      color: "#6b7a99"
    }, children: "Loading units..." }) : units.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white rounded-2xl border", style: {
      borderColor: "#e8edf5",
      color: "#6b7a99"
    }, children: [
      /* @__PURE__ */ jsx(Building2, { size: 40, className: "mx-auto mb-3", style: {
        opacity: 0.5
      } }),
      /* @__PURE__ */ jsx("p", { children: "No units yet. Add your first unit to get started." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: units.map((unit) => {
      const StatusIcon = statusConfig[unit.status].icon;
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
            background: statusConfig[unit.status].bg,
            color: statusConfig[unit.status].color
          }, children: [
            /* @__PURE__ */ jsx(StatusIcon, { size: 11 }),
            statusConfig[unit.status].label
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
                unit.unit_number
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
                unit.price?.toLocaleString() || 0
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
                color: "#9aa3b8"
              }, children: "/month" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4 text-xs", style: {
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => handleEdit(unit), className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition", style: {
              background: "#3b82f6"
            }, children: [
              /* @__PURE__ */ jsx(Edit2, { size: 14 }),
              "Edit"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => setDeleteConfirm(unit.id || null), className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition", style: {
              background: "#dc2626"
            }, children: [
              /* @__PURE__ */ jsx(Trash2, { size: 14 }),
              "Delete"
            ] })
          ] })
        ] })
      ] }, unit.id);
    }) }),
    showForm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", style: {
        borderColor: "#e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", style: {
          color: "#0f1e42"
        }, children: editingId ? "Edit Unit" : "Add New Unit" }),
        /* @__PURE__ */ jsx("button", { onClick: resetForm, className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100", children: /* @__PURE__ */ jsx(X, { size: 18, style: {
          color: "#6b7a99"
        } }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Unit Number *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: formData.unit_number, onChange: (e) => setFormData({
            ...formData,
            unit_number: e.target.value
          }), placeholder: "101, 102, etc.", required: true, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Type *" }),
            /* @__PURE__ */ jsxs("select", { value: formData.type, onChange: (e) => setFormData({
              ...formData,
              type: e.target.value
            }), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            }, children: [
              /* @__PURE__ */ jsx("option", { children: "Studio" }),
              /* @__PURE__ */ jsx("option", { children: "1BR" }),
              /* @__PURE__ */ jsx("option", { children: "2BR" }),
              /* @__PURE__ */ jsx("option", { children: "3BR" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Floor *" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: formData.floor, onChange: (e) => setFormData({
              ...formData,
              floor: parseInt(e.target.value)
            }), required: true, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Area (sqm) *" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: formData.area, onChange: (e) => setFormData({
              ...formData,
              area: parseFloat(e.target.value)
            }), required: true, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Price (₱) *" }),
            /* @__PURE__ */ jsx("input", { type: "number", value: formData.price, onChange: (e) => setFormData({
              ...formData,
              price: parseFloat(e.target.value)
            }), required: true, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Status *" }),
          /* @__PURE__ */ jsxs("select", { value: formData.status, onChange: (e) => setFormData({
            ...formData,
            status: e.target.value
          }), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          }, children: [
            /* @__PURE__ */ jsx("option", { value: "available", children: "Available" }),
            /* @__PURE__ */ jsx("option", { value: "occupied", children: "Occupied" }),
            /* @__PURE__ */ jsx("option", { value: "maintenance", children: "Maintenance" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Tenant Name" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: formData.tenant || "", onChange: (e) => setFormData({
            ...formData,
            tenant: e.target.value
          }), placeholder: "Leave blank if available", className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold", style: {
            background: "#f1f5f9",
            color: "#6b7a99"
          }, children: "Cancel" }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
            background: "#0f1e42"
          }, children: [
            editingId ? "Update" : "Add",
            " Unit"
          ] })
        ] })
      ] })
    ] }) }),
    deleteConfirm !== null && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl w-full max-w-sm shadow-2xl fade-in", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-center", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { size: 40, style: {
        color: "#dc2626",
        margin: "0 auto 12px"
      } }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-2", style: {
        color: "#0f1e42"
      }, children: "Delete Unit?" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-6", style: {
        color: "#6b7a99"
      }, children: "This action cannot be undone." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setDeleteConfirm(null), className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold", style: {
          background: "#f1f5f9",
          color: "#6b7a99"
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(deleteConfirm), className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
          background: "#dc2626"
        }, children: "Delete" })
      ] })
    ] }) }) })
  ] });
}
export {
  UnitsManagementPage as component
};
