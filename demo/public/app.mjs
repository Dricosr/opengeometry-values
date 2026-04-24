const storageKey = "og-value-studio:setups";

const state = {
  library: null,
  preview: null,
  savedSetups: loadSavedSetups()
};

const elements = {
  quantitySelect: document.querySelector("#quantitySelect"),
  sampleSelect: document.querySelector("#sampleSelect"),
  parameterNameInput: document.querySelector("#parameterNameInput"),
  parameterIdInput: document.querySelector("#parameterIdInput"),
  parameterValueInput: document.querySelector("#parameterValueInput"),
  inputUnitSelect: document.querySelector("#inputUnitSelect"),
  presetSelect: document.querySelector("#presetSelect"),
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
  compositionPreview: document.querySelector("#compositionPreview"),
  friendlyPreview: document.querySelector("#friendlyPreview"),
  editPreview: document.querySelector("#editPreview"),
  previewJson: document.querySelector("#previewJson"),
  visualTestOutput: document.querySelector("#visualTestOutput"),
  runVisualTestsButton: document.querySelector("#runVisualTestsButton"),
  saveScenarioButton: document.querySelector("#saveScenarioButton"),
  savedSetups: document.querySelector("#savedSetups")
};

const debouncedRefresh = debounce(refreshPreview, 180);

bootstrap();

async function bootstrap() {
  bindEvents();
  await loadLibrary();
  renderSavedSetups();
}

function bindEvents() {
  elements.quantitySelect.addEventListener("change", () => {
    populateSamples();
    populateUnits();
    populatePresets();
    applySelectedSample();
  });

  elements.sampleSelect.addEventListener("change", applySelectedSample);
  elements.presetSelect.addEventListener("change", () => {
    applySelectedPreset();
    debouncedRefresh();
  });
  elements.runVisualTestsButton.addEventListener("click", runVisualTests);
  elements.saveScenarioButton.addEventListener("click", saveCurrentSetup);

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

async function loadLibrary() {
  const response = await fetch("/api/library");
  state.library = await response.json();

  populateQuantityOptions();
  populateSuffixModes();
  populateSamples();
  populateUnits();
  populatePresets();
  applySelectedSample();
}

function populateQuantityOptions() {
  const quantities = state.library.quantities.filter((quantity) => {
    const hasSamples = (state.library.samples[quantity.id] ?? []).length > 0;
    const hasPresets = (state.library.outputPresets[quantity.id] ?? []).length > 0;
    return hasSamples || hasPresets;
  });

  renderOptions(elements.quantitySelect, quantities.map((quantity) => ({
    value: quantity.id,
    label: quantity.label
  })));
}

function populateSuffixModes() {
  renderOptions(elements.suffixModeSelect, state.library.outputSuffixModes.map((mode) => ({
    value: mode,
    label: mode
  })));
}

function populateSamples() {
  const quantity = elements.quantitySelect.value;
  const samples = state.library.samples[quantity] ?? [];

  renderOptions(elements.sampleSelect, samples.map((sample) => ({
    value: sample.id,
    label: `${sample.name} · ${sample.input.value} ${sample.input.unit}`
  })));
}

function populateUnits() {
  const quantity = elements.quantitySelect.value;
  const units = state.library.quantities.find((entry) => entry.id === quantity)?.units ?? [];
  const options = units.map((unit) => ({
    value: unit,
    label: unit
  }));

  renderOptions(elements.inputUnitSelect, options);
  renderOptions(elements.outputUnitSelect, options);
}

function populatePresets() {
  const quantity = elements.quantitySelect.value;
  const presets = state.library.outputPresets[quantity] ?? [];

  renderOptions(elements.presetSelect, [
    {
      value: "",
      label: "Custom"
    },
    ...presets.map((preset) => ({
      value: preset.id,
      label: preset.name
    }))
  ]);
}

function applySelectedSample() {
  const quantity = elements.quantitySelect.value;
  const sample = (state.library.samples[quantity] ?? []).find((entry) => entry.id === elements.sampleSelect.value);

  if (!sample) {
    debouncedRefresh();
    return;
  }

  elements.parameterNameInput.value = sample.name;
  elements.parameterIdInput.value = sample.id;
  elements.parameterValueInput.value = String(sample.input.value);
  elements.inputUnitSelect.value = sample.input.unit;

  const recommendedPresetId = sample.recommendedOutputPresetIds[0] ?? "";
  if ([...elements.presetSelect.options].some((option) => option.value === recommendedPresetId)) {
    elements.presetSelect.value = recommendedPresetId;
  }

  applySelectedPreset();
  debouncedRefresh();
}

function applySelectedPreset() {
  const quantity = elements.quantitySelect.value;
  const preset = (state.library.outputPresets[quantity] ?? []).find((entry) => entry.id === elements.presetSelect.value);

  if (!preset) {
    elements.outputUnitSelect.value = elements.inputUnitSelect.value;
    elements.precisionInput.value = "0";
    elements.suffixModeSelect.value = "code";
    elements.prefixInput.value = "";
    elements.suffixInput.value = "";
    elements.showUnitCheckbox.checked = true;
    return;
  }

  elements.outputUnitSelect.value = preset.unit;
  elements.precisionInput.value = String(preset.precision ?? 0);
  elements.suffixModeSelect.value = preset.suffixMode;
  elements.prefixInput.value = preset.prefix ?? "";
  elements.suffixInput.value = preset.suffix ?? "";
  elements.showUnitCheckbox.checked = Boolean(preset.showUnit);
}

async function refreshPreview() {
  try {
    const response = await fetch("/api/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(getCurrentPayload())
    });
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error.message);
    }

    state.preview = result.preview;
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
      quantity: elements.quantitySelect.value,
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
  elements.previewStatus.textContent = "Preview generated from the local API.";
  elements.previewStatus.className = "status-banner success-banner";
  elements.inputSummary.textContent = `${preview.parameter.input.value} ${preview.parameter.input.unit}`.trim();
  elements.internalSummary.textContent = `${preview.internal.value} ${preview.internal.unit ?? ""}`.trim();
  elements.presetSummary.textContent = preview.output.presetId ?? "Custom";
  elements.displayPreview.textContent = preview.previews.display;
  elements.compositionPreview.textContent = preview.previews.composition;
  elements.friendlyPreview.textContent = preview.previews.friendly;
  elements.editPreview.textContent = preview.previews.edit;
  elements.previewJson.textContent = JSON.stringify(preview, null, 2);
}

function renderPreviewError(message) {
  elements.previewStatus.textContent = message;
  elements.previewStatus.className = "status-banner error-banner";
  elements.inputSummary.textContent = "-";
  elements.internalSummary.textContent = "-";
  elements.presetSummary.textContent = "-";
  elements.displayPreview.textContent = "-";
  elements.compositionPreview.textContent = "-";
  elements.friendlyPreview.textContent = "-";
  elements.editPreview.textContent = "-";
  elements.previewJson.textContent = JSON.stringify({ error: message }, null, 2);
}

async function runVisualTests() {
  elements.visualTestOutput.textContent = "Running tests...";
  const response = await fetch("/api/visual-tests/run", {
    method: "POST"
  });
  const result = await response.json();
  elements.visualTestOutput.textContent = JSON.stringify(result, null, 2);
}

function saveCurrentSetup() {
  const payload = getCurrentPayload();
  const snapshot = {
    id: payload.parameter.id || `custom:${Date.now()}`,
    title: payload.parameter.name || payload.parameter.id || "Custom Parameter",
    payload
  };

  state.savedSetups = [snapshot, ...state.savedSetups.filter((entry) => entry.id !== snapshot.id)].slice(0, 12);
  persistSavedSetups(state.savedSetups);
  renderSavedSetups();
}

function renderSavedSetups() {
  if (state.savedSetups.length === 0) {
    elements.savedSetups.innerHTML = "<p class=\"muted-copy\">Saved parameter and output setups will appear here.</p>";
    return;
  }

  elements.savedSetups.innerHTML = "";

  for (const setup of state.savedSetups) {
    const article = document.createElement("article");
    article.className = "saved-item";

    const title = document.createElement("strong");
    title.textContent = setup.title;

    const meta = document.createElement("span");
    meta.textContent = `${setup.payload.parameter.quantity} · ${setup.payload.output.presetId ?? "custom"}`;

    const loadButton = document.createElement("button");
    loadButton.type = "button";
    loadButton.className = "mini-button";
    loadButton.textContent = "Load";
    loadButton.addEventListener("click", () => loadSavedSetup(setup));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "mini-button muted-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteSavedSetup(setup.id));

    const buttonRow = document.createElement("div");
    buttonRow.className = "saved-item-actions";
    buttonRow.append(loadButton, deleteButton);

    article.append(title, meta, buttonRow);
    elements.savedSetups.append(article);
  }
}

function loadSavedSetup(setup) {
  const { parameter, output } = setup.payload;

  elements.quantitySelect.value = parameter.quantity;
  populateSamples();
  populateUnits();
  populatePresets();
  elements.parameterNameInput.value = parameter.name;
  elements.parameterIdInput.value = parameter.id;
  elements.parameterValueInput.value = parameter.input.value;
  elements.inputUnitSelect.value = parameter.input.unit;
  elements.presetSelect.value = output.presetId ?? "";
  applySelectedPreset();
  elements.outputUnitSelect.value = output.unit;
  elements.precisionInput.value = String(output.precision);
  elements.suffixModeSelect.value = output.suffixMode;
  elements.prefixInput.value = output.prefix;
  elements.suffixInput.value = output.suffix;
  elements.showUnitCheckbox.checked = Boolean(output.showUnit);
  refreshPreview();
}

function deleteSavedSetup(setupId) {
  state.savedSetups = state.savedSetups.filter((setup) => setup.id !== setupId);
  persistSavedSetups(state.savedSetups);
  renderSavedSetups();
}

function loadSavedSetups() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  } catch {
    return [];
  }
}

function persistSavedSetups(savedSetups) {
  localStorage.setItem(storageKey, JSON.stringify(savedSetups));
}

function renderOptions(select, options) {
  const currentValue = select.value;
  select.innerHTML = "";

  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    select.append(optionElement);
  }

  if ([...select.options].some((option) => option.value === currentValue)) {
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