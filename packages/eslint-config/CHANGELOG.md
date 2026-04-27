# Changelog

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Changed

- Relax `no-magic-numbers` for test files and common trivial values such as `-1`, `0`, `1`, `2`, `10`, `24`, `60`, `100`, and `1000`.
- Disable `max-classes-per-file` in test files and `serializers` folders where grouped classes are intentional.
