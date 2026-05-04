import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler, BarElement, ArcElement } from "chart.js";
import { useState, useEffect } from "react";
import { Bot, Send } from "lucide-react";
const Route$g = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ONE SPATIAL ILOILO — Condominium Management" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$e = () => import("./register-q7y5Qunb.js");
const Route$f = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./_app-DyeDtxXO.js");
const Route$e = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("cboms_user");
      const token = localStorage.getItem("token");
      if (!user || !token) throw redirect({
        to: "/"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-B8ePEtn9.js");
const Route$d = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./units-Cw5d2aDG.js");
const Route$c = createFileRoute("/_app/units")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./dashboard-CJUBFHgu.js");
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);
const Route$b = createFileRoute("/_app/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-BYmmYVY9.js");
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);
const Route$a = createFileRoute("/_app/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./visitors-BWe5U8UL.js");
const Route$9 = createFileRoute("/_app/dashboard/visitors")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./messages-XUWUtrZd.js");
const Route$8 = createFileRoute("/_app/dashboard/messages")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./bookings-T9Z9hONE.js");
const Route$7 = createFileRoute("/_app/dashboard/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./visits-DIr5FzwG.js");
const Route$6 = createFileRoute("/_app/admin/visits")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./users-BQBn_s7P.js");
const Route$5 = createFileRoute("/_app/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./units-B6cBp0zU.js");
const Route$4 = createFileRoute("/_app/admin/units")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  ssr: false
  // Disable SSR for this route
});
const languageKeywords = {
  ilonggo: ["ang", "sa", "kon", "kag", "kay", "para", "indi", "kano", "dako", "tuo", "hanggad", "tan-aw", "mga", "tu-od", "pila", "libro", "bisita"],
  tagalog: ["ang", "sa", "kung", "at", "para", "hindi", "kami", "kayo", "tayo", "sila", "ako", "ikaw", "saan", "ano", "kailan", "bakit", "bisita", "kwarto"],
  english: ["the", "a", "is", "in", "how", "what", "when", "where", "why", "which", "book", "visitor", "unit", "help", "can", "for"]
};
const detectLanguage = (text) => {
  const lower = text.toLowerCase();
  let langScores = { ilonggo: 0, tagalog: 0, english: 0 };
  for (const word of lower.split(/\s+/)) {
    if (languageKeywords.ilonggo.some((kw) => word.includes(kw))) langScores.ilonggo++;
    if (languageKeywords.tagalog.some((kw) => word.includes(kw))) langScores.tagalog++;
    if (languageKeywords.english.some((kw) => word.includes(kw))) langScores.english++;
  }
  const max = Math.max(langScores.ilonggo, langScores.tagalog, langScores.english);
  if (max === 0) return "english";
  if (langScores.ilonggo === max) return "ilonggo";
  if (langScores.tagalog === max) return "tagalog";
  return "english";
};
const responses = {
  ilonggo: {
    booking: "Para sa pag-book, pumunta sa Bookings page at piliin ang facility, date, at oras. Dako ako makatulong na check ang availability.",
    visitor: "Para sa visitor management, bukas ang Visitor Logs page. Pwede mo i-register ang guest, i-check in, at i-track ang arrival.",
    unit: "Ang available units ay naka-list sa Units page. Makikita mo ang unit type, floor, kag status.",
    login: "Kung kailangan mo ng tulong sa pag-login, gamitin ang correct email at password. Demo: admin@condo.com / admin123 o resident@condo.com / resident123",
    greeting: "Hello! Dako ako makatulong sa bookings, visitors, units, o account questions.",
    default: "Maganda ang tanong! Pwede ko tulungan ka sa bookings, visitors, units, o account access. Subukan mo i-tanong kung paano mag-book o check in ng visitor."
  },
  tagalog: {
    booking: "Para mag-book, pumunta sa Bookings page at pumili ng facility, date, at oras. Pwede din akong tumulong na suriin ang availability.",
    visitor: "Para sa visitor management, buksan ang Visitor Logs page. Maaari mong i-register ang guest, i-check in, at i-track ang pagdating.",
    unit: "Ang available units ay nakakita sa Units page. Makikita mo ang unit type, floor, at status.",
    login: "Kung kailangan mo ng tulong sa pag-login, gamitin ang tama email at password. Demo: admin@condo.com / admin123 o resident@condo.com / resident123",
    greeting: "Halo! Ako ay handang tumulong sa mga booking, bisita, unit, o account na katanungan.",
    default: "Magandang tanong! Pwede kang magtanong tungkol sa pag-book, pagpaparehistro ng bisita, availability ng unit, o tulong sa account."
  },
  english: {
    booking: "To make a booking, go to the Bookings page and choose the facility, date, and time. I can also help you check availability.",
    visitor: "For visitor management, open the Visitor Logs page. You can register a guest, check them in, and track their expected arrival.",
    unit: "Available units are listed in the Units page. You can view unit type, floor, and status there.",
    login: "If you need help logging in, use the correct email and password. Demo accounts are admin@condo.com / admin123 and resident@condo.com / resident123.",
    greeting: "Hi there! I can help with bookings, visitors, units, or account questions.",
    default: "Great question! I can help with bookings, visitor registration, unit availability, or account access. Try asking about availability or how to check in a visitor."
  }
};
const getBotReply = (message) => {
  const language = detectLanguage(message);
  const text = message.toLowerCase();
  const resp = responses[language];
  if (text.includes("booking") || text.includes("book") || text.includes("libro")) {
    return [resp.booking, language];
  }
  if (text.includes("visitor") || text.includes("guest") || text.includes("bisita") || text.includes("bumisita")) {
    return [resp.visitor, language];
  }
  if (text.includes("unit") || text.includes("available") || text.includes("room") || text.includes("kwarto")) {
    return [resp.unit, language];
  }
  if (text.includes("password") || text.includes("login") || text.includes("signin")) {
    return [resp.login, language];
  }
  if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("halo") || text.includes("dako")) {
    return [resp.greeting, language];
  }
  return [resp.default, language];
};
const initialMessages = [
  {
    id: "bot-1",
    sender: "bot",
    content: "Hello! I am the ONE SPATIAL ILOILO assistant. I can help you in English, Tagalog, or Ilonggo. Ask me about bookings, visitors, units, or your account. / Halo! Ako ang ONE SPATIAL ILOILO assistant. Makakatulong ako sa English, Tagalog, o Ilonggo. Magtanong tungkol sa bookings, visitors, units, o account. / Dako ako ang ONE SPATIAL ILOILO assistant. Pwede kita ko tulungan sa English, Tagalog, o Ilonggo. Magtanong sa mga booking, bisita, units, o account.",
    timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })
  }
];
const Route$3 = createFileRoute("/_app/admin/chat-multilang")({
  component: ChatBotPage
});
function ChatBotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    return () => setIsTyping(false);
  }, []);
  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    window.setTimeout(() => {
      const [reply] = getBotReply(text);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: reply,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 fade-in", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: { fontFamily: "'DM Serif Display', serif", color: "#0f1e42" }, children: "Chatbot" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "#6b7a99" }, children: "Ask the ONE SPATIAL ILOILO assistant for help with bookings, visitors, units, or account questions. Supports English, Tagalog, and Ilonggo." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col", style: { border: "1px solid #e8edf5", height: "calc(100vh - 200px)", minHeight: 500 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 border-b flex items-center gap-3", style: { borderColor: "#e8edf5", background: "#fafbfe" }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl flex items-center justify-center bg-[#0f1e42] text-white", children: /* @__PURE__ */ jsx(Bot, { size: 22 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", style: { color: "#0f1e42" }, children: "ONE SPATIAL ILOILO Assistant" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", style: { color: "#9aa3b8" }, children: "AI-powered help • English • Tagalog • Ilonggo" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
        messages.map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "max-w-xs lg:max-w-2xl px-4 py-3 rounded-3xl text-sm leading-relaxed",
            style: msg.sender === "user" ? { background: "#0f1e42", color: "#fff", borderBottomRightRadius: "8px" } : { background: "#f1f5f9", color: "#1a2040", borderBottomLeftRadius: "8px" },
            children: [
              msg.content,
              /* @__PURE__ */ jsx("div", { className: "text-xs mt-2", style: { color: msg.sender === "user" ? "rgba(255,255,255,0.6)" : "#9aa3b8" }, children: msg.timestamp })
            ]
          }
        ) }, msg.id)),
        isTyping && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "max-w-xs px-4 py-3 rounded-3xl text-sm leading-relaxed", style: { background: "#f1f5f9", color: "#1a2040" }, children: "Typing..." }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSend, className: "p-4 border-t flex gap-3", style: { borderColor: "#e8edf5" }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: "Ask in English, Tagalog, or Ilonggo...",
            className: "flex-1 px-4 py-3 rounded-2xl text-sm",
            style: { border: "1.5px solid #dde3ef", color: "#1a2040", background: "#f8fafc" }
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: !input.trim(),
            "aria-label": "Send message",
            className: "w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-50",
            style: { background: "#0f1e42" },
            children: /* @__PURE__ */ jsx(Send, { size: 18 })
          }
        )
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./chat-BIOpKW_B.js");
const Route$2 = createFileRoute("/_app/admin/chat")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./bookings-fXQtL1ho.js");
const Route$1 = createFileRoute("/_app/admin/bookings")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./analytics-CiUw1PZQ.js");
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);
const Route = createFileRoute("/_app/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$f.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$g
});
const AppRoute = Route$e.update({
  id: "/_app",
  getParentRoute: () => Route$g
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const AppUnitsRoute = Route$c.update({
  id: "/units",
  path: "/units",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$b.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppAdminIndexRoute = Route$a.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => AppRoute
});
const AppDashboardVisitorsRoute = Route$9.update({
  id: "/visitors",
  path: "/visitors",
  getParentRoute: () => AppDashboardRoute
});
const AppDashboardMessagesRoute = Route$8.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AppDashboardRoute
});
const AppDashboardBookingsRoute = Route$7.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => AppDashboardRoute
});
const AppAdminVisitsRoute = Route$6.update({
  id: "/admin/visits",
  path: "/admin/visits",
  getParentRoute: () => AppRoute
});
const AppAdminUsersRoute = Route$5.update({
  id: "/admin/users",
  path: "/admin/users",
  getParentRoute: () => AppRoute
});
const AppAdminUnitsRoute = Route$4.update({
  id: "/admin/units",
  path: "/admin/units",
  getParentRoute: () => AppRoute
});
const AppAdminChatMultilangRoute = Route$3.update({
  id: "/admin/chat-multilang",
  path: "/admin/chat-multilang",
  getParentRoute: () => AppRoute
});
const AppAdminChatRoute = Route$2.update({
  id: "/admin/chat",
  path: "/admin/chat",
  getParentRoute: () => AppRoute
});
const AppAdminBookingsRoute = Route$1.update({
  id: "/admin/bookings",
  path: "/admin/bookings",
  getParentRoute: () => AppRoute
});
const AppAdminAnalyticsRoute = Route.update({
  id: "/admin/analytics",
  path: "/admin/analytics",
  getParentRoute: () => AppRoute
});
const AppDashboardRouteChildren = {
  AppDashboardBookingsRoute,
  AppDashboardMessagesRoute,
  AppDashboardVisitorsRoute
};
const AppDashboardRouteWithChildren = AppDashboardRoute._addFileChildren(
  AppDashboardRouteChildren
);
const AppRouteChildren = {
  AppDashboardRoute: AppDashboardRouteWithChildren,
  AppUnitsRoute,
  AppAdminAnalyticsRoute,
  AppAdminBookingsRoute,
  AppAdminChatRoute,
  AppAdminChatMultilangRoute,
  AppAdminUnitsRoute,
  AppAdminUsersRoute,
  AppAdminVisitsRoute,
  AppAdminIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  RegisterRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ChatBotPage as C,
  router as r
};
