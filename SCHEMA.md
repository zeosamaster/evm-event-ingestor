# Supabase schema

## networks

| Column Name | Description                           |
| ----------- | ------------------------------------- |
| network_id  | Network ID                            |
| rpc_url     | RPC URL to generate a JsonRpcProvider |

## contracts

| Column Name | Description                                  |
| ----------- | -------------------------------------------- |
| network_id  | Network the contract is deployed on          |
| address     | Contract address                             |
| abi         | Contract ABI containing the events to ingest |
| name        | Contract name (optional)                     |
| version     | Contract version (optional)                  |

## events

| Column Name      | Description                                     |
| ---------------- | ----------------------------------------------- |
| id               | Automatically generated ID                      |
| timestamp        | Event timestamp                                 |
| network_id       | Network the event occurred on                   |
| block_number     | Number of the block that contains the event     |
| block_hash       | Hash of the block that contains the event       |
| contract_address | Address of the contract that emitted the event  |
| transaction_hash | Hash of the transaction that contains the event |
| topic_id         | Keccak hash of the event signature              |
| event            | Event name                                      |
| inputs           | Event inputs                                    |
| raw_log          | Event raw log                                   |
