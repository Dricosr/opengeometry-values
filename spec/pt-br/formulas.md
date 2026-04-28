# Fórmulas

Uma fórmula é uma expressão mathjs prefixada com `=` que é avaliada quando um valor é criado. O resultado entra no pipeline normal: conversão de unidade, resolução interna e validação de tipo se aplicam.

---

## Formas de input

Existem três formas de fornecer um input numérico:

| Forma | Exemplo | Descrição |
| ----- | ------- | --------- |
| Número puro | `200` | Número literal; a unidade vem do parâmetro da UI |
| Número com unidade inline | `4000mm` | Número com unidade embutida; a unidade inline prevalece sobre o parâmetro |
| Fórmula | `=2*3` ou `=4 m + 200 cm` | Expressão mathjs; pode incluir unidades inline |

---

## Sintaxe

### Fórmula simples (adimensional)

```txt
=<expressão>
```

A expressão avalia para um número puro. A unidade é tomada do parâmetro da UI.

```txt
=2 + 3
=sqrt(3^2 + 4^2)
=2 * pi
=sin(pi / 6)
```

### Fórmula com unidades embutidas

```txt
=<expressão com tokens de unidade mathjs>
```

A expressão carrega unidades e o mathjs resolve a aritmética de unidades. As unidades inline prevalecem sobre o parâmetro de unidade.

```txt
=4 m + 200 cm
=2 m^2 + 5000 cm^2
=1 m^3 + 500 L
=90 deg + 45 deg
=1 kN + 500 N
=1 MPa + 500 kPa
=1 h + 30 min
```

### Número com unidade embutida (sem `=`)

```txt
<número><unidade>
```

Um número imediatamente seguido de um token de unidade reconhecido. Sem prefixo de igual. A unidade inline prevalece sobre o parâmetro de unidade.

```txt
4000mm
2m
200cm
7h
500g
```

---

## Como funciona

### Fórmula simples

```txt
Usuário digita:     =sqrt(3^2 + 4^2)
Unidade do parâmetro: m
Grandeza:           length

Fórmula avalia para: 5
Sistema cria:
  input.value                    = "=sqrt(3^2 + 4^2)"
  input.unit                     = m
  input.formulaHasEmbeddedUnits  = false
  internal.value                 = 5
  internal.unit                  = m
```

### Fórmula com unidades embutidas

```txt
Usuário digita:     =4 m + 200 cm
Unidade do parâmetro: m  (ignorado - unidades inline prevalecem)
Grandeza:           length

Fórmula avalia para: 6 m  (resultado Unit do mathjs)
Sistema cria:
  input.value                    = "=4 m + 200 cm"
  input.unit                     = m   (unidade interna)
  input.formulaHasEmbeddedUnits  = true
  internal.value                 = 6
  internal.unit                  = m
```

### Número com unidade embutida

```txt
Usuário digita:     4000mm
Unidade do parâmetro: m  (ignorado - unidade inline prevalece)
Grandeza:           length

Sistema cria:
  input.value   = "4000mm"
  input.unit    = mm
  internal.value = 4
  internal.unit  = m
```

---

## Comportamento no edit

Quando o usuário edita o valor em uma unidade diferente, o texto de edit varia conforme a forma de input:

| Forma de input | Original | Unidade de edit | Texto de edit |
| -------------- | -------- | --------------- | ------------- |
| Número puro | `200` em mm | m | `2` |
| Número com unidade embutida | `4000mm` | m | `4` |
| Fórmula simples | `=2*3` em m | cm | `=2*3 m` |
| Fórmula com unidades embutidas | `=4 m + 200 cm` | cm | `=4 m + 200 cm` |

Regras:
- **Fórmula com unidades embutidas** - sempre retorna o texto da fórmula sem alteração.
- **Fórmula simples** - acrescenta a unidade original quando a unidade de edit difere da original (`=2*3 m`). Retorna o texto sem alteração quando as unidades coincidem.
- **Número puro / número com unidade embutida** - converte para a unidade de edit e retorna o texto numérico.

---

## Tipos de valor aplicáveis

Fórmulas se aplicam apenas a tipos de valor numéricos:

| Tipo de valor | Aceita fórmula |
| ------------- | -------------- |
| `float`       | sim            |
| `integer`     | sim - resultado deve ser número inteiro |
| `string`      | não            |
| `boolean`     | não            |

---

## Grandezas aplicáveis

Todos os tipos de grandeza aceitam fórmulas. Para fórmulas com unidades embutidas, as unidades na expressão devem ser compatíveis com a grandeza (ex.: uma grandeza de comprimento não pode usar uma fórmula de temperatura).

---

## Expressões suportadas

### Operadores aritméticos

| Operador  | Significado    | Exemplo        | Resultado |
| --------- | -------------- | -------------- | --------- |
| `+`       | adição         | `=2 + 3`       | `5`       |
| `-`       | subtração      | `=10 - 4`      | `6`       |
| `*`       | multiplicação  | `=3 * 4`       | `12`      |
| `/`       | divisão        | `=10 / 4`      | `2.5`     |
| `^`       | potenciação    | `=2^10`        | `1024`    |
| `-` (un.) | negação        | `=-5`          | `-5`      |

Parênteses `()` agrupam sub-expressões e sobrescrevem a precedência.

### Constantes

| Nome  | Valor (aprox.)     | Exemplo      |
| ----- | ------------------ | ------------ |
| `pi`  | 3.14159265358979   | `=2 * pi`    |
| `e`   | 2.71828182845904   | `=exp(1)`    |
| `phi` | 1.61803398874989   | `=phi`       |

### Funções matemáticas gerais

| Função            | Descrição                               | Exemplo               |
| ----------------- | --------------------------------------- | --------------------- |
| `sqrt(x)`         | raiz quadrada                           | `=sqrt(9)` → `3`      |
| `abs(x)`          | valor absoluto                          | `=abs(-7)` → `7`      |
| `ceil(x)`         | arredondamento para cima                | `=ceil(4.2)` → `5`    |
| `floor(x)`        | arredondamento para baixo               | `=floor(4.9)` → `4`   |
| `round(x)`        | arredondamento para o inteiro mais próximo | `=round(4.5)` → `5` |
| `exp(x)`          | e elevado à potência x                  | `=exp(1)` → `2.718…`  |
| `log(x, base)`    | logaritmo de x na base fornecida        | `=log(100, 10)` → `2` |
| `log10(x)`        | logaritmo na base 10                    | `=log10(1000)` → `3`  |
| `min(a, b, ...)`  | menor dos argumentos                    | `=min(3, 1, 2)` → `1` |
| `max(a, b, ...)`  | maior dos argumentos                    | `=max(3, 1, 2)` → `3` |

### Funções trigonométricas

Todos os ângulos são em **radianos**.

| Função         | Descrição                          | Exemplo                    |
| -------------- | ---------------------------------- | -------------------------- |
| `sin(x)`       | seno                               | `=sin(0)` → `0`            |
| `cos(x)`       | cosseno                            | `=cos(0)` → `1`            |
| `tan(x)`       | tangente                           | `=tan(0)` → `0`            |
| `asin(x)`      | arco seno                          | `=asin(1)` → `pi/2`        |
| `acos(x)`      | arco cosseno                       | `=acos(1)` → `0`           |
| `atan(x)`      | arco tangente                      | `=atan(1)` → `pi/4`        |
| `atan2(y, x)`  | arco tangente de dois argumentos   | `=atan2(1, 1)` → `pi/4`    |

> Para converter graus em radianos dentro de uma fórmula: multiplique por `pi / 180`.
> Exemplo: `=sin(30 * pi / 180)` → `0.5`

---

## Limitações conhecidas

- **Adição de temperaturas**: o mathjs não suporta a soma de duas temperaturas absolutas. `=20 degC + 5 degC` não é válido. Use fórmulas simples para aritmética de temperatura: `=20 + 5` com unidade de parâmetro `degC`.
- **Token `min`**: a unidade `min` (minuto) conflita com a função `min()` do mathjs. O parser substitui automaticamente tokens `min` isolados por `minute` antes da avaliação, portanto `=1 h + 30 min` funciona corretamente. Chamadas à função `min()` não são afetadas.

---

## Tratamento de erros

Uma fórmula que não pode ser avaliada, ou cujo resultado é incompatível com a grandeza, produz um `ValueInputError`:

| Condição | Código de erro |
| --------- | -------------- |
| Expressão vazia | `invalid_formula_expression` |
| Variável ou função indefinida | `invalid_formula_expression` |
| Erro de sintaxe | `invalid_formula_expression` |
| Divisão por zero (Infinity) | `invalid_formula_expression` |
| Resultado complexo ou não-finito | `invalid_formula_expression` |
| Resultado não-numérico (sem unidade, sem número) | `invalid_formula_expression` |
| Unidade embutida incompatível com a grandeza | `invalid_formula_expression` |
| Tipo de valor `integer` com resultado fracionário | `invalid_integer_value` |

---

## Exemplos completos

```js
import { createValue } from "@dricosr/iforge-edp-values";

// Fórmula simples: hipotenusa pelo teorema de Pitágoras
const hipotenusa = createValue({
  value: "=sqrt(3^2 + 4^2)",
  valueType: "float",
  quantity: "length",
  unit: "m"
});
// internal.value = 5, internal.unit = "m"

// Fórmula com unidades embutidas: soma de comprimentos
const viga = createValue({
  value: "=4 m + 200 cm",
  valueType: "float",
  quantity: "length",
  unit: "m"
});
// internal.value = 6, internal.unit = "m"

// Número com unidade embutida: usuário digitou mm inline
const laje = createValue({
  value: "4000mm",
  valueType: "float",
  quantity: "length",
  unit: "m"   // unidade do parâmetro - sobrescrita pelo mm inline
});
// internal.value = 4, internal.unit = "m"

// Fórmula de tempo
const duracao = createValue({
  value: "=1 h + 30 min",
  valueType: "float",
  quantity: "time",
  unit: "h"
});
// internal.value = 5400, internal.unit = "s"
```
