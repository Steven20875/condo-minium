import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Send } from "lucide-react";
import { e as mockConversations } from "./mockData-DU8hdjTT.js";
function ResidentMessagesPage() {
  const [messages, setMessages] = useState(mockConversations.find((c) => c.participantId === "1")?.messages ?? []);
  const [input, setInput] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = {
      id: `m${Date.now()}`,
      senderId: "1",
      senderName: "Maria Santos",
      content: input.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      read: false
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 lg:p-8 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 fade-in", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-1", style: {
        fontFamily: "'DM Serif Display', serif",
        color: "#0f1e42"
      }, children: "Messages" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", style: {
        color: "#6b7a99"
      }, children: "Chat with building administration" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col", style: {
      border: "1px solid #e8edf5",
      height: "calc(100vh - 220px)",
      minHeight: 400
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 border-b flex items-center gap-3", style: {
        borderColor: "#e8edf5",
        background: "#fafbfe"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white", style: {
          background: "#0f1e42"
        }, children: "A" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", style: {
            color: "#0f1e42"
          }, children: "ONE SPATIAL ILOILO Administration" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", style: {
            color: "#059669"
          }, children: "Online" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-3", children: messages.map((msg) => {
        const isMe = msg.senderId !== "admin";
        return /* @__PURE__ */ jsx("div", { className: `flex ${isMe ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed", style: isMe ? {
          background: "#0f1e42",
          color: "#fff",
          borderBottomRightRadius: "4px"
        } : {
          background: "#f1f5f9",
          color: "#1a2040",
          borderBottomLeftRadius: "4px"
        }, children: [
          msg.content,
          /* @__PURE__ */ jsx("div", { className: "text-xs mt-1", style: {
            color: isMe ? "rgba(255,255,255,0.5)" : "#9aa3b8"
          }, children: msg.timestamp })
        ] }) }, msg.id);
      }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSend, className: "p-4 border-t flex gap-3", style: {
        borderColor: "#e8edf5"
      }, children: [
        /* @__PURE__ */ jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: "Type your message…", className: "flex-1 px-4 py-2.5 rounded-xl text-sm", style: {
          border: "1.5px solid #dde3ef",
          color: "#1a2040",
          background: "#f8fafc"
        } }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: !input.trim(), className: "w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50", style: {
          background: "#0f1e42"
        }, children: /* @__PURE__ */ jsx(Send, { size: 17 }) })
      ] })
    ] })
  ] });
}
export {
  ResidentMessagesPage as component
};
