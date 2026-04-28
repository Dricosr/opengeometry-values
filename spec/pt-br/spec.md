
# iForge EDP Values - Especificação

> Este documento define as regras de domínio da biblioteca. Para a API pública atual, exemplos de uso e instalação, consulte o [README](../../README.md).

Lib em **JavaScript puro**, usando arquivos **`.mjs`**, padrão **ES Modules**, acoplada ao **Math.js** para conversão, unidade e formatação numérica.

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

# 2. Responsabilidade do iForge EDP Values

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
O iForge EDP define as regras de domínio.

---

# 3. Stack

```json
{
  "type": "module",
  "dependencies": {
    "mathjs": "15.2.0"
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

# 4. Estrutura do repo

O código-fonte fica em `src/`, dividido entre `constants/` (catálogos de domínio congelados) e `core/` (funções puras e classes especialistas). Os exports públicos são centralizados em `src/index.mjs`. Consulte o [README](../../README.md) para a superfície completa da API.

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
    id: "input:length:beam-1",
    value: 2002,
    unit: "mm",

    internal: {
      value: 2.002,
      unit: "m"
    },

    output: { /* instância de Output */ }
  },

  internal: {
    value: 2.002,
    unit: "m"
  }
}
```

Cada `ValueInput` armazena seu próprio `id`, o `value` e `unit` originais, o snapshot `internal` normalizado e a instância `Output` que controla a formatação de display e edição.

Regra importante:

```txt
A UI pode mostrar o input original, mas cálculo, geometria e interoperabilidade devem usar sempre internal.
```

---

# 12. Criar valor a partir do input

`createValue` recebe `{ id, value, unit, valueType, quantity, output }`, converte para a unidade interna, aplica a resolução e retorna um valor estruturado com `input` e `internal`.

`tryCreateValue` envolve `createValue` e retorna `{ ok, value, error }` em vez de lançar exceção, adequado para validação em formulários de UI.

Para as assinaturas atuais consulte o [README](../../README.md).

---

# 13. Entrada por fórmula

Uma fórmula é um input numérico prefixado com `=`. É avaliada no momento da criação usando mathjs `evaluate()`, e o número resultante entra no pipeline padrão (conversão de unidade, resolução interna, validação de tipo). O texto original da fórmula é preservado em `input.value`.

```js
createValue({ value: "=sqrt(3^2 + 4^2)", unit: "m", valueType: "float", quantity: "length" });
// input.value    = "=sqrt(3^2 + 4^2)"
// internal.value = 5
// internal.unit  = "m"
```

Fórmulas se aplicam aos tipos `float` e `integer`, para todas as grandezas. Um resultado inválido ou não-finito lança `ValueInputError` com código `invalid_formula_expression`.

Para a referência completa de expressões veja [`spec/pt-br/formulas.md`](formulas.md).

---

# 14. Conversão direta

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

# 15. Símbolos de UI

`UNIT_SYMBOLS` mapeia códigos Math.js para caracteres de exibição. Entradas atuais:

| Código Math.js | Display |
| -------------- | ------- |
| `m`            | `m`     |
| `cm`           | `cm`    |
| `mm`           | `mm`    |
| `in`           | `in`    |
| `cm^2`         | `cm²`   |
| `m^2`          | `m²`    |
| `in^2`         | `in²`   |
| `cm^3`         | `cm³`   |
| `m^3`          | `m³`    |
| `in^3`         | `in³`   |
| `L`            | `L`     |
| `rad`          | `rad`   |
| `deg`          | `°`     |
| `degC`         | `°C`    |
| `degF`         | `°F`    |
| `K`            | `K`     |
| `kg`           | `kg`    |
| `N`            | `N`     |
| `kN`           | `kN`    |
| `Pa`           | `Pa`    |
| `kPa`          | `kPa`   |
| `MPa`          | `MPa`   |
| `bar`          | `bar`   |
| `s`            | `s`     |
| `min`          | `min`   |
| `h`            | `h`     |
| `percent`      | `%`     |

---

# 16. Precisão máxima da UI

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

# 17. Resolver precisão final

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

# 18. Formatação para leitura

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

# 19. Formatação para edição

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

# 20. Fluxo de UI

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

# 21. Propriedade de família

Uma definição de parâmetro carrega grandeza, tipo de valor, unidade padrão e configuração de display. A biblioteca não define o schema do parâmetro - isso pertence à aplicação consumidora.

Exemplo do que o consumidor passa para `createValue`:

```js
createValue({
  id: "outsideDiameter",
  value: 200.25,
  unit: "mm",
  valueType: "float",
  quantity: "length",
  output: new Output({ unit: "mm", precision: 1 })
});
```

Porque `200.25 mm` arredonda para `200.3 mm`, respeitando a resolução interna de `0.1 mm`.

---

# 22. Preferência de unidade por usuário/projeto

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

# 23. Export central

Todos os símbolos públicos são exportados por `src/index.mjs`. A superfície cresceu além do MVP original e inclui:

- Constantes de domínio: `VALUE_TYPES`, `QUANTITY_TYPES`, `INTERNAL_UNITS`, `INTERNAL_RESOLUTION`, `UNIT_SYMBOLS`, `OUTPUT_SUFFIX_MODES`, `OUTPUT_AFFIX_TYPES`
- Funções principais: `createValue`, `tryCreateValue`, `convertValue`, `formatDisplayValue`, `formatEditValue`, `applyInternalResolution`, `getMaxDisplayPrecision`, `resolveDisplayPrecision`, `buildOutput`, `createValuePreview`
- Modelos: `Output`, `OutputAffix`, `CustomOutputAffix`, `EmptyOutputAffix`, `UnitCodeOutputAffix`, `UnitSymbolOutputAffix`
- Catálogos: `OUTPUT_PRESETS`, `PARAMETER_SAMPLES`, `QUANTITY_PROFILES`
- Perfis de grandeza: `LengthQuantityProfile`, `AreaQuantityProfile`, `VolumeQuantityProfile`, `AngleQuantityProfile`, `TemperatureQuantityProfile`, `MassQuantityProfile`, `ForceQuantityProfile`, `PressureQuantityProfile`, `TimeQuantityProfile`
- Parsers: `parseNumber`, `parseBoolean`

Para a lista completa com descrições consulte o [README](../../README.md).

---

# 24. Exemplo completo

```js
import { createValue, Output, formatDisplayValue, formatEditValue } from "iforge-edp-values";

const value = createValue({
  id: "beam-span",
  value: 2002,
  unit: "mm",
  valueType: "float",
  quantity: "length",
  output: new Output({ unit: "m", precision: 0 })
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(value.input.formatForDisplay());
// "2 m"

console.log(formatEditValue(value, { unit: "m", precision: 4 }));
// "2.0020"

console.log(formatEditValue(value, { unit: "mm", precision: 4 }));
// "2002.0"
```

O último retorna apenas uma casa decimal porque, em `mm`, o máximo permitido é `1`.

---

# 25. Regras finais do módulo

As decisões consolidadas:

```txt
1. O sistema usa JavaScript puro em arquivos .mjs ES6+.

2. Math.js será usado para conversão e cálculo de unidades.

3. O iForge EDP Values define o modelo de domínio.

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

# 26. Escopo MVP

O MVP original foi entregue. Todos os itens abaixo estão implementados.

**Tipos de valor:** `string`, `integer`, `float`, `boolean`

**Grandezas:** `none`, `length`, `area`, `volume`, `angle`, `temperature`, `mass`, `force`, `pressure`, `time`, `ratio`

**Funções principais:** `createValue`, `tryCreateValue`, `convertValue`, `applyInternalResolution`, `getMaxDisplayPrecision`, `resolveDisplayPrecision`, `formatDisplayValue`, `formatEditValue`

**Adições além do MVP original:**

- Modelo `Output` com affixes tipados (`CustomOutputAffix`, `UnitCodeOutputAffix`, `UnitSymbolOutputAffix`, `EmptyOutputAffix`)
- Serviço `buildOutput` para construir outputs a partir de definições de preset
- Serviço `createValuePreview` para UIs de inspetor e playground
- `OUTPUT_PRESETS` - catálogo de presets BIM/AEC
- `PARAMETER_SAMPLES` - catálogo de amostras de parâmetros de engenharia
- `QUANTITY_PROFILES` / classes de perfil de grandeza especialistas
- Parsers `parseNumber` e `parseBoolean` expostos para reuso
- `ValueInputError` para validação estruturada em formulários de UI

**Ainda fora do escopo:**

```txt
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

# 27. Resumo arquitetural

```txt
Math.js
  unidade, conversão, formatação numérica

iforge-edp-values
  valor estruturado, unidade interna, resolução interna, regra de domínio

iForge EDP UI
  preferência de unidade, precisão, prefixo, sufixo, modo leitura/edição

iForge EDP Core
  geometria, famílias, constraints, catálogos e interoperabilidade usando internal.value
```

A regra mais importante:

```txt
Nunca calcular geometria usando o texto digitado pelo usuário.
Sempre calcular usando internal.value e internal.unit.
```

Esse planejamento deixa o módulo simples, previsível, compatível com `.mjs`, reaproveita Math.js e já cria uma base saudável para famílias paramétricas, catálogos, fórmulas, UI técnica e interoperabilidade.
