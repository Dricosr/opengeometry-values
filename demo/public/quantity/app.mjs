import { loadLibrary, postPreview } from "/shared/api.mjs";
import { renderNav } from "/shared/nav.mjs";
import { QUANTITY_DESCRIPTIONS } from "/quantity/descriptions.mjs";

const currentQuantity = new URLSearchParams(location.search).get("q") ?? "";

const state = { library: null };

const elements = {
  quantityWorkspaceTitle: document.querySelector("#quantityWorkspaceTitle"),
  quantityWorkspaceDescription: document.querySelector("#quantityWorkspaceDescription"),
  sampleSelect: document.querySelector("#sampleSelect"),
  parameterNameInput: document.querySelector("#parameterNameInput"),
  parameterIdInput: document.querySelector("#parameterIdInput"),
  parameterValueInput: document.querySelector("#parameterValueInput"),
  inputUnitSelect: document.querySelector("#inputUnitSelect"),
  sampleCatalog: document.querySelector("#sampleCatalog"),
  sampleCatalogTitle: document.querySelector("#sampleCatalogTitle"),
  presetSelect: document.querySelector("#presetSelect"),
  presetCatalog: document.querySelector("#presetCatalog"),
  presetCatalogTitle: document.querySelector("#presetCatalogTitle"),
  outputUnitSelect: document.querySelector("#outputUnitSelect"),
  precisionInput: document.querySelector("#precisionInput"),
  suffixModeSelect: document.querySelector("#suffixModeSelect"),
  prefixInput: document.querySelector("#prefixInput"),
  suffixInput: document.querySelector("#suffixInput"),
  showUnitCheckbox: document.querySelector("#showUnitCheckbox"),
  previewStatus: document.querySelector("#previewStatus"),
  inputSummary: document.querySelector("#inputSummary"),
  internalSummary: document.querySelector("#internalSummary"),
  presetSummary: document.querySelector("#presetSummary"),
  displayPreview: document.querySelector("#displayPreview"),
editPreview: document.querySelector("#editPreview"),
  previewJson: document.querySelector("#previewJson"),
  sampleModal: document.querySelector("#sampleModal"),
  presetModal: document.querySelector("#presetModal"),
  parameterHelpButton: document.querySelector("#parameterHelpButton"),
  outputHelpButton: document.querySelector("#outputHelpButton"),
  closeSampleModal: document.querySelector("#closeSampleModal"),
  closePresetModal: document.querySelector("#closePresetModal")
};

const debouncedRefresh = debounce(refreshPreview, 180);

bootstrap();

async function bootstrap() {
  state.library = await loadLibrary();

  const activeQuantities = filterActiveQuantities(state.library);
  renderNav(activeQuantities, { currentPage: "quantity", currentQuantity, version: state.library.version });
  populateSuffixModes();
  syncWorkspace();
  bindEvents();
}

const filterActiveQuantities = (library) =>
  library.quantities.filter((q) => {
    const hasSamples = (library.samples[q.id] ?? []).length > 0;
    const hasPresets = (library.outputPresets[q.id] ?? []).length > 0;
    return hasSamples || hasPresets;
  });

function bindEvents() {
  elements.sampleSelect.addEventListener("change", () => {
    applySelectedSample();
    renderSampleCatalog();
  });
  elements.presetSelect.addEventListener("change", () => {
    applySelectedPreset();
    renderPresetCatalog();
    debouncedRefresh();
  });

  elements.parameterHelpButton.addEventListener("click", () => elements.sampleModal.showModal());
  elements.outputHelpButton.addEventListener("click", () => elements.presetModal.showModal());

  elements.closeSampleModal.addEventListener("click", () => elements.sampleModal.close());
  elements.closePresetModal.addEventListener("click", () => elements.presetModal.close());

  for (const modal of [elements.sampleModal, elements.presetModal]) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });
  }

  for (const control of [
    elements.parameterNameInput,
    elements.parameterIdInput,
    elements.parameterValueInput,
    elements.inputUnitSelect,
    elements.outputUnitSelect,
    elements.precisionInput,
    elements.suffixModeSelect,
    elements.prefixInput,
    elements.suffixInput,
    elements.showUnitCheckbox
  ]) {
    control.addEventListener("input", debouncedRefresh);
    control.addEventListener("change", debouncedRefresh);
  }
}

function syncWorkspace() {
  const quantityMeta = state.library.quantities.find((q) => q.id === currentQuantity);
  const samples = state.library.samples[currentQuantity] ?? [];
  const presets = state.library.outputPresets[currentQuantity] ?? [];
  const label = quantityMeta?.label ?? currentQuantity;

  document.title = `${label} - OpenGeometry Value Studio`;
  elements.quantityWorkspaceTitle.textContent = `${label} Studio`;
  renderIntroDescription(currentQuantity, label, samples.length, presets.length);

  populateSamples();
  populateUnits();
  populatePresets();
  renderSampleCatalog();
  renderPresetCatalog();
  applySelectedSample();
}

function renderIntroDescription(quantityId, label, sampleCount, presetCount) {
  const desc = QUANTITY_DESCRIPTIONS[quantityId];

  if (!desc) {
    elements.quantityWorkspaceDescription.innerHTML =
      `<p class="hero-copy">${sampleCount} samples and ${presetCount} output cases for ${label.toLowerCase()} workflows.</p>`;
    return;
  }

  const useCaseItems = desc.useCases.map((u) => `<li>${u}</li>`).join("");
  const exampleItems = desc.examples.map((e) =>
    `<div class="intro-example-row">
      <span class="intro-example-label">${e.label}</span>
      <code class="intro-example-value">${e.value}</code>
      <span class="intro-example-note">${e.note}</span>
    </div>`
  ).join("");

  elements.quantityWorkspaceDescription.innerHTML = `
    <p class="hero-copy intro-summary">${desc.summary}</p>
    <div class="intro-columns">
      <div>
        <p class="intro-section-label">Use cases</p>
        <ul class="intro-use-cases">${useCaseItems}</ul>
      </div>
      <div>
        <p class="intro-section-label">Typical values</p>
        <div class="intro-examples">${exampleItems}</div>
      </div>
    </div>
  `;
}

function populateSuffixModes() {
  renderOptions(elements.suffixModeSelect, state.library.outputSuffixModes.map((mode) => ({
    value: mode,
    label: mode
  })));
}

function populateSamples() {
  const samples = state.library.samples[currentQuantity] ?? [];
  renderOptions(elements.sampleSelect, samples.map((s) => ({
    value: s.id,
    label: `${s.name} · ${s.input.value} ${s.input.unit}`
  })));
}

function populateUnits() {
  const units = state.library.quantities.find((q) => q.id === currentQuantity)?.units ?? [];
  const options = units.map((unit) => ({ value: unit, label: unit }));
  renderOptions(elements.inputUnitSelect, options);
  renderOptions(elements.outputUnitSelect, options);
}

function populatePresets() {
  const presets = state.library.outputPresets[currentQuantity] ?? [];
  renderOptions(elements.presetSelect, [
    { value: "", label: "Custom" },
    ...presets.map((p) => ({ value: p.id, label: p.name }))
  ]);
}

function applySelectedSample() {
  const sample = (state.library.samples[currentQuantity] ?? []).find(
    (s) => s.id === elements.sampleSelect.value
  );

  if (!sample) {
    renderSampleCatalog();
    debouncedRefresh();
    return;
  }

  elements.parameterNameInput.value = sample.name;
  elements.parameterIdInput.value = sample.id;
  elements.parameterValueInput.value = String(sample.input.value);
  elements.inputUnitSelect.value = sample.input.unit;

  const recommendedPresetId = sample.recommendedOutputPresetIds[0] ?? "";
  if ([...elements.presetSelect.options].some((o) => o.value === recommendedPresetId)) {
    elements.presetSelect.value = recommendedPresetId;
  }

  applySelectedPreset();
  renderSampleCatalog();
  debouncedRefresh();
}

function applySelectedPreset() {
  const preset = (state.library.outputPresets[currentQuantity] ?? []).find(
    (p) => p.id === elements.presetSelect.value
  );

  if (!preset) {
    elements.outputUnitSelect.value = elements.inputUnitSelect.value;
    elements.precisionInput.value = "0";
    elements.suffixModeSelect.value = "code";
    elements.prefixInput.value = "";
    elements.suffixInput.value = "";
    elements.showUnitCheckbox.checked = true;
    renderPresetCatalog();
    return;
  }

  elements.outputUnitSelect.value = preset.unit;
  elements.precisionInput.value = String(preset.precision ?? 0);
  elements.suffixModeSelect.value = preset.suffixMode;
  elements.prefixInput.value = preset.prefix ?? "";
  elements.suffixInput.value = preset.suffix ?? "";
  elements.showUnitCheckbox.checked = Boolean(preset.showUnit);
  renderPresetCatalog();
}

function renderSampleCatalog() {
  const samples = state.library.samples[currentQuantity] ?? [];
  const quantityLabel = state.library.quantities.find((q) => q.id === currentQuantity)?.label ?? currentQuantity;

  elements.sampleCatalogTitle.textContent = `${samples.length} samples - ${quantityLabel}`;
  elements.sampleCatalog.innerHTML = "";

  for (const sample of samples) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `catalog-card${sample.id === elements.sampleSelect.value ? " active-card" : ""}`;
    button.addEventListener("click", () => {
      elements.sampleSelect.value = sample.id;
      applySelectedSample();
      elements.sampleModal.close();
    });
    button.innerHTML = `
      <span class="catalog-kicker">${sample.input.value} ${sample.input.unit}</span>
      <strong>${sample.name}</strong>
      <p>${sample.description}</p>
    `;
    elements.sampleCatalog.append(button);
  }
}

function renderPresetCatalog() {
  const presets = state.library.outputPresets[currentQuantity] ?? [];
  const quantityLabel = state.library.quantities.find((q) => q.id === currentQuantity)?.label ?? currentQuantity;

  elements.presetCatalogTitle.textContent = `${presets.length} output cases - ${quantityLabel}`;
  elements.presetCatalog.innerHTML = "";

  for (const preset of presets) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `catalog-card${preset.id === elements.presetSelect.value ? " active-card" : ""}`;
    button.addEventListener("click", () => {
      elements.presetSelect.value = preset.id;
      applySelectedPreset();
      debouncedRefresh();
      elements.presetModal.close();
    });
    button.innerHTML = `
      <span class="catalog-kicker">${preset.unit} · p${preset.precision} · ${preset.suffixMode}</span>
      <strong>${preset.name}</strong>
      <p>${preset.description}</p>
    `;
    elements.presetCatalog.append(button);
  }
}

async function refreshPreview() {
  try {
    const result = await postPreview(getCurrentPayload());

    if (!result.ok) {
      throw new Error(result.error.message);
    }

    renderPreview(result.preview);
  } catch (error) {
    renderPreviewError(error.message);
  }
}

function getCurrentPayload() {
  return {
    parameter: {
      id: elements.parameterIdInput.value.trim(),
      name: elements.parameterNameInput.value.trim(),
      quantity: currentQuantity,
      valueType: "float",
      input: {
        value: elements.parameterValueInput.value.trim(),
        unit: elements.inputUnitSelect.value
      }
    },
    output: {
      presetId: elements.presetSelect.value || undefined,
      unit: elements.outputUnitSelect.value || undefined,
      precision: Number(elements.precisionInput.value),
      showUnit: elements.showUnitCheckbox.checked,
      suffixMode: elements.suffixModeSelect.value,
      prefix: elements.prefixInput.value,
      suffix: elements.suffixInput.value
    }
  };
}

function renderPreview(preview) {
  elements.previewStatus.hidden = true;
  elements.previewStatus.textContent = "";
  elements.inputSummary.textContent = `${preview.parameter.input.value} ${preview.parameter.input.unit}`.trim();
  elements.internalSummary.textContent = `${preview.internal.value} ${preview.internal.unit ?? ""}`.trim();
  elements.presetSummary.textContent = preview.output.presetId ?? "Custom";
  elements.displayPreview.textContent = preview.previews.display;
elements.editPreview.textContent = preview.previews.edit;
  elements.previewJson.innerHTML = Prism.highlight(
    JSON.stringify(preview, null, 2),
    Prism.languages.json,
    "json"
  );
}

function renderPreviewError(message) {
  elements.previewStatus.hidden = false;
  elements.previewStatus.textContent = message;
  elements.previewStatus.className = "status-banner error-banner";
  elements.inputSummary.textContent = "-";
  elements.internalSummary.textContent = "-";
  elements.presetSummary.textContent = "-";
  elements.displayPreview.textContent = "-";
elements.editPreview.textContent = "-";
  elements.previewJson.innerHTML = Prism.highlight(
    JSON.stringify({ error: message }, null, 2),
    Prism.languages.json,
    "json"
  );
}

function renderOptions(select, options) {
  const currentValue = select.value;
  select.innerHTML = "";

  for (const option of options) {
    const el = document.createElement("option");
    el.value = option.value;
    el.textContent = option.label;
    select.append(el);
  }

  if ([...select.options].some((o) => o.value === currentValue)) {
    select.value = currentValue;
  }
}

function debounce(callback, waitInMilliseconds) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), waitInMilliseconds);
  };
}
