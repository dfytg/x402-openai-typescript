# Run all checks and tests.
all: check test

# Show all available recipes.
help:
    @just --list

# Install all dependencies.
install:
    bun install

# Run Biome lint checks.
lint:
    bunx @biomejs/biome check src/ tests/ examples/

# Auto-fix and format with Biome.
format:
    bunx @biomejs/biome check --write src/ tests/ examples/

# Run the TypeScript type checker.
typecheck:
    bun run typecheck

# Run Bun tests.
test:
    bun test

# Run all static checks.
check: lint typecheck

# Remove build artifacts and caches.
clean:
    rm -rf dist/ node_modules/.cache
