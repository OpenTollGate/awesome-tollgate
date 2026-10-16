---
name: TollGate Suite WRT
description: TollGate v1 behaviour on OpenWrt — tollgated, mintd, merchantd and a captive-portal proxy, packaged as .apk/.ipk.
tags: [openwrt, packages, firmware, nostr, cashu]
links:
  - label: Source (gitworkshop)
    url: https://gitworkshop.dev/npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr/relay.ngit.dev/tollgate-suite-wrt
  - label: Clone (ngit)
    url: https://relay.ngit.dev/npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr/tollgate-suite-wrt.git
  - label: Mirror (gitnostr)
    url: https://gitnostr.com/npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr/tollgate-suite-wrt.git
---

## Overview

The TollGate suite for OpenWrt, packaging the components needed to reproduce
**TollGate v1 behaviour** on a stock OpenWrt router:

- **`tollgated`** — the node daemon that drives a payment session
- **`mintd`** — Cashu mint integration
- **`merchantd`** — merchant/acceptance role
- **captive-portal proxy** — serves the payment UI to attached clients

Everything ships as OpenWrt packages (`.apk` / `.ipk`) rather than a whole
firmware image, so the suite can be installed onto an OpenWrt build you already
run.

## Source

The repository is hosted on **ngit** (git over Nostr) rather than a single
central forge. It is published from
`npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr` and announced
to `wss://relay.ngit.dev` and `wss://gitnostr.com`, so it can be browsed on
gitworkshop or cloned straight from the relay.

## Git identity

- **npub**: `npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr`
- **relays**: `wss://relay.ngit.dev`, `wss://gitnostr.com`

## Related

- [TollGate OS](https://github.com/OpenTollGate/tollgate-os) — OpenWrt-based firmware that integrates these packages
- [TollGate Module Basic (Go)](https://github.com/OpenTollGate/tollgate-module-basic-go) — reference payment module
