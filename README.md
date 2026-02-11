# x402-openai

> Drop-in OpenAI TypeScript client with transparent x402 payment support — **EVM, Solana, and beyond**.

[![TypeScript](https://img.shields.io/badge/typescript-5.0%2B-blue)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Install

```bash
# EVM only
bun add x402-openai openai @x402/fetch @x402/evm viem

# Solana (SVM) only
bun add x402-openai openai @x402/fetch @x402/svm @solana/kit @scure/base

# Both chains
bun add x402-openai openai @x402/fetch @x402/evm @x402/svm viem @solana/kit @scure/base
```

## Quick Start

### EVM (Ethereum / Base / …)

```ts
import { X402OpenAI } from "x402-openai";
import { EvmWallet } from "x402-openai/wallets";

const client = new X402OpenAI({
  wallet: new EvmWallet({ privateKey: "0x…" }),
});

// Use exactly like openai.OpenAI — everything just works!
const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(completion.choices[0]?.message.content);
```

### SVM (Solana)

```ts
import { X402OpenAI } from "x402-openai";
import { SvmWallet } from "x402-openai/wallets";

const client = new X402OpenAI({
  wallet: new SvmWallet({ privateKey: "base58…" }),
});
```

### Multi-chain

Register multiple wallets — the x402 protocol automatically selects the right chain based on the server's payment requirements.

```ts
import { X402OpenAI } from "x402-openai";
import { EvmWallet, SvmWallet } from "x402-openai/wallets";

const client = new X402OpenAI({
  wallets: [
    new EvmWallet({ privateKey: "0x…" }),
    new SvmWallet({ privateKey: "base58…" }),
  ],
});
```

### EVM mnemonic phrase

```ts
import { EvmWallet } from "x402-openai/wallets";

const wallet = new EvmWallet({ mnemonic: "word1 word2 … word12" });

// BIP-44 account #2
const wallet2 = new EvmWallet({ mnemonic: "word1 word2 …", accountIndex: 2 });

// Custom derivation path
const wallet3 = new EvmWallet({
  mnemonic: "word1 word2 …",
  derivationPath: "m/44'/60'/2'/0/0",
});
```

### Streaming

```ts
const stream = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "Explain x402" }],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) process.stdout.write(content);
}
```

### Advanced: pre-built x402 client

```ts
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { X402OpenAI } from "x402-openai";

const x402 = new x402Client();
// ... register custom payment schemes ...

const client = new X402OpenAI({ x402Client: x402 });
```

## API

### `new X402OpenAI(options)`

Drop-in replacement for `openai.OpenAI`. Provide **exactly one** credential source:

| Parameter    | Description                                         |
| ------------ | --------------------------------------------------- |
| `wallet`     | A single `Wallet` adapter (e.g. `EvmWallet`)        |
| `wallets`    | List of `Wallet` adapters for multi-chain support   |
| `x402Client` | Pre-configured `x402Client`                         |

Default `baseURL` is `https://llm.qntx.fun/v1`. All standard OpenAI constructor options (`baseURL`, `timeout`, `maxRetries`, …) are forwarded transparently.

### Wallet adapters

| Class                            | Chain                    | Install extras                            |
| -------------------------------- | ------------------------ | ----------------------------------------- |
| `EvmWallet({ privateKey: … })`   | EVM (Ethereum, Base, …)  | `@x402/evm viem`                          |
| `EvmWallet({ mnemonic: … })`     | EVM (BIP-39)             | `@x402/evm viem`                          |
| `SvmWallet({ privateKey: … })`   | Solana                   | `@x402/svm @solana/kit @scure/base`       |

All wallets implement the `Wallet` interface. See [`src/wallets/base.ts`](src/wallets/base.ts) to add support for a new chain.

## Examples

```bash
# EVM — private key
EVM_PRIVATE_KEY="0x..." bun examples/chat-evm.ts

# EVM — mnemonic phrase
MNEMONIC="word1 word2 ..." bun examples/chat-evm-mnemonic.ts

# SVM (Solana) — private key
SOLANA_PRIVATE_KEY="base58..." bun examples/chat-svm.ts

# Streaming — EVM
EVM_PRIVATE_KEY="0x..." bun examples/streaming-evm.ts

# Streaming — EVM mnemonic
MNEMONIC="word1 word2 ..." bun examples/streaming-evm-mnemonic.ts

# Streaming — SVM
SOLANA_PRIVATE_KEY="base58..." bun examples/streaming-svm.ts

# Multi-chain (EVM + SVM)
EVM_PRIVATE_KEY="0x..." SOLANA_PRIVATE_KEY="base58..." bun examples/multichain.ts

# List models
EVM_PRIVATE_KEY="0x..." bun examples/models.ts

# List models — mnemonic
MNEMONIC="word1 word2 ..." bun examples/models-mnemonic.ts
```

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Type check
bun run typecheck
```

## License

This project is licensed under the [MIT License](LICENSE).
