const debug = require("debug")("ingestor");
const supabase = require("./supabase");

async function insertEvent({
  timestamp,
  network_id,
  block_number,
  block_hash,
  contract_address,
  transaction_hash,
  topic_id,
  event,
  inputs,
  raw_log,
}) {
  debug(
    "Inserting event %s from tx %s on network %s",
    event,
    transaction_hash,
    network_id
  );

  const { error } = await supabase.from("events").insert([
    {
      timestamp,
      network_id,
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
    debug("Inserted event: %o", event);
  }
}

module.exports = { insertEvent };
