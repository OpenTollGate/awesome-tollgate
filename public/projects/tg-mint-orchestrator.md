---
name: TG Mint Orchestrator
description: Ansible playbook for deploying per-operator Cashu mints with automated routing and TLS.
tags: [ansible, cashu, mint, deployment]
links:
  - label: Repository
    url: https://github.com/Rits1272/tg-mint-orchestrator
---

## Overview

TG Mint Orchestrator automates deployment of operator-specific Cashu mints on a VPS. It is designed for multi-operator setups where each mint runs in an isolated container and is exposed through subdomain routing with wildcard TLS.
