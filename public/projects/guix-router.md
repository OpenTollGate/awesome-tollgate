---
name: guix-router
description: GNU Guix System router testbed — Guix on Raspberry Pi 4, ported toward the GL-MT6000.
tags: [guix, router, openwrt, aarch64]
links:
  - label: Repository
    url: https://source.archipelago-foundation.org/ssmithx/guix-router
---

## Overview

`guix-router` explores running a **GNU Guix System** router instead of OpenWrt:
declarative, reproducible system configuration all the way down, including the
networking stack.

The testbed is a **Raspberry Pi 4B** — real aarch64 hardware that is cheap and
carries no brick risk — with the intent to port the stack to the
**GL.iNet GL-MT6000** once it works. OpenWrt's userland (`ubus`, `uci`,
`netifd`) is packaged for Guix along the way, so the two worlds meet by
construction rather than by firmware bridging.

## Status

Phase 1 — bootable image built. `guix-rpi4.img` flashes to a 32 GB+ microSD card.

## Repository layout

| File | Purpose |
|---|---|
| `rpi4.scm` | Operating-system declaration for the Pi 4 router |
| `packages/rpi-boot-firmware.scm` | Non-free Pi first-stage boot firmware (`start4.elf`, fixups, overlays) |
| `packages/openwrt.scm` | Draft Guix packages for `libubox`, `ubus`, `uci` (Phase 3) |
| `build-rpi-image.sh` | Cross-build the `efi-raw` image |
| `prepare-rpi-image.sh` | Inject the RPi boot chain + `extlinux` config into the image |
| `flash-rpi.sh` | Guarded `dd` to an SD card |
| `qemu-virt.scm`, `run-qemu.sh` | Draft QEMU (`-M virt`) prototype config |
| `plans/` | Project roadmaps (Pi 4 → MT6000, RB5009 fallback) |
| `docs/HOST-SETUP.md` | How the build host was set up |
| `docs/PITFALLS.md` | Everything that broke and how it was fixed — read before debugging |

## Boot flow

```
Pi4 EEPROM -> start4.elf reads config.txt
  (arm_64bit=1, enable_uart=1, upstream_kernel=1, kernel=u-boot.bin)
-> u-boot 2025.01 (rpi-arm64, distro bootcmd)
-> /extlinux/extlinux.conf on p2 (ext4, label "Guix")
-> loads /gnu/store/...-linux.../Image + initrd (mmc stack)
-> root=/dev/mmcblk0p2, console ttyAMA0 115200
```

## Quickstart (build host)

```bash
export PATH=$HOME/.local/bin:$PATH
export GUIX_PACKAGE_PATH="$HOME/guix-router/packages:$HOME/channels/nonguix"

./build-rpi-image.sh
sudo -E ./prepare-rpi-image.sh <store-path-from-build>
sudo ./flash-rpi.sh /dev/sdX   # check lsblk first
```

A first build from scratch takes roughly 1.5 h — Nonguix `linux` 6.17 has no
aarch64 substitutes on their CI, though the rest comes from `ci.guix.gnu.org`.
