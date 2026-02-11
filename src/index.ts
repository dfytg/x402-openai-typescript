/**
 * x402-openai — Drop-in OpenAI TypeScript client with transparent x402 payment.
 *
 * Quick start:
 *
 * ```ts
 * import { X402OpenAI } from "x402-openai";
 * import { EvmWallet, SvmWallet } from "x402-openai/wallets";
 *
 * // EVM
 * const client = new X402OpenAI({ wallet: new EvmWallet({ privateKey: "0x…" }) });
 *
 * // SVM (Solana)
 * const client = new X402OpenAI({ wallet: new SvmWallet({ privateKey: "base58…" }) });
 *
 * // Multi-chain
 * const client = new X402OpenAI({
 *   wallets: [
 *     new EvmWallet({ privateKey: "0x…" }),
 *     new SvmWallet({ privateKey: "base58…" }),
 *   ],
 * });
 * ```
 *
 * Public API:
 *
 * - {@link X402OpenAI} — recommended client class.
 * - {@link EvmWallet} / {@link SvmWallet} — chain-specific wallet adapters.
 * - {@link Wallet} — interface for custom wallet implementations.
 */

export type { X402OpenAIOptions } from "./client.ts";
export { X402OpenAI } from "./client.ts";
export type {
	EvmWalletMnemonicOptions,
	EvmWalletOptions,
	EvmWalletPrivateKeyOptions,
	SvmWalletOptions,
	Wallet,
} from "./wallets/index.ts";
export { EvmWallet, SvmWallet } from "./wallets/index.ts";
