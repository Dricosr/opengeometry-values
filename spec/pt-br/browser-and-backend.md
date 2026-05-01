# Uso no Browser e no Backend

iforge-edp-values foi projetado para funcionar tanto no Node.js quanto no browser a partir dos mesmos arquivos fonte, sem build step e sem manutenção duplicada.

---

## Exports do mathjs necessários

A biblioteca usa exatamente quatro exports nomeados do mathjs. Esses são os únicos símbolos que um shim ou import map precisa expor:

| Símbolo | Usado em |
| ------- | -------- |
| `unit` | conversão de unidades, precisão, parsing de input |
| `format` | formatação numérica para exibição |
| `evaluate` | avaliação de fórmulas |
| `typeOf` | detecção do tipo de resultado de fórmulas |

A fonte canônica da verdade é [`src/core/mathjs-api.mjs`](../../src/core/mathjs-api.mjs) - ele re-exporta os quatro e nada mais. Quando um novo símbolo do mathjs for necessário em qualquer lugar da biblioteca, ele deve ser adicionado lá primeiro, tornando a mudança visível nos diffs.

Consumidores também podem importar o contrato diretamente em runtime:

```js
import { mathjsApi } from "@dricosr/iforge-edp-values";
// mathjsApi: { evaluate, format, typeOf, unit }
```

---

## O problema

`import { unit, format, evaluate, typeOf } from "mathjs"` usa bare specifiers. Eles resolvem corretamente no Node.js via `node_modules`, mas o browser não consegue resolvê-los sem configuração adicional.

---

## A solução: Import Maps + Express como estático

O código fonte da biblioteca não muda. O app consumidor lida com a resolução por ambiente, servindo as dependências como arquivos estáticos e declarando um import map no HTML.

### Node.js

Importe a biblioteca diretamente. Nenhuma configuração necessária.

```js
import { createValue } from "iforge-edp-values"
```

O Node.js resolve `"mathjs"` e `"iforge-edp-values"` pela resolução padrão de módulos a partir do `node_modules`.

### Browser

**Configuração do Express:**

```js
app.use("/mathjs", express.static("node_modules/mathjs/lib/esm"))
app.use("/iforge-edp-values", express.static("node_modules/iforge-edp-values/src"))
```

**HTML:**

```html
<script type="importmap">
{
  "imports": {
    "mathjs": "/mathjs/index.js",
    "iforge-edp-values": "/iforge-edp-values/index.mjs"
  }
}
</script>

<script type="module">
  import { createValue } from "iforge-edp-values"
</script>
```

O browser carrega `/mathjs/index.js`. Todos os imports relativos internos do mathjs (ex: `./utils/is.js`) resolvem contra `/mathjs/` automaticamente. Sem CDN, sem bundler.

---

## Por que essa abordagem

| Preocupação | Decisão |
| --- | --- |
| Sem build step | Arquivos fonte servidos diretamente como estão |
| Sem dependência de CDN | mathjs servido localmente via Express a partir do `node_modules` |
| Versão única de verdade | `package.json` controla o mathjs para os dois ambientes |
| Sem manutenção dupla | Uma codebase em `src/` funciona nos dois ambientes |
| Supply chain | Nenhuma dependência de runtime além do `node_modules` |

---

## A única regra de authoring que faz tudo funcionar

Todo arquivo em `src/` deve importar dependências usando bare specifiers - nunca paths relativos para dentro do `node_modules`:

```js
// correto
import { unit, format, evaluate, typeOf } from "mathjs"

// errado - quebra o browser
import { unit } from "../../node_modules/mathjs/lib/esm/index.js"
```

Essa única regra é o que mantém os dois ambientes compatíveis a partir da mesma fonte.

---

## Gestão de versão

A versão do mathjs é definida uma única vez no `package.json`. Após `npm install`, tanto o Node.js quanto o browser consomem os mesmos arquivos do `node_modules`. Nenhuma sincronização entre ambientes é necessária.

---

## Suporte a browsers

Import maps são suportados nativamente em todos os browsers modernos:

- Chrome 89+
- Firefox 108+
- Safari 16.4+

Este projeto tem como alvo Node.js >=24 e browsers modernos, portanto import maps são uma base segura.
