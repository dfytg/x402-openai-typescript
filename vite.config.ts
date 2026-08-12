// vite.config.ts
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
    // 多入口：主入口 + wallets 子路径
    entry: {
      index: "src/index.ts",
      "wallets/index": "src/wallets/index.ts",
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
