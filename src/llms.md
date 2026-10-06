# wickwatch

> wickwatch is a self-hosted, open-source (AGPL-3.0) dashboard to monitor and control trading bots. Its first adapters run cTrader bots (cBots) in Docker containers through the cTrader CLI. It shows accounts, bot instances, positions, deals and logs, starts and stops bots, and tracks prop-firm challenge limits (for example FTMO and The Trading Pit). It is a hobby project, free of charge, with no commercial variant. Current version: {{version}}.

wickwatch watches and controls bots; it does not trade by itself, contains no strategies and is not financial advice. It is not affiliated with Spotware (cTrader) and includes no cTrader software. The name is always written in lower case.

## What it does

- Overview of all accounts (balance, equity, today's P&L, open positions, pending orders) and all bot instances (status, uptime, last log line), with alerts for stopped, crashed or disconnected bots.
- Instances: start, stop, restart; create bots from an uploaded algo with a form built from its parameters; load and download `.cbotset` parameter files; every save is a version that can be restored; parameter templates.
- Emergency stop per account: stops its bots, cancels its orders, closes its positions (with confirmation, audit-logged).
- Prop challenges: profit target, daily loss, max drawdown (static, trailing, trailing on end-of-day balance), minimum trading days and duration; an optional loss guard runs the emergency stop before a limit is used up.
- Schedules: pause bots on weekends, holidays and around economic news.
- Notifications to Telegram, Slack, Discord or ntfy; heartbeat to services like Healthchecks.io.
- REST API with OpenAPI docs and API tokens; a read-only MCP (Model Context Protocol) endpoint for AI assistants.
- Built-in login with optional two-factor authentication (TOTP), read-only users, credentials encrypted at rest, Docker reached only through a docker-socket-proxy.
- Dark and light mode, English and German, usable on a phone.

## Quick start

```sh
docker run --rm -p 3000:3000 -e MASTER_KEY="$(openssl rand -base64 32)" -v wickwatch-data:/app/data ghcr.io/wickwatch/wickwatch:{{version}}
```

The image starts with a demo adapter (fake accounts, instances, positions and logs), so no broker or bots are needed to try it.

## Guides

- [Run cTrader cBots in Docker, with a dashboard]({{siteUrl}}/ctrader-docker/): what wickwatch does with the bots, the two ways to define them, what is needed
- [Prop-firm challenge limits]({{siteUrl}}/prop-firm-challenges/): challenge profiles, alerts, the loss guard and its limits
- [AI assistants through MCP]({{siteUrl}}/mcp/): what the read-only MCP endpoint offers and how to connect a client

## Docs

- [README]({{repo}}/blob/main/README.md): features, architecture, quick start
- [User guide]({{repo}}/blob/main/docs/USER-GUIDE.md): from the first login to a running prop challenge
- [Install guide]({{repo}}/blob/main/deploy/INSTALL.md): step by step on a Linux server
- [Deployment]({{repo}}/blob/main/deploy/README.md): running real bots, reverse proxy
- [Configuration]({{repo}}/blob/main/docs/CONFIGURATION.md): all settings
- [MCP]({{repo}}/blob/main/docs/MCP.md): connecting AI clients to the read-only MCP endpoint
- [Prop firms]({{repo}}/blob/main/docs/PROP-FIRMS.md): rules on devices, IP addresses and automation
- [Adapters]({{repo}}/blob/main/docs/ADAPTERS.md): contracts for other brokers, runtimes and parameter formats
- [Bot contract]({{repo}}/blob/main/docs/BOT-CONTRACT.md): what a bot can log for wickwatch to read
- [Security]({{repo}}/blob/main/SECURITY.md): security model and reporting
- [OpenAPI document]({{repo}}/blob/main/docs/openapi.json)

## Optional

- [Roadmap]({{repo}}/blob/main/docs/ROADMAP.md)
- [Changelog]({{repo}}/blob/main/CHANGELOG.md)
- [Project page]({{siteUrl}}/) ([German]({{siteUrl}}/de/))
