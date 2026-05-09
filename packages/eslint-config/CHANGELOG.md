# Changelog

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed

- Relax `no-magic-numbers` for test files and common trivial values such as `-1`, `0`, `1`, `2`, `10`, `24`, `60`, `100`, and `1000`.
- Disable `max-classes-per-file` in test files and `serializers` folders where grouped classes are intentional.
- Bundle `@next/eslint-plugin-next` in `@petbee/eslint-config` so Next.js projects get plugin-backed Next rules without a separate manual dependency.
- Expand TypeScript peer support to include TypeScript 6 while preserving support for TypeScript 4 and 5.
- Update safe linting dependency set (typescript-eslint, jest/prettier/react-hooks plugins, and related dev tooling) to newer non-major ranges.
