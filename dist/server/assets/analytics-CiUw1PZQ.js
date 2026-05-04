import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { TrendingUp, Percent, Calendar, BarChart2, TrendingDown } from "lucide-react";
import { r as revenueChartData, o as occupancyChartData, f as bookingTrendData, g as facilityUsageData } from "./mockData-DU8hdjTT.js";
const periods = ["Jan–Apr", "May–Aug", "Sep–Dec", "Full Year"];
const kpis = [{
  label: "Avg Monthly Revenue",
  value: "₱49,750",
  change: "+11.3%",
  up: true,
  icon: TrendingUp,
  color: "#10b981",
  bg: "#ecfdf5"
}, {
  label: "Avg Occupancy",
  value: "89.4%",
  change: "+3.2%",
  up: true,
  icon: Percent,
  color: "#3b82f6",
  bg: "#eff6ff"
}, {
  label: "Total Bookings (YTD)",
  value: "128",
  change: "+24%",
  up: true,
  icon: Calendar,
  color: "#c9a84c",
  bg: "#fffbeb"
}, {
  label: "Revenue Growth",
  value: "28.1%",
  change: "vs last yr",
  up: true,
  icon: BarChart2,
  color: "#8b5cf6",
  bg: "#f5f3ff"
}];
function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("Full Year");
  useEffect(() => setMounted(true), []);
  const revenueBar = {
    labels: revenueChartData.months,
    datasets: [{
      label: "Revenue 2026 (₱)",
      data: revenueChartData.values,
      backgroundColor: "rgba(15,30,66,0.75)",
      borderRadius: 6,
      borderSkipped: false
    }, {
      label: "Revenue 2025 (₱)",
      data: [38200, 34500, 37100, 40800, 42300, 45200, 43600, 47100, 44700, 48200, 51300, 54400],
      backgroundColor: "rgba(201,168,76,0.35)",
      borderRadius: 6,
      borderSkipped: false
    }]
  };
  const occupancyLine = {
    labels: occupancyChartData.months,
    datasets: [{
      label: "Occupancy %",
      data: occupancyChartData.values,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.08)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#3b82f6",
      pointRadius: 4,
      borderWidth: 2.5
    }]
  };
  const bookingTrend = {
    labels: bookingTrendData.days,
    datasets: [{
      label: "Bookings",
      data: bookingTrendData.values,
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#10b981",
      pointRadius: 5,
      borderWidth: 2.5
    }]
  };
  const facilityUsage = {
    labels: facilityUsageData.facilities,
    datasets: [{
      data: facilityUsageData.bookings,
      backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#c9a84c", "#6b7a99"],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };
  const gridOpts = {
    color: "#f5f7fb",
    drawBorder: false
  };
  const tickOpts = {
    color: "#9aa3b8",
    font: {
      size: 11
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 fade-in", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: "Analytics" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
          color: "#6b7a99"
        }, children: "Performance insights — ONE SPATIAL ILOILO" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 bg-white rounded-xl p-1 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: periods.map((p) => /* @__PURE__ */ jsx("button", { onClick: () => setPeriod(p), className: "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all", style: period === p ? {
        background: "#0f1e42",
        color: "#fff"
      } : {
        color: "#6b7a99"
      }, children: p }, p)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: kpis.map((k) => {
      const Icon = k.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm fade-in", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center", style: {
            background: k.bg
          }, children: /* @__PURE__ */ jsx(Icon, { size: 18, style: {
            color: k.color
          } }) }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 text-xs font-semibold", style: {
            color: k.up ? "#059669" : "#dc2626"
          }, children: [
            k.up ? /* @__PURE__ */ jsx(TrendingUp, { size: 12 }) : /* @__PURE__ */ jsx(TrendingDown, { size: 12 }),
            k.change
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-xl font-bold", style: {
          fontFamily: "'DM Serif Display', serif",
          color: "#0f1e42"
        }, children: k.value }),
        /* @__PURE__ */ jsx("div", { className: "text-xs mt-0.5", style: {
          color: "#9aa3b8"
        }, children: k.label })
      ] }, k.label);
    }) }),
    mounted && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm mb-6", style: {
        border: "1px solid #e8edf5"
      }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", style: {
              fontFamily: "'DM Serif Display', serif",
              color: "#0f1e42"
            }, children: "Revenue — Year over Year" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: {
              color: "#9aa3b8"
            }, children: "Monthly collection in Philippine Peso" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded", style: {
                background: "rgba(15,30,66,0.75)"
              } }),
              /* @__PURE__ */ jsx("span", { style: {
                color: "#6b7a99"
              }, children: "2026" })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded", style: {
                background: "rgba(201,168,76,0.6)"
              } }),
              /* @__PURE__ */ jsx("span", { style: {
                color: "#6b7a99"
              }, children: "2025" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Bar, { data: revenueBar, options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: gridOpts,
              ticks: {
                ...tickOpts,
                callback: (v) => `₱${(Number(v) / 1e3).toFixed(0)}k`
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: tickOpts
            }
          }
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
          border: "1px solid #e8edf5"
        }, children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-1", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Occupancy Trend" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mb-4", style: {
            color: "#9aa3b8"
          }, children: "Monthly occupancy percentage" }),
          /* @__PURE__ */ jsx(Line, { data: occupancyLine, options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                min: 75,
                max: 100,
                grid: gridOpts,
                ticks: {
                  ...tickOpts,
                  callback: (v) => `${v}%`
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: tickOpts
              }
            }
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
          border: "1px solid #e8edf5"
        }, children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-1", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Weekly Booking Volume" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mb-4", style: {
            color: "#9aa3b8"
          }, children: "Bookings per day of week" }),
          /* @__PURE__ */ jsx(Line, { data: bookingTrend, options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: gridOpts,
                ticks: tickOpts
              },
              x: {
                grid: {
                  display: false
                },
                ticks: tickOpts
              }
            }
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-6 shadow-sm", style: {
        border: "1px solid #e8edf5"
      }, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-1", style: {
            fontFamily: "'DM Serif Display', serif",
            color: "#0f1e42"
          }, children: "Facility Usage Breakdown" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mb-4", style: {
            color: "#9aa3b8"
          }, children: "Total bookings per facility (this year)" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: facilityUsageData.facilities.map((name, i) => {
            const total = facilityUsageData.bookings.reduce((a, b) => a + b, 0);
            const pct = Math.round(facilityUsageData.bookings[i] / total * 100);
            const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#c9a84c", "#6b7a99"];
            return /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsx("span", { style: {
                  color: "#1a2040",
                  fontWeight: 500
                }, children: name }),
                /* @__PURE__ */ jsxs("span", { style: {
                  color: "#9aa3b8"
                }, children: [
                  facilityUsageData.bookings[i],
                  " bookings · ",
                  pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full", style: {
                background: "#f1f5f9"
              }, children: /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full transition-all", style: {
                width: `${pct}%`,
                background: colors[i]
              } }) })
            ] }, name);
          }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-xs mx-auto w-full", children: /* @__PURE__ */ jsx(Doughnut, { data: facilityUsage, options: {
          responsive: true,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 14,
                font: {
                  size: 12
                },
                color: "#6b7a99"
              }
            }
          }
        } }) })
      ] }) })
    ] })
  ] });
}
export {
  AnalyticsPage as component
};
