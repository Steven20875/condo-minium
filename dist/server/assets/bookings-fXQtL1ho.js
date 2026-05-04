import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { CalendarPlus, CheckCheck, XCircle, Clock, CheckCircle, Search, MoreVertical } from "lucide-react";
import { a as mockBookings } from "./mockData-DU8hdjTT.js";
const statusConfig = {
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
const facilities = ["All", "Swimming Pool", "Gym", "Function Hall", "BBQ Area", "Study Room"];
function BookingRow({
  booking,
  onStatusChange
}) {
  const [open, setOpen] = useState(false);
  const st = statusConfig[booking.status];
  const StatusIcon = st.icon;
  return /* @__PURE__ */ jsxs("tr", { className: "border-b transition-colors hover:bg-gray-50", style: {
    borderColor: "#f0f4fa"
  }, children: [
    /* @__PURE__ */ jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono font-semibold px-2 py-0.5 rounded", style: {
      background: "#f1f5f9",
      color: "#6b7a99"
    }, children: [
      "#",
      booking.id.toUpperCase()
    ] }) }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-3.5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", style: {
        color: "#1a2040"
      }, children: booking.resident }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs", style: {
        color: "#9aa3b8"
      }, children: [
        "Unit ",
        booking.unit
      ] })
    ] }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", style: {
      color: "#1a2040"
    }, children: booking.facility }) }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-3.5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm", style: {
        color: "#1a2040"
      }, children: booking.date }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs", style: {
        color: "#9aa3b8"
      }, children: [
        booking.time,
        " · ",
        booking.duration,
        "h"
      ] })
    ] }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit", style: {
      background: st.bg,
      color: st.color
    }, children: [
      /* @__PURE__ */ jsx(StatusIcon, { size: 12 }),
      st.label
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5 max-w-[180px]", children: booking.notes ? /* @__PURE__ */ jsx("p", { className: "text-xs truncate", style: {
      color: "#9aa3b8"
    }, children: booking.notes }) : /* @__PURE__ */ jsx("span", { className: "text-xs", style: {
      color: "#d0d7e6"
    }, children: "—" }) }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100", children: /* @__PURE__ */ jsx(MoreVertical, { size: 16, style: {
        color: "#9aa3b8"
      } }) }),
      open && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-9 bg-white rounded-xl shadow-xl z-20 py-1 w-36 fade-in", style: {
        border: "1px solid #e8edf5"
      }, children: ["confirmed", "completed", "cancelled"].map((s) => /* @__PURE__ */ jsxs("button", { disabled: booking.status === s, onClick: () => {
        onStatusChange(booking.id, s);
        setOpen(false);
      }, className: "w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors disabled:opacity-40 capitalize", style: {
        color: s === "cancelled" ? "#dc2626" : "#1a2040"
      }, children: [
        "Mark ",
        s
      ] }, s)) })
    ] }) })
  ] });
}
function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [facilityFilter, setFacilityFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const handleStatusChange = (id, status) => {
    setBookings((prev) => prev.map((b) => b.id === id ? {
      ...b,
      status
    } : b));
  };
  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = b.resident.toLowerCase().includes(q) || b.facility.toLowerCase().includes(q) || b.unit.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const matchFacility = facilityFilter === "All" || b.facility === facilityFilter;
    return matchSearch && matchStatus && matchFacility;
  });
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Booking Management" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: [
          filtered.length,
          " bookings shown"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm", style: {
        background: "#0f1e42"
      }, children: [
        /* @__PURE__ */ jsx(CalendarPlus, { size: 16 }),
        "Add Booking"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap mb-5", children: [["All", counts.all, "#0f1e42"], ["pending", counts.pending, "#d97706"], ["confirmed", counts.confirmed, "#059669"], ["completed", counts.completed, "#0284c7"], ["cancelled", counts.cancelled, "#dc2626"]].map(([s, count, color]) => /* @__PURE__ */ jsxs("button", { onClick: () => setStatusFilter(s), className: "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize", style: statusFilter === s ? {
      background: s === "All" ? "#0f1e42" : statusConfig[s]?.bg ?? "#f1f5f9",
      color: s === "All" ? "#fff" : color,
      border: `1.5px solid ${color}`
    } : {
      background: "#f1f5f9",
      color: "#6b7a99",
      border: "1.5px solid transparent"
    }, children: [
      s,
      " ",
      /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded-full text-xs font-bold", style: {
        background: "rgba(0,0,0,0.08)"
      }, children: count })
    ] }, s)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-5 bg-white p-4 rounded-2xl shadow-sm", style: {
      border: "1px solid #e8edf5"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2", style: {
          color: "#9aa3b8"
        } }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search resident, facility, unit…", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040"
        } })
      ] }),
      /* @__PURE__ */ jsx("select", { value: facilityFilter, onChange: (e) => setFacilityFilter(e.target.value), className: "px-3 py-2.5 rounded-xl text-sm", style: {
        border: "1.5px solid #dde3ef",
        color: "#1a2040",
        background: "#fff"
      }, children: facilities.map((f) => /* @__PURE__ */ jsx("option", { value: f, children: f }, f)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden", style: {
      border: "1px solid #e8edf5"
    }, children: /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[900px]", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: {
          background: "#f8fafc",
          borderBottom: "1px solid #e8edf5"
        }, children: ["ID", "Resident", "Facility", "Date & Time", "Status", "Notes", "Actions"].map((h) => /* @__PURE__ */ jsx("th", { className: "px-4 lg:px-5 py-3 text-left text-xs font-semibold", style: {
          color: "#9aa3b8"
        }, children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((b) => /* @__PURE__ */ jsx(BookingRow, { booking: b, onStatusChange: handleStatusChange }, b.id)) })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#9aa3b8"
      }, children: "No bookings match your filters" }) })
    ] }) }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl fade-in p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Create Booking" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        [{
          label: "Resident Name",
          placeholder: "Juan dela Cruz",
          type: "text"
        }, {
          label: "Unit Number",
          placeholder: "4A",
          type: "text"
        }].map((f) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: f.label }),
          /* @__PURE__ */ jsx("input", { type: f.type, placeholder: f.placeholder, className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040"
          } })
        ] }, f.label)),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
            color: "#6b7a99"
          }, children: "Facility" }),
          /* @__PURE__ */ jsx("select", { className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
            border: "1.5px solid #dde3ef",
            color: "#1a2040",
            background: "#fff"
          }, children: facilities.slice(1).map((f) => /* @__PURE__ */ jsx("option", { value: f, children: f }, f)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Date" }),
            /* @__PURE__ */ jsx("input", { type: "date", className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Time" }),
            /* @__PURE__ */ jsx("input", { type: "time", className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold", style: {
          background: "#f1f5f9",
          color: "#6b7a99"
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), className: "flex-1 py-2.5 rounded-xl text-sm font-semibold text-white", style: {
          background: "#0f1e42"
        }, children: "Create" })
      ] })
    ] }) })
  ] });
}
export {
  BookingsPage as component
};
