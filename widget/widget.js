(function () {
  const scriptTag = document.currentScript;
  const businessId = scriptTag?.getAttribute("data-business-id");
  const apiBase = scriptTag?.getAttribute("data-api-base") || "http://localhost:4000";

  if (!businessId) {
    console.error("SupportAI widget missing data-business-id attribute.");
    return;
  }

  const container = document.createElement("div");
  container.id = "supportai-widget";
  container.style.position = "fixed";
  container.style.bottom = "24px";
  container.style.right = "24px";
  container.style.width = "320px";
  container.style.background = "white";
  container.style.borderRadius = "16px";
  container.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.12)";
  container.style.fontFamily = "Inter, system-ui, sans-serif";
  container.innerHTML = `
    <div style="background:#3b82f6;color:white;padding:12px 16px;border-radius:16px 16px 0 0;font-weight:600;">SupportAI</div>
    <div id="supportai-messages" style="padding:12px;height:240px;overflow-y:auto;font-size:13px;color:#0f172a;"></div>
    <form id="supportai-form" style="display:flex;gap:8px;padding:12px;border-top:1px solid #e2e8f0;">
      <input id="supportai-input" style="flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:8px;font-size:13px;" placeholder="Ask a question..." />
      <button style="background:#3b82f6;color:white;border:none;border-radius:8px;padding:8px 12px;font-size:13px;">Send</button>
    </form>
  `;

  document.body.appendChild(container);

  const messages = container.querySelector("#supportai-messages");
  const form = container.querySelector("#supportai-form");
  const input = container.querySelector("#supportai-input");

  const appendMessage = (content, sender) => {
    const bubble = document.createElement("div");
    bubble.style.marginBottom = "8px";
    bubble.style.padding = "8px 10px";
    bubble.style.borderRadius = "10px";
    bubble.style.maxWidth = "90%";
    if (sender === "visitor") {
      bubble.style.background = "#3b82f6";
      bubble.style.color = "white";
      bubble.style.marginLeft = "auto";
    } else {
      bubble.style.background = "#f1f5f9";
      bubble.style.color = "#0f172a";
    }
    bubble.textContent = content;
    messages?.appendChild(bubble);
    messages?.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
  };

  appendMessage("Hi! How can I help you today?", "assistant");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input?.value?.trim();
    if (!value) return;
    appendMessage(value, "visitor");
    if (input) input.value = "";

    const response = await fetch(`${apiBase}/api/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, message: value })
    });

    const data = await response.json();
    appendMessage(data.answer || "Thanks for reaching out!", "assistant");
  });
})();
