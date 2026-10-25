# Contributing to Lexora

Thank you for your interest in contributing to **Lexora**! We welcome contributions from developers, legal practitioners, chartered accountants, and designers.

## Development Workflow

1. Fork the repository and clone your fork locally:
   ```bash
   git clone https://github.com/<!-- TODO: your-github-org -->/lexora.git
   cd lexora
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a descriptive feature or bugfix branch:
   ```bash
   git checkout -b feat/add-epfo-summons-preset
   ```
4. Verify changes pass typechecking and compilation:
   ```bash
   npm run build
   ```
5. Commit using conventional commits (`feat:`, `fix:`, `docs:`, `perf:`).
6. Push to your fork and submit a Pull Request.

## Coding Standards

- **TypeScript Strict Mode**: Maintain strict typing without `any`. Ensure interfaces align with `src/types/index.ts`.
- **Entity Invariant Protection**: When adding or updating multilingual features, ensure statutory reference numbers, dates, statutory section numbers, and monetary figures are treated as immutable entities.
- **Evidentiary Clarity**: Never output definitive claims of a notice being genuine or fake without physical validation; use explainable risk levels and evidence provenance badges (`[VERIFIED FACT]`, `[AI FINDING]`, `[UNVERIFIED ASSERTION]`).
