import { renderNav } from "/shared/nav.mjs";

const elements = {
  runVisualTestsButton: document.querySelector("#runVisualTestsButton"),
  visualTestOutput: document.querySelector("#visualTestOutput")
};

bootstrap();

async function bootstrap() {
  const library = await fetch("/api/library").then((r) => r.json());
  renderNav(library.quantities, { currentPage: "visual-tests", version: library.version });
  elements.runVisualTestsButton.addEventListener("click", runVisualTests);
}

async function runVisualTests() {
  elements.visualTestOutput.textContent = "Running tests...";
  const response = await fetch("/api/visual-tests/run", { method: "POST" });
  const result = await response.json();
  elements.visualTestOutput.innerHTML = Prism.highlight(
    JSON.stringify(result, null, 2),
    Prism.languages.json,
    "json"
  );
}
