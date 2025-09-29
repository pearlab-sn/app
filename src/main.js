const appName = import.meta.env.VITE_APP_NAME;
import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import logoUrl from "./assets/logo.png";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>${appName}</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;
const img = document.createElement("img");
img.src = logoUrl;
img.alt = "logo";
img.style.height = "60px";
document.querySelector("#app").appendChild(img);

setupCounter(document.querySelector("#counter"));

const loadBtn = document.createElement("button");
loadBtn.textContent = "Load posts";
loadBtn.style =
  "margin-top:12px;padding:8px 12px;border:1px solid #ccc;border-radius:8px";
const list = document.createElement("ul");

document.querySelector("#app").append(loadBtn, list);

loadBtn.addEventListener("click", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const posts = await res.json();
  list.innerHTML = posts.map((p) => `<li>${p.title}</li>`).join("");
});

const dynBtn = document.createElement("button");
dynBtn.textContent = "Load module";
dynBtn.style =
  "margin-top:12px;padding:8px 12px;border:1px solid #ccc;border-radius:8px";
document.querySelector("#app").append(dynBtn);

dynBtn.addEventListener("click", async () => {
  const { greet } = await import("./utils.js"); // ← ここが“動的 import”
  alert(greet("Vite"));
});
