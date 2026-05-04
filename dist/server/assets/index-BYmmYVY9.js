import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Users, TrendingUp, Building2, Wrench, ChevronRight, ArrowUpRight } from "lucide-react";
import { a as mockBookings, c as mockVisits, d as mockUsers, m as mockUnits, r as revenueChartData } from "./mockData-DU8hdjTT.js";
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
  change,
  iconBg,
  trend = true
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm fade-in", style: {
    border: "1px solid #e8edf5"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl flex items-center justify-center", style: {
        background: iconBg
      }, children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-white" }) }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full", style: trend ? {
        background: "#ecfdf5",
        color: "#059669"
      } : {
        background: "#fef2f2",
        color: "#dc2626"
      }, children: [
        /* @__PURE__ */ jsx(ArrowUpRight, { size: 12 }),
        change
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold mb-0.5", style: {
      fontFamily: "'DM Serif Display', serif",
      color: "#0f1e42"
    }, children: value }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", style: {
      color: "#6b7a99"
    }, children: label })
  ] });
}
function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pending = mockBookings.filter((b) => b.status === "pending").length;
  const inside = mockVisits.filter((v) => v.status === "inside").length;
  const activeResidents = mockUsers.filter((u) => u.role === "resident" && u.status === "active").length;
  const occupied = mockUnits.filter((u) => u.status === "occupied").length;
  const occupancyPct = Math.round(occupied / mockUnits.length * 100);
  const revenueBarData = {
    labels: revenueChartData.months,
    datasets: [{
      label: "Monthly Revenue (₱)",
      data: revenueChartData.values,
      backgroundColor: revenueChartData.months.map((_, i) => i === 4 ? "#c9a84c" : "rgba(15,30,66,0.7)"),
      borderRadius: 6,
      borderSkipped: false
    }]
  };
  const unitTypeData = {
    labels: ["Studio", "1BR", "2BR", "3BR"],
    datasets: [{
      data: [mockUnits.filter((u) => u.type === "Studio").length, mockUnits.filter((u) => u.type === "1BR").length, mockUnits.filter((u) => u.type === "2BR").length, mockUnits.filter((u) => u.type === "3BR").length],
      backgroundColor: ["#8b5cf6", "#3b82f6", "#c9a84c", "#10b981"],
      borderWidth: 0,
      hoverOffset: 6
    }]
  };
  const recentBookings = mockBookings.slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 fade-in", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Admin Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#6b7a99"
      }, children: "ONE SPATIAL ILOILO · May 3, 2026" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: Users, label: "Active Residents", value: String(activeResidents), change: "+3 this mo.", iconBg: "#3b82f6" }),
      /* @__PURE__ */ jsx(StatCard, { icon: TrendingUp, label: "May Revenue", value: "₱47,300", change: "+8.4%", iconBg: "#10b981" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Building2, label: "Occupancy Rate", value: `${occupancyPct}%`, change: "+2%", iconBg: "#c9a84c" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Wrench, label: "Pending Requests", value: String(pending), change: "−2 today", trend: false, iconBg: "#ef4444" })
    ] }),
    mounted && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Monthly Revenue" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium px-2.5 py-1 rounded-full", style: {
            background: "#ecfdf5",
            color: "#059669"
          }, children: "2026" })
        ] }),
        /* @__PURE__ */ jsx(Bar, { data: revenueBarData, options: {
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
                color: "#f5f7fb"
              },
              ticks: {
                color: "#9aa3b8",
                font: {
                  size: 11
                },
                callback: (v) => `₱${(Number(v) / 1e3).toFixed(0)}k`
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
        }, children: "Unit Mix" }),
        /* @__PURE__ */ jsx(Doughnut, { data: unitTypeData, options: {
          responsive: true,
          cutout: "68%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 16,
                font: {
                  size: 12
                },
                color: "#6b7a99"
              }
            }
          }
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Recent Bookings" }),
          /* @__PURE__ */ jsxs(Link, { to: "/admin/bookings", className: "flex items-center gap-1 text-xs font-medium", style: {
            color: "#c9a84c"
          }, children: [
            "View all ",
            /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: recentBookings.map((b) => {
          const st = statusStyle[b.status];
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl", style: {
            background: "#f8fafc"
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs text-white", style: {
              background: "#0f1e42"
            }, children: b.unit }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold truncate", style: {
                color: "#1a2040"
              }, children: b.facility }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs", style: {
                color: "#9aa3b8"
              }, children: [
                b.resident,
                " · ",
                b.date
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0", style: {
              background: st.bg,
              color: st.color
            }, children: st.label })
          ] }, b.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Current Visitors" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full animate-pulse", style: {
              background: "#059669"
            } }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium", style: {
              color: "#059669"
            }, children: [
              inside,
              " inside"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
          mockVisits.filter((v) => v.status !== "departed").map((v) => {
            const stConf = v.status === "inside" ? {
              bg: "#ecfdf5",
              color: "#059669",
              label: "Inside"
            } : {
              bg: "#fffbeb",
              color: "#d97706",
              label: "Expected"
            };
            return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl", style: {
              background: "#f8fafc"
            }, children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs text-white", style: {
                background: stConf.color
              }, children: v.visitorName.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold truncate", style: {
                  color: "#1a2040"
                }, children: v.visitorName }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs", style: {
                  color: "#9aa3b8"
                }, children: [
                  "Unit ",
                  v.unit,
                  " · ",
                  v.purpose
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0", style: {
                background: stConf.bg,
                color: stConf.color
              }, children: stConf.label })
            ] }, v.id);
          }),
          /* @__PURE__ */ jsxs(Link, { to: "/admin/visits", className: "flex items-center justify-center gap-1 w-full py-2 rounded-xl text-xs font-medium", style: {
            background: "#f1f5f9",
            color: "#6b7a99"
          }, children: [
            "View full visit log ",
            /* @__PURE__ */ jsx(ChevronRight, { size: 13 })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
