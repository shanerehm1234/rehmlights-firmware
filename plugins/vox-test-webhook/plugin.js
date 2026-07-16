// index.tsx
import { useState } from "react";
import { definePlugin } from "@voxcomposer/plugin-sdk";
import { jsx, jsxs } from "react/jsx-runtime";
var index_default = definePlugin({
  id: "com.rehmlights.test-webhook",
  name: "Test Webhook",
  version: "1.0.0",
  author: "rehmlights",
  description: "Loader smoke test \u2014 fires a webhook and has a hook-driven inspector.",
  trackType: "test-webhook",
  permissions: ["network"],
  color: "#E8623D",
  summarizeClip(clip) {
    const url = clip.data.url ?? "";
    return url ? `POST ${url.replace(/^https?:\/\//, "")}` : "Webhook \u2014 set URL";
  },
  onFrame(_ts, clip, api) {
    const url = clip.data.url ?? "";
    if (url) void api.sendHTTP(url, { method: "POST" }).catch((e) => api.log("webhook failed", e));
  },
  renderInspector(clip, { onChange }) {
    const url = clip.data.url ?? "";
    const [touched, setTouched] = useState(false);
    return /* @__PURE__ */ jsxs("label", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#718096" }, children: [
        "Webhook URL ",
        touched ? "\xB7 edited" : ""
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: url,
          placeholder: "http://device.local/hook",
          onChange: (e) => {
            setTouched(true);
            onChange({ url: e.target.value });
          },
          style: { background: "#0F1117", border: "1px solid #2D3748", borderRadius: 8, color: "#E2E8F0", padding: "8px 12px", fontSize: 13 }
        }
      )
    ] });
  }
});
export {
  index_default as default
};
