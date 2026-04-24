
# OpenGeometry Values

Lib em  **JavaScript puro** , usando arquivos  **`.mjs`** , padrão  **ES Modules** , acoplada ao **Math.js** para conversão, unidade e formatação numérica.

Objetivo:

```txt
valor + tipo + grandeza + unidade + input original + valor interno + display
```

---

# 1. Responsabilidade do Math.js

O Math.js será usado para:

```txt
conversão de unidades
parse/control de unidades
validação dimensional básica
formatação numérica
suporte a unidades físicas conhecidas
```

Exemplos:

```js
import { unit, format } from "mathjs";

unit(2000, "mm").toNumber("m");
// 2

unit(90, "deg").toNumber("rad");
// 1.5707963267948966
```

---

# 2. Responsabilidade do OpenGeometry Values

A nossa lib cuida do que é específico do sistema:

```txt
tipo lógico do valor
grandeza técnica
unidade interna por grandeza
input original do usuário
normalização para unidade interna
resolução interna
precisão máxima permitida na UI
formatação para leitura
formatação para edição
regras de exibição
```

O Math.js calcula.
O OpenGeometry define as regras de domínio.

---

# 3. Stack

```json
{
  "type": "module",
  "dependencies": {
    "mathjs": "^14.0.0"
  }
}
```

Todos os arquivos:

```txt
.mjs
```

Imports:

```js
import { unit, format } from "mathjs";
```

---

# 4. Estrutura inicial do repo

```txt
opengeometry-values/
  package.json

  src/
    constants/
      value-types.mjs
      quantity-types.mjs
      internal-units.mjs
      internal-resolution.mjs
      unit-symbols.mjs

    core/
      create-value.mjs
      convert-value.mjs
      apply-internal-resolution.mjs
      get-max-display-precision.mjs
      resolve-display-precision.mjs
      format-display-value.mjs
      format-edit-value.mjs

    index.mjs
```

---

# 5. Tipos de valor

Arquivo:

```txt
src/constants/value-types.mjs
```

```js
export const VALUE_TYPES = Object.freeze({
  STRING: "string",
  INTEGER: "integer",
  FLOAT: "float",
  BOOLEAN: "boolean"
});
```

MVP:

```txt
string
integer
float
boolean
```

Futuro:

```txt
enum
date
formula
reference
json
```

---

# 6. Grandezas iniciais

Arquivo:

```txt
src/constants/quantity-types.mjs
```

```js
export const QUANTITY_TYPES = Object.freeze({
  NONE: "none",
  LENGTH: "length",
  AREA: "area",
  VOLUME: "volume",
  ANGLE: "angle",
  TEMPERATURE: "temperature",
  MASS: "mass",
  FORCE: "force",
  PRESSURE: "pressure",
  TIME: "time",
  RATIO: "ratio"
});
```

MVP suficiente para engenharia/CAD/piping.

---

# 7. Unidades internas

Arquivo:

```txt
src/constants/internal-units.mjs
```

```js
export const INTERNAL_UNITS = Object.freeze({
  none: null,

  length: "m",
  area: "m^2",
  volume: "m^3",

  angle: "rad",
  temperature: "degC",

  mass: "kg",
  force: "N",
  pressure: "Pa",
  time: "s",

  ratio: null
});
```

Decisões:

| Grandeza    | Unidade interna |
| ----------- | --------------: |
| Comprimento |           `m` |
| Área       |         `m^2` |
| Volume      |         `m^3` |
| Ângulo     |         `rad` |
| Temperatura |        `degC` |
| Massa       |          `kg` |
| Força      |           `N` |
| Pressão    |          `Pa` |
| Tempo       |           `s` |

Observação importante:

```txt
Área = m²
Volume = m³
```

No Math.js usamos:

```txt
m^2
m^3
```

Na UI exibimos:

```txt
m²
m³
```

---

# 8. Separador decimal

Regra definida:

```txt
Inputs numéricos editáveis devem usar "." como separador decimal.
Separador de milhar não deve ser aceito no campo editável.
```

Aceito:

```txt
10
10.5
-10.5
0.25
2000.25
```

Não aceito:

```txt
10,5
1,000
1.000,25
2 000.25
```

Motivo: evita ambiguidade em JavaScript, JSON, Math.js, fórmulas, APIs e interoperabilidade.

Parser base:

```js
export function parseNumber(text) {
  const value = String(text).trim();

  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    throw new Error(`Invalid numeric value: ${text}`);
  }

  return Number(value);
}
```

---

# 9. Resolução interna

Definimos que o sistema deve chegar no máximo a:

```txt
0.1 mm
```

Como comprimento é salvo internamente em metro:

```txt
0.1 mm = 0.0001 m
```

Arquivo:

```txt
src/constants/internal-resolution.mjs
```

```js
export const INTERNAL_RESOLUTION = Object.freeze({
  length: {
    unit: "m",
    step: 0.0001
  },

  none: null,
  area: null,
  volume: null,
  angle: null,
  temperature: null,
  mass: null,
  force: null,
  pressure: null,
  time: null,
  ratio: null
});
```

Por enquanto, a resolução interna fica travada apenas para `length`.

Depois podemos definir resolução para:

```txt
angle
area
volume
pressure
temperature
```

Mas não vale antecipar isso agora.

---

# 10. Aplicar resolução interna

Arquivo:

```txt
src/core/apply-internal-resolution.mjs
```

```js
import { INTERNAL_RESOLUTION } from "../constants/internal-resolution.mjs";

export function applyInternalResolution(value, quantity) {
  const resolution = INTERNAL_RESOLUTION[quantity];

  if (!resolution || typeof value !== "number") {
    return value;
  }

  return Math.round(value / resolution.step) * resolution.step;
}
```

Exemplo:

```js
applyInternalResolution(2.123456, "length");
// 2.1235
```

Ou seja:

```txt
2.123456 m vira 2.1235 m
```

Equivalente a:

```txt
2123.456 mm vira 2123.5 mm
```

---

# 11. Modelo de valor salvo

Estrutura base:

```js
{
  valueType: "float",
  quantity: "length",

  input: {
    text: "2002",
    value: 2002,
    unit: "mm"
  },

  internal: {
    value: 2.002,
    unit: "m"
  }
}
```

Esse modelo preserva:

```txt
texto digitado pelo usuário
valor digitado
unidade digitada
valor convertido para unidade interna
unidade interna usada pelo sistema
```

Regra importante:

```txt
A UI pode mostrar o input original, mas cálculo, geometria e interoperabilidade devem usar sempre internal.
```

---

# 12. Criar valor a partir do input

Arquivo:

```txt
src/core/create-value.mjs
```

```js
import { unit } from "mathjs";
import { INTERNAL_UNITS } from "../constants/internal-units.mjs";
import { applyInternalResolution } from "./apply-internal-resolution.mjs";

export function createValue({ text, valueType, quantity, inputUnit }) {
  if (valueType === "string") {
    return {
      valueType,
      quantity,
      input: { text, value: text },
      internal: { value: text }
    };
  }

  if (valueType === "boolean") {
    const value = parseBoolean(text);

    return {
      valueType,
      quantity,
      input: { text, value },
      internal: { value }
    };
  }

  const numericValue = parseNumber(text);
  const internalUnit = INTERNAL_UNITS[quantity];

  if (!internalUnit || !inputUnit) {
    return {
      valueType,
      quantity,
      input: { text, value: numericValue, unit: inputUnit },
      internal: { value: numericValue, unit: inputUnit }
    };
  }

  const convertedValue = unit(numericValue, inputUnit).toNumber(internalUnit);
  const internalValue = applyInternalResolution(convertedValue, quantity);

  return {
    valueType,
    quantity,
    input: { text, value: numericValue, unit: inputUnit },
    internal: { value: internalValue, unit: internalUnit }
  };
}

function parseNumber(text) {
  const value = String(text).trim();

  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    throw new Error(`Invalid numeric value: ${text}`);
  }

  return Number(value);
}

function parseBoolean(text) {
  const value = String(text).trim().toLowerCase();

  return value === "true" || value === "yes" || value === "1";
}
```

---

# 13. Conversão direta

Arquivo:

```txt
src/core/convert-value.mjs
```

```js
import { unit } from "mathjs";

export function convertValue({ value, fromUnit, toUnit }) {
  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return value;
  }

  return unit(value, fromUnit).toNumber(toUnit);
}
```

Exemplo:

```js
convertValue({
  value: 2000,
  fromUnit: "mm",
  toUnit: "m"
});
// 2
```

---

# 14. Símbolos de UI

Arquivo:

```txt
src/constants/unit-symbols.mjs
```

```js
export const UNIT_SYMBOLS = Object.freeze({
  m: "m",
  cm: "cm",
  mm: "mm",

  "m^2": "m²",
  "m^3": "m³",

  rad: "rad",
  deg: "°",

  degC: "°C",
  degF: "°F",
  K: "K",

  kg: "kg",

  N: "N",
  kN: "kN",

  Pa: "Pa",
  kPa: "kPa",
  MPa: "MPa",
  bar: "bar",

  s: "s",
  min: "min",
  h: "h",

  percent: "%"
});
```

---

# 15. Precisão máxima da UI

A UI não pode exibir/editar com mais precisão do que o sistema armazena.

Para comprimento:

```txt
resolução interna = 0.1 mm
```

Então:

| Unidade da UI | Resolução equivalente | Máximo de casas |
| ------------- | ----------------------: | ---------------: |
| `m`         |            `0.0001 m` |                4 |
| `cm`        |             `0.01 cm` |                2 |
| `mm`        |              `0.1 mm` |                1 |

Arquivo:

```txt
src/core/get-max-display-precision.mjs
```

```js
import { unit } from "mathjs";
import { INTERNAL_RESOLUTION } from "../constants/internal-resolution.mjs";

export function getMaxDisplayPrecision(quantity, displayUnit) {
  const resolution = INTERNAL_RESOLUTION[quantity];

  if (!resolution || !displayUnit) {
    return null;
  }

  const stepInDisplayUnit = unit(resolution.step, resolution.unit).toNumber(displayUnit);

  return countDecimals(stepInDisplayUnit);
}

function countDecimals(value) {
  const text = value.toFixed(12).replace(/0+$/, "");
  const dotIndex = text.indexOf(".");

  if (dotIndex === -1) {
    return 0;
  }

  return text.length - dotIndex - 1;
}
```

---

# 16. Resolver precisão final

Arquivo:

```txt
src/core/resolve-display-precision.mjs
```

```js
import { getMaxDisplayPrecision } from "./get-max-display-precision.mjs";

export function resolveDisplayPrecision(quantity, displayUnit, requestedPrecision) {
  const maxPrecision = getMaxDisplayPrecision(quantity, displayUnit);

  if (maxPrecision === null) {
    return requestedPrecision ?? 2;
  }

  if (requestedPrecision === undefined || requestedPrecision === null) {
    return maxPrecision;
  }

  return Math.min(requestedPrecision, maxPrecision);
}
```

Exemplo:

```js
resolveDisplayPrecision("length", "mm", 3);
// 1
```

Porque a UI não deve exibir:

```txt
2000.123 mm
```

Se o sistema só garante:

```txt
2000.1 mm
```

---

# 17. Formatação para leitura

Modo leitura é o valor user friendly.

Exemplo:

```txt
2.002 m -> 2 m
```

Arquivo:

```txt
src/core/format-display-value.mjs
```

```js
import { format } from "mathjs";
import { UNIT_SYMBOLS } from "../constants/unit-symbols.mjs";
import { convertValue } from "./convert-value.mjs";
import { resolveDisplayPrecision } from "./resolve-display-precision.mjs";

export function formatDisplayValue(ogValue, options = {}) {
  const { internal, quantity } = ogValue;

  if (typeof internal.value !== "number") {
    return String(internal.value ?? "");
  }

  const displayUnit = options.unit ?? internal.unit;

  const displayValue = convertValue({
    value: internal.value,
    fromUnit: internal.unit,
    toUnit: displayUnit
  });

  const precision = resolveDisplayPrecision(
    quantity,
    displayUnit,
    options.precision
  );

  const text = format(displayValue, {
    notation: "fixed",
    precision
  });

  const prefix = options.prefix ?? "";
  const suffix = resolveSuffix(displayUnit, options);

  return `${prefix}${text}${suffix}`;
}

function resolveSuffix(unitName, options) {
  if (options.suffix !== undefined) {
    return options.suffix;
  }

  if (options.showUnit === false) {
    return "";
  }

  return ` ${UNIT_SYMBOLS[unitName] ?? unitName}`;
}
```

Uso:

```js
formatDisplayValue(value, {
  unit: "m",
  precision: 0
});
// "2 m"
```

---

# 18. Formatação para edição

Modo edição não deve misturar número com unidade.

Correto:

```txt
2.002
```

Incorreto:

```txt
2.002 m
```

Arquivo:

```txt
src/core/format-edit-value.mjs
```

```js
import { format } from "mathjs";
import { convertValue } from "./convert-value.mjs";
import { resolveDisplayPrecision } from "./resolve-display-precision.mjs";

export function formatEditValue(ogValue, options = {}) {
  const { internal, quantity } = ogValue;

  if (typeof internal.value !== "number") {
    return String(internal.value ?? "");
  }

  const editUnit = options.unit ?? internal.unit;

  const editValue = convertValue({
    value: internal.value,
    fromUnit: internal.unit,
    toUnit: editUnit
  });

  const precision = resolveDisplayPrecision(
    quantity,
    editUnit,
    options.precision
  );

  return format(editValue, {
    notation: "fixed",
    precision
  });
}
```

Uso:

```js
formatEditValue(value, {
  unit: "cm",
  precision: 3
});
// se for length, limita automaticamente conforme resolução interna
```

---

# 19. Fluxo de UI

## Ao digitar

```txt
Usuário digita: 2002
Unidade atual da UI: mm
Grandeza: length

Sistema cria:
input.value = 2002
input.unit = mm
internal.value = 2.002
internal.unit = m
```

## Ao visualizar

```txt
Sistema pega internal
converte para unidade de display
aplica precisão permitida
aplica prefixo/sufixo
mostra valor user friendly
```

## Ao editar

```txt
Sistema pega internal
converte para unidade atual da UI
aplica precisão máxima permitida
mostra apenas o número no input
```

A unidade deve aparecer no label, select ou adornment do campo.

---

# 20. Propriedade de família

Exemplo:

```js
const outsideDiameterProperty = {
  id: "outsideDiameter",
  name: "Outside Diameter",
  valueType: "float",
  quantity: "length",

  defaultInputUnit: "mm",

  display: {
    unit: "mm",
    precision: 1,
    editPrecision: 1
  }
};
```

Criando valor:

```js
const value = createValue({
  text: "200.25",
  valueType: outsideDiameterProperty.valueType,
  quantity: outsideDiameterProperty.quantity,
  inputUnit: outsideDiameterProperty.defaultInputUnit
});
```

Resultado interno:

```js
{
  valueType: "float",
  quantity: "length",

  input: {
    text: "200.25",
    value: 200.25,
    unit: "mm"
  },

  internal: {
    value: 0.2003,
    unit: "m"
  }
}
```

Porque `200.25 mm` arredonda para `200.3 mm`, respeitando a resolução de `0.1 mm`.

---

# 21. Preferência de unidade por usuário/projeto

As preferências de UI não devem ficar salvas dentro de cada valor.

Exemplo:

```js
const unitPreferences = {
  length: "mm",
  area: "m^2",
  volume: "m^3",
  angle: "deg",
  temperature: "degC",
  pressure: "bar",
  force: "kN"
};
```

Ordem de resolução da unidade de display:

```txt
1. configuração específica da propriedade
2. preferência do usuário
3. preferência do projeto
4. unidade interna
```

---

# 22. Export central

Arquivo:

```txt
src/index.mjs
```

```js
export { VALUE_TYPES } from "./constants/value-types.mjs";
export { QUANTITY_TYPES } from "./constants/quantity-types.mjs";
export { INTERNAL_UNITS } from "./constants/internal-units.mjs";
export { INTERNAL_RESOLUTION } from "./constants/internal-resolution.mjs";
export { UNIT_SYMBOLS } from "./constants/unit-symbols.mjs";

export { createValue } from "./core/create-value.mjs";
export { convertValue } from "./core/convert-value.mjs";
export { applyInternalResolution } from "./core/apply-internal-resolution.mjs";
export { getMaxDisplayPrecision } from "./core/get-max-display-precision.mjs";
export { resolveDisplayPrecision } from "./core/resolve-display-precision.mjs";
export { formatDisplayValue } from "./core/format-display-value.mjs";
export { formatEditValue } from "./core/format-edit-value.mjs";
```

Uso:

```js
import {
  createValue,
  formatDisplayValue,
  formatEditValue
} from "./opengeometry-values/src/index.mjs";
```

---

# 23. Exemplo completo

```js
import {
  createValue,
  formatDisplayValue,
  formatEditValue
} from "./src/index.mjs";

const value = createValue({
  text: "2002",
  valueType: "float",
  quantity: "length",
  inputUnit: "mm"
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(formatDisplayValue(value, {
  unit: "m",
  precision: 0
}));
// "2 m"

console.log(formatEditValue(value, {
  unit: "m",
  precision: 4
}));
// "2.0020"

console.log(formatEditValue(value, {
  unit: "mm",
  precision: 4
}));
// "2002.0"
```

O último retorna apenas uma casa decimal porque, em `mm`, o máximo permitido é `1`.

---

# 24. Regras finais do módulo

As decisões consolidadas:

```txt
1. O sistema usa JavaScript puro em arquivos .mjs ES6+.

2. Math.js será usado para conversão e cálculo de unidades.

3. O OpenGeometry Values define o modelo de domínio.

4. Valores numéricos com grandeza devem ser salvos com input original e valor interno.

5. Comprimento interno é salvo em metro.

6. Ângulo interno é salvo em radiano.

7. Área interna é salva em m^2.

8. Volume interno é salvo em m^3.

9. Temperatura inicial será salva em degC.

10. Pressão interna será salva em Pa.

11. Input numérico editável usa "." como separador decimal.

12. Não aceitar separador de milhar no MVP.

13. Resolução interna para comprimento é 0.1 mm.

14. A UI não pode exibir nem editar precisão maior que a resolução interna.

15. Modo leitura pode ter sufixo, prefixo e símbolo de unidade.

16. Modo edição deve mostrar apenas o número.

17. Preferência de unidade pertence à UI/projeto/usuário, não ao valor salvo.

18. Cálculo, geometria e interoperabilidade devem usar sempre internal.value.
```

---

# 25. Escopo MVP

Implementar agora:

```txt
value types:
string
integer
float
boolean

quantities:
none
length
area
volume
angle
temperature
mass
force
pressure
time
ratio

core:
createValue()
convertValue()
applyInternalResolution()
getMaxDisplayPrecision()
resolveDisplayPrecision()
formatDisplayValue()
formatEditValue()
```

Não implementar ainda:

```txt
fórmulas
DMS para ângulo
enum
unidades customizadas
máscaras complexas
i18n numérico
BigNumber
unidades industriais específicas
catálogos normativos
```

---

# 26. Resumo arquitetural

```txt
Math.js
  unidade, conversão, formatação numérica

opengeometry-values
  valor estruturado, unidade interna, resolução interna, regra de domínio

OpenGeometry UI
  preferência de unidade, precisão, prefixo, sufixo, modo leitura/edição

OpenGeometry Core
  geometria, famílias, constraints, catálogos e interoperabilidade usando internal.value
```

A regra mais importante:

```txt
Nunca calcular geometria usando o texto digitado pelo usuário.
Sempre calcular usando internal.value e internal.unit.
```

Esse planejamento deixa o módulo simples, previsível, compatível com `.mjs`, reaproveita Math.js e já cria uma base saudável para famílias paramétricas, catálogos, fórmulas, UI técnica e interoperabilidade.
