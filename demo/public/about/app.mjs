import { loadLibrary } from "/shared/api.mjs";
import { renderNav } from "/shared/nav.mjs";

bootstrap();

async function bootstrap() {
  const library = await loadLibrary();
  const activeQuantities = library.quantities.filter((q) => {
    const hasSamples = (library.samples[q.id] ?? []).length > 0;
    const hasPresets = (library.outputPresets[q.id] ?? []).length > 0;
    return hasSamples || hasPresets;
  });
  renderNav(activeQuantities, { currentPage: "about", version: library.version });
}
