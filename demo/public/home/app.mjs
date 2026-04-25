import { loadLibrary } from "/shared/api.mjs";
import { renderNav } from "/shared/nav.mjs";

bootstrap();

async function bootstrap() {
  const library = await loadLibrary();
  const activeQuantities = filterActiveQuantities(library);
  renderNav(activeQuantities, { currentPage: "home", version: library.version });
  highlightCodeBlocks();
}

const filterActiveQuantities = (library) =>
  library.quantities.filter((q) => {
    const hasSamples = (library.samples[q.id] ?? []).length > 0;
    const hasPresets = (library.outputPresets[q.id] ?? []).length > 0;
    return hasSamples || hasPresets;
  });

function highlightCodeBlocks() {
  for (const block of document.querySelectorAll(".code-block, .inline-code")) {
    block.innerHTML = Prism.highlight(
      block.textContent,
      Prism.languages.javascript,
      "javascript"
    );
  }
}
