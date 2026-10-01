// Theme switch and copy button. The page works without this script; it only adds the two controls.
const root = document.documentElement;
const dark = matchMedia("(prefers-color-scheme: dark)");
const current = () => root.dataset.theme ?? (dark.matches ? "dark" : "light");

for (const button of document.querySelectorAll("[data-theme-toggle]")) {
  // The label names what a click does: switch to the other mode.
  const label = () => button.setAttribute("aria-label", current() === "dark" ? button.dataset.labelLight : button.dataset.labelDark);
  label();
  dark.addEventListener("change", label);
  button.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("ww-site-theme", next);
    } catch {
      // Private mode or blocked storage: the choice lasts for this page only.
    }
    label();
  });
}

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    // Copy the command as one line, so it also runs in shells without line continuations.
    const text = document.getElementById(button.dataset.copy).textContent.replace(/\s*\\\n\s*/g, " ");
    const status = button.parentElement.querySelector("[data-copy-status]");
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = button.dataset.labelDone;
      setTimeout(() => (status.textContent = ""), 2000);
    } catch {
      // No clipboard access (e.g. plain http): the command stays selectable by hand.
    }
  });
}
