---
name: conwrt
description: OpenWrt flashing framework — drive flashes from a declarative config file.
tags: [openwrt, flashing, tooling, automation]
links:
  - label: Repository
    url: https://github.com/Amperstrand/conwrt
---

## Overview

**conwrt** is an OpenWrt flashing framework: firmware flashes are described in a
declarative config file and then executed by the tool, instead of being retyped
as one-off `dd` / `sysupgrade` invocations.

The point is repeatability. Once a flash procedure lives in a config file it can
be reviewed, versioned and re-run — which matters when the same router gets
flashed dozens of times during testing, and matters even more when the wrong
device is one typo away.

## Scope

- Declarative description of a flash (image, target device, method)
- Consistent handling of pre-flash checks and post-flash verification
- A single entry point for flashing workflows that otherwise diverge per machine

## License

MIT
