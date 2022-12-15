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

Starts ingestor

```shell
$ npm run start
```

### Env vars

To run the server, the following env vars need to be set on a `.env` file in the root of the repo (see [.env.example](/.env.example))

| Name         | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| DEBUG        | Determines namespaces to debug. Available: main, load, ingestor |
| SUPABASE_URL | Supabase URL to store the events                                |
| SUPABASE_KEY | Supabase Key to store the events                                |

## Supabase schema

### networks

| Column Name | Description                           |
| ----------- | ------------------------------------- |
| network_id  | Network ID                            |
| rpc_url     | RPC URL to generate a JsonRpcProvider |

### contracts

| Column Name | Description                                  |
| ----------- | -------------------------------------------- |
| network_id  | Network the contract is deployed on          |
| address     | Contract address                             |
| abi         | Contract ABI containing the events to ingest |
| name        | Contract name (optional)                     |
| version     | Contract version (optional)                  |
