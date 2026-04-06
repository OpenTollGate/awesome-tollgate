---
name: TollGate Bash Client
description: Automatic internet payment script using Cashu tokens — pay-per-use internet from your terminal.
tags: [bash, cashu, client, auto-pay]
links:
  - label: Repository
    url: https://gitworkshop.dev/npub12m5exm2uk3xa674cc5r0hlyvccs5xxn7qv83ezuteefv5972nquq4j4szl/relay.ngit.dev/tollgate-bash-client
  - label: cocod
    url: https://github.com/Egge21M/cocod
---

## Overview

A lightweight Bash client that automatically pays for internet access on TollGate hotspots using Cashu ecash tokens. It monitors your network usage and sends micropayments as needed — no manual interaction required.

## How It Works

- Starts tracking your network usage
- When data drops below 2 MB, pays 1 sat via Cashu token
- Uses offline tokens first, refills from cocod automatically
- Maintains a stash of 7 offline tokens
- Checks usage every 2s below 10 MB, every 5s above

## Setup

1. Run the initial setup script: `./initial_setup.sh`
2. Install [bun](https://bun.sh)
3. Install [cocod](https://github.com/Egge21M/cocod)
4. Fund your cocod wallet with sats

## Usage

```bash
./auto-pay.sh
```

## Run as a Service

Use the Makefile targets to run auto-pay in the background whenever your user session starts:

```bash
make service-install
make service-status
make service-logs
make service-restart
make service-uninstall
```

To keep the service running without an active login session:

```bash
sudo loginctl enable-linger "$USER"
```
