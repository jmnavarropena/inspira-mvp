import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Fix para iOS viewport height
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// Configurar viewport height inicial y en resize
setViewportHeight();
window.addEventListener("resize", setViewportHeight);
window.addEventListener("orientationchange", setViewportHeight);

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
