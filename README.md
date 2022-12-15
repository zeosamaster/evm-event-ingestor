# EVM Event Ingestor

## Summary

This backend app ingests on-chain EVM events emitted by smart contracts and stores them.
This app is supported by a Supabase database that contains the configuration for networks and contracts and stores the ingested events.

## Developer Guide

### Setup

Install npm dependencies

```shell
$ npm i
```

### Start

Start ingestor

```shell
$ npm run start
```

### Debug

Start ingestor in debug mode

```shell
$ npm run start
```

### Env vars

To run the server, the following env vars need to be set on a `.env` file in the root of the repo (see [.env.example](/.env.example))

| Name         | Description                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| DEBUG        | Determines namespaces to [debug](https://www.npmjs.com/package/debug#usage). Available: main, load, ingestor |
| SUPABASE_URL | Supabase URL to store the events and read configs                                                            |
| SUPABASE_KEY | Supabase Key to store the events and read configs                                                            |

### Supabase

To start this app, a supabase instance needs to be pre-configured.
See [Schema](./SCHEMA.md) for details on the required tables.
