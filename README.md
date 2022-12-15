# Recurring Transfers (Event Ingestor)

## Summary

This backend app ingests the events emitted by the Recurring Transfers smart contract and stores them on a Supabase database

## Developer Guide

### Setup

Install npm dependencies

```shell
$ npm i
```

### Start

Starts the REST API

```shell
$ npm run start
```

### Env vars

To run the server, the following env vars need to be set on a `.env` file in the root of the repo (see [.env.example](/.env.example))

| Name         | Description                               |
| ------------ | ----------------------------------------- |
| SUPABASE_URL | Supabase URL to store the events          |
| SUPABASE_KEY | Supabase Key to store the events          |
| NETWORK_ID   | Network the app should ingest events from |
