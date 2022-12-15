const supabase = require("../services/supabase");

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

async function insertEvent({
  timestamp,
  block_number,
  block_hash,
  contract_address,
  transaction_hash,
  topic_id,
  event,
  inputs,
  raw_log,
}) {
  console.debug("Inserting event", event, transaction_hash);

  const { error } = await supabase.from("events").insert([
    {
      timestamp,
      block_number,
      block_hash,
      contract_address,
      transaction_hash,
      topic_id,
      event,
      inputs,
      raw_log,
    },
  ]);

  if (error) {
    console.error("Error inserting event", error);
  } else {
    console.info("Inserted event", event);
  }
}

const getEventIngestor = (eventName, inputsConfig) => {
  return async (...eventArgs) => {
    // the raw log is the last argument passed to event listeners
    const raw_log = eventArgs.pop();

    // log event ingestion start
    const { transactionHash } = raw_log;
    console.info("Detected event", eventName, transactionHash);

    // get the event metadata from the raw log
    const metadata = getEventMetadata(raw_log);

    // parse the remaining listener arguments based on the event inputs config
    const inputs = eventArgs.reduce((res, eventArg, i) => {
      const { name } = inputsConfig[i];
      return { ...res, [name]: eventArg.toString() };
    }, {});

    console.debug({ inputs });

    // store the event
    await insertEvent({ ...metadata, inputs });

    // log event ingestion success
    console.info(
      "Event successfully ingested event",
      eventName,
      transactionHash
    );
  };
};

module.exports = { getEventIngestor };
