---
name: TollGate RS
description: TollGate payment module implemented in Rust.
tags: [rust, payment, module, lightning]
links:
  - label: Repository
    url: https://github.com/OpenTollGate/tollgate-rs
---

## Overview

`tollgate-rs` is the Rust implementation of the TollGate payment module. It
provides the same node-facing behaviour as the reference Go module — Lightning
invoices, payment verification and session handling — with a single static
binary and a small memory footprint suited to embedded routers.

## Why a second implementation

Running two independent implementations of the same protocol surface makes the
node contract testable from the outside: if Go and Rust agree on the wire and on
the on-disk state, the contract is real rather than an accident of one codebase.

## Building from Source

```bash
git clone https://github.com/OpenTollGate/tollgate-rs.git
cd tollgate-rs
cargo build --release
```

Cross-compilation for router targets follows the usual Rust `--target`
aarch64/mips toolchain setup.

## Related

- [TollGate Module Basic (Go)](https://github.com/OpenTollGate/tollgate-module-basic-go) — the reference Go implementation
