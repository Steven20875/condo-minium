import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Bell, CalendarCheck, CreditCard, Clock, TrendingUp, CheckCircle2, Waves, Dumbbell, Users, UtensilsCrossed, BookOpen, Wrench, ChevronRight } from "lucide-react";
import { a as mockBookings, r as revenueChartData, b as mockAnnouncements } from "./mockData-DU8hdjTT.js";
const facilities = [{
  name: "Swimming Pool",
  icon: Waves,
  color: "#3b82f6",
  slots: "6AM–9PM"
}, {
  name: "Gym",
  icon: Dumbbell,
  color: "#10b981",
  slots: "5AM–10PM"
}, {
  name: "Function Hall",
  icon: Users,
  color: "#8b5cf6",
  slots: "8AM–10PM"
}, {
  name: "BBQ Area",
  icon: UtensilsCrossed,
  color: "#f97316",
  slots: "10AM–8PM"
}, {
  name: "Study Room",
  icon: BookOpen,
  color: "#c9a84c",
  slots: "7AM–9PM"
}, {
  name: "Maintenance",
  icon: Wrench,
  color: "#6b7280",
  slots: "Request"
}];
const statusStyle = {
  confirmed: {
    bg: "#ecfdf5",
    color: "#059669",
    label: "Confirmed"
  },
  pending: {
    bg: "#fffbeb",
    color: "#d97706",
    label: "Pending"
  },
  cancelled: {
    bg: "#fef2f2",
    color: "#dc2626",
    label: "Cancelled"
  },
  completed: {
    bg: "#f0f9ff",
    color: "#0284c7",
    label: "Completed"
  }
};
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconBg
}) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-5 shadow-sm fade-in", style: {
    border: "1px solid #e8edf5"
  }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-1", style: {
        color: "#6b7a99"
      }, children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: value }),
      /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", style: {
        color: "#9aa3b8"
      }, children: sub })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: {
      background: iconBg
    }, children: /* @__PURE__ */ jsx(Icon, { size: 18, className: "text-white" }) })
  ] }) });
}
function ResidentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    facility: "",
    date: "",
    time: "",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  useEffect(() => setMounted(true), []);
  const myBookings = mockBookings.filter((b) => b.resident === "Maria Santos");
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const handleBook = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingForm({
        facility: "",
        date: "",
        time: "",
        notes: ""
      });
    }, 3e3);
  };
  const chartData = {
    labels: revenueChartData.months,
    datasets: [{
      label: "Association Dues (₱)",
      data: [13e3, 13e3, 13e3, 13e3, 13e3, 13e3, 15e3, 15e3, 15e3, 15e3, 15e3, 15e3],
      borderColor: "#c9a84c",
      backgroundColor: "rgba(201,168,76,0.08)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#c9a84c",
      pointRadius: 4,
      borderWidth: 2
    }]
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Welcome back, Maria" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: today })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "relative w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx(Bell, { size: 18, style: {
          color: "#6b7a99"
        } }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 w-2 h-2 rounded-full", style: {
          background: "#dc2626"
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: CalendarCheck, label: "Active Bookings", value: "3", sub: "2 this week", iconBg: "#3b82f6" }),
      /* @__PURE__ */ jsx(StatCard, { icon: CreditCard, label: "Balance Due", value: "₱2,500", sub: "Due May 15", iconBg: "#dc2626" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Clock, label: "Upcoming", value: "1", sub: "Pool · May 5", iconBg: "#c9a84c" }),
      /* @__PURE__ */ jsx(StatCard, { icon: TrendingUp, label: "Total Bookings", value: "14", sub: "This year", iconBg: "#10b981" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Book a Facility" }),
        bookingSuccess ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center fade-in", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { size: 40, style: {
            color: "#059669"
          }, className: "mb-3" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", style: {
            color: "#059669"
          }, children: "Booking Submitted!" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", style: {
            color: "#6b7a99"
          }, children: "Pending admin confirmation" })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleBook, className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Facility" }),
            /* @__PURE__ */ jsxs("select", { required: true, value: bookingForm.facility, onChange: (e) => setBookingForm((p) => ({
              ...p,
              facility: e.target.value
            })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040",
              background: "#fff"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select facility…" }),
              facilities.filter((f) => f.name !== "Maintenance").map((f) => /* @__PURE__ */ jsx("option", { value: f.name, children: f.name }, f.name))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Date" }),
            /* @__PURE__ */ jsx("input", { type: "date", required: true, value: bookingForm.date, onChange: (e) => setBookingForm((p) => ({
              ...p,
              date: e.target.value
            })), min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Preferred Time" }),
            /* @__PURE__ */ jsxs("select", { required: true, value: bookingForm.time, onChange: (e) => setBookingForm((p) => ({
              ...p,
              time: e.target.value
            })), className: "w-full px-3 py-2.5 rounded-xl text-sm", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040",
              background: "#fff"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select time…" }),
              ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium mb-1", style: {
              color: "#6b7a99"
            }, children: "Notes (optional)" }),
            /* @__PURE__ */ jsx("textarea", { value: bookingForm.notes, onChange: (e) => setBookingForm((p) => ({
              ...p,
              notes: e.target.value
            })), rows: 2, placeholder: "Any special requests…", className: "w-full px-3 py-2.5 rounded-xl text-sm resize-none", style: {
              border: "1.5px solid #dde3ef",
              color: "#1a2040"
            } })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all", style: {
            background: "#0f1e42"
          }, children: "Submit Booking" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "My Bookings" }),
          /* @__PURE__ */ jsxs(Link, { to: "/dashboard/bookings", className: "text-xs font-medium flex items-center gap-1", style: {
            color: "#c9a84c"
          }, children: [
            "View all ",
            /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: myBookings.slice(0, 4).map((b) => {
          const st = statusStyle[b.status];
          const FacIcon = facilities.find((f) => f.name === b.facility)?.icon ?? CalendarCheck;
          const iconColor = facilities.find((f) => f.name === b.facility)?.color ?? "#6b7a99";
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl", style: {
            background: "#f8fafc"
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", style: {
              background: iconColor + "18"
            }, children: /* @__PURE__ */ jsx(FacIcon, { size: 17, style: {
              color: iconColor
            } }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold truncate", style: {
                color: "#1a2040"
              }, children: b.facility }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs", style: {
                color: "#9aa3b8"
              }, children: [
                b.date,
                " · ",
                b.time,
                " · ",
                b.duration,
                "h"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0", style: {
              background: st.bg,
              color: st.color
            }, children: st.label })
          ] }, b.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      mounted && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Payment History" }),
        /* @__PURE__ */ jsx(Line, { data: chartData, options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: "#f0f0f0"
              },
              ticks: {
                color: "#9aa3b8",
                font: {
                  size: 11
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "#9aa3b8",
                font: {
                  size: 11
                }
              }
            }
          }
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Announcements" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: mockAnnouncements.map((a) => {
          const priorityStyle = a.priority === "high" ? {
            bg: "#fef2f2",
            dot: "#dc2626"
          } : a.priority === "low" ? {
            bg: "#f0fdf4",
            dot: "#059669"
          } : {
            bg: "#eff6ff",
            dot: "#2563eb"
          };
          return /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl", style: {
            background: priorityStyle.bg
          }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full mt-1.5 flex-shrink-0", style: {
              background: priorityStyle.dot
            } }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: {
                color: "#1a2040"
              }, children: a.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5 line-clamp-2", style: {
                color: "#6b7a99"
              }, children: a.content }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", style: {
                color: "#9aa3b8"
              }, children: [
                a.date,
                " · ",
                a.author
              ] })
            ] })
          ] }) }, a.id);
        }) })
      ] })
    ] })
  ] });
}
export {
  ResidentDashboard as component
};
