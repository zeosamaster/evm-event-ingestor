const debug = require("debug")("ingestor");
const { insertEvent } = require("./database");

function getEventMetadata(raw_log) {
  const timestamp = new Date();

  const {
    blockNumber: block_number,
    blockHash: block_hash,
    address: contract_address,
    transactionHash: transaction_hash,
    topics,
    event,
  } = raw_log;

  const [topic_id] = topics;

  return {
    timestamp,
    block_number,
    block_hash,
    contract_address,
    transaction_hash,
    topic_id,
    event,
    raw_log,
  };
}

const getEventIngestor = (eventName, inputsConfig) => {
  return async (...eventArgs) => {
    // the raw log is the last argument passed to event listeners
    const raw_log = eventArgs.pop();

    // log event ingestion start
    const { transactionHash } = raw_log;
    debug("Detected event %s on tx %s", eventName, transactionHash);

    // get the event metadata from the raw log
    const metadata = getEventMetadata(raw_log);

    // parse the remaining listener arguments based on the event inputs config
    const inputs = eventArgs.reduce((res, eventArg, i) => {
      const { name } = inputsConfig[i];
      return { ...res, [name]: eventArg.toString() };
    }, {});

    debug("Event inputs: %o", inputs);

    // store the event
    await insertEvent({ ...metadata, inputs });

    // log event ingestion success
    debug(
      "Successfully ingested event %s from tx %s",
      eventName,
      transactionHash
    );
  };
};

module.exports = { getEventIngestor };
