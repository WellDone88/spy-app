import "./style.css";
import { transformText, decryptText } from "./cipher";

interface SpyState {
  rawText: string;
  cipherOffset: number;
  IsEncrypted: boolean; // Merk: Stor 'I' som i din kode
}

let state: SpyState = {
  rawText: "",
  cipherOffset: 3,
  IsEncrypted: true,
};

function ControlPanel(): string {
  const modelLab = state.IsEncrypted ? "MODUS: KRYPTER" : "MODUS: DEKRYPTER";

  return `
  <div class="panel">
    <button id="mode-toggle">${modelLab}</button>
    <label>Sikkerhetsnivå (Offset):</label>
    <input type="range" id="offset-slider" min="1" max="10" value="${state.cipherOffset}">
    <span id="offset-value">${state.cipherOffset}</span>
  </div>
  `;
}

function render() {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;

  // Vi tegner bare basen hvis appen er tom
  if (app.innerHTML === "") {
    app.innerHTML = `
      <h1>AGENT DASHBOARD v1.0</h1>
      <div id="controls-container">${ControlPanel()}</div>
      <div class="terminal">
        <div id="display-output" class="output">VENTER PÅ INPUT...</div>
        <textarea id="spy-input" placeholder="Skriv din hemmelige melding her..."></textarea>
      </div>
    `;
    setupListeners();
  }

  // Oppdaterer innholdet (uten å slette textarea så vi ikke mister fokus)
  const outputDiv = document.querySelector<HTMLDivElement>("#display-output");
  const offsetValue = document.querySelector<HTMLSpanElement>("#offset-value");
  const modeBtn = document.querySelector<HTMLButtonElement>("#mode-toggle");

  if (outputDiv) {
    const result = state.IsEncrypted
      ? transformText(state.rawText, state.cipherOffset)
      : decryptText(state.rawText, state.cipherOffset);
    outputDiv.innerText = result || "VENTER PÅ INPUT...";
  }

  if (offsetValue) {
    offsetValue.innerText = state.cipherOffset.toString();
  }

  if (modeBtn) {
    modeBtn.innerText = state.IsEncrypted
      ? "MODUS: KRYPTER"
      : "MODUS: DEKRYPTER";
  }
}

function setupListeners() {
  const input = document.querySelector<HTMLTextAreaElement>("#spy-input");
  const slider = document.querySelector<HTMLInputElement>("#offset-slider");
  const modeBtn = document.querySelector<HTMLButtonElement>("#mode-toggle");

  input?.addEventListener("input", (e) => {
    state.rawText = (e.target as HTMLTextAreaElement).value;
    render();
  });

  slider?.addEventListener("input", (e) => {
    state.cipherOffset = parseInt((e.target as HTMLInputElement).value);
    render();
  });

  modeBtn?.addEventListener("click", () => {
    state.IsEncrypted = !state.IsEncrypted;
    // Istedenfor å tømme hele appen, bare kjør render()
    // så oppdaterer den knappen og resultatet automatisk!
    render();
  });
}

// Start appen!
render();
