import "./style.css";

interface SpyState {
  rawText: string;
  cipherOffset: number;
  IsEncrypted: boolean;
}

let state: SpyState = {
  rawText: "",
  cipherOffset: 3,
  IsEncrypted: true,
};

const transformText = (text: string, offset: number): string => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code + offset);
    })
    .join("");
};

function ControlPanel(): string {
  return `
  <div class="panel">
  <label>Sikkerhetsnivå (Offset):</label>
  <input type="range" id="offset-slider" min="-10" value="${state.cipherOffset}">
  <span id="offset-value">${state.cipherOffset}</span>
  </div>
  `;
}

function Terminal(): string {
  const displayContext = state.IsEncrypted
    ? transformText(state.rawText, state.cipherOffset)
    : state.rawText;

  return `
    <div class="terminal">
      <div class="output">${displayContext || "VENTER PÅ INPUT..."}</div>
      <textarea id="spy-input" placeholder="Skriv din hemmelige melding her...">${state.rawText}</textarea>
    </div>
  `;
}

function render() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;

  if (app.innerHTML === "") {
    app.innerHTML = `
      <h1>AGENT DASHBOARD v1.0</h1>
      ${ControlPanel()}
      <div class="terminal">
        <div id="display-output" class="output">VENTER PÅ INPUT...</div>
        <textarea id="spy-input" placeholder="Skriv din hemmelige melding her..."></textarea>
      </div>
    `;
    setupListeners();
  }

  const outputDiv = document.querySelector<HTMLDivElement>("#display-output");
  const offsetValue = document.querySelector<HTMLSpanElement>("#offset-value");

  if (outputDiv) {
    const encrypted = transformText(state.rawText, state.cipherOffset);
    outputDiv.innerText = encrypted || "VENTER PÅ INPUT...";
  }

  if (offsetValue) {
    offsetValue.innerText = state.cipherOffset.toString();
  }
}

function setupListeners() {
  const input = document.querySelector<HTMLTextAreaElement>("#spy-input");
  const slider = document.querySelector<HTMLInputElement>("#offset-slider");

  input?.addEventListener("input", (e) => {
    state.rawText = (e.target as HTMLTextAreaElement).value;
    render();
  });

  slider?.addEventListener("input", (e) => {
    state.cipherOffset = parseInt((e.target as HTMLInputElement).value);
    render();
  });
}

render();
