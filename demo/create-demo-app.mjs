import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import {
  OUTPUT_SUFFIX_MODES,
  QUANTITY_TYPES,
  VALUE_TYPES,
  createValuePreview,
  outputPresetCatalog,
  parameterSampleCatalog,
  quantityProfileRegistry
} from "../src/index.mjs";
import { runVisualTests } from "./services/run-visual-tests.mjs";

const demoDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(demoDirectory, "public");

const formatLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const createQuantitySummary = (quantity) => ({
  id: quantity,
  label: formatLabel(quantity),
  units: quantityProfileRegistry.getProfile(quantity)?.getSupportedUnits() ?? []
});

const createLibraryPayload = () => ({
  quantities: Object.values(QUANTITY_TYPES).map(createQuantitySummary),
  valueTypes: Object.values(VALUE_TYPES),
  outputSuffixModes: Object.values(OUTPUT_SUFFIX_MODES),
  samples: parameterSampleCatalog.groupByQuantity(),
  outputPresets: outputPresetCatalog.groupByQuantity()
});

export const createDemoApp = ({ visualTestRunner = runVisualTests } = {}) => {
  const app = express();

  app.use(express.json());

  app.get("/api/library", (_request, response) => {
    response.json(createLibraryPayload());
  });

  app.get("/api/quantities", (_request, response) => {
    response.json(Object.values(QUANTITY_TYPES).map(createQuantitySummary));
  });

  app.get("/api/samples", (_request, response) => {
    response.json(parameterSampleCatalog.groupByQuantity());
  });

  app.get("/api/output-presets", (_request, response) => {
    response.json(outputPresetCatalog.groupByQuantity());
  });

  app.post("/api/preview", (request, response) => {
    try {
      response.json({
        ok: true,
        preview: createValuePreview(request.body)
      });
    } catch (error) {
      response.status(400).json({
        ok: false,
        error: {
          message: error.message
        }
      });
    }
  });

  app.post("/api/visual-tests/run", async (_request, response) => {
    try {
      const result = await visualTestRunner();
      response.status(result.ok ? 200 : 500).json(result);
    } catch (error) {
      response.status(500).json({
        ok: false,
        exitCode: 1,
        stdout: "",
        stderr: error.message
      });
    }
  });

  app.use(express.static(publicDirectory));

  app.use((request, response, next) => {
    if (request.path.startsWith("/api/")) {
      next();
      return;
    }

    response.sendFile(path.join(publicDirectory, "index.html"));
  });

  return app;
};