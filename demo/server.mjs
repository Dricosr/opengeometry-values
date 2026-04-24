import { createDemoApp } from "./create-demo-app.mjs";

const port = Number(process.env.PORT ?? 4173);
const app = createDemoApp();

app.listen(port, () => {
  console.log(`OpenGeometry Values demo running at http://localhost:${port}`);
});