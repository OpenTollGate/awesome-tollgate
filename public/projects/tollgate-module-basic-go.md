---
name: TollGate Module Basic (Go)
description: Reference payment module in Go for handling Lightning payments on TollGate nodes.
tags: [go, lightning, payment, module]
links:
  - label: Repository
    url: https://github.com/OpenTollGate/tollgate-module-basic-go
---

## Overview

A reference implementation of the TollGate payment module written in Go. It handles Lightning Network invoice generation, payment verification, and session management for TollGate nodes.

## Architecture

The module runs as a standalone service on the router and communicates with:

- **TollGate WRT** — for session and firewall management
- **Lightning Node** — for invoice creation and payment verification
- **Captive Portal** — serves the payment UI to clients

## Features

- LNURL-pay support
- Configurable pricing (per-time, per-data)
- Nostr-based payment receipts (NIP-94)
- Lightweight — optimized for embedded devices
- Cross-compiled for multiple architectures (arm, aarch64, x86)

## Building from Source

```bash
git clone https://github.com/OpenTollGate/tollgate-module-basic-go.git
cd tollgate-module-basic-go
GOOS=linux GOARCH=arm64 go build -o tollgate-module ./cmd/module
```

## Configuration

Environment variables:

| Variable | Description | Default |
|----------|------------|---------|
| `TOLLGATE_PRICE` | Price per session in sats | `100` |
| `TOLLGATE_DURATION` | Session duration in minutes | `60` |
| `LN_BACKEND` | Lightning backend type | `lnd` |
