require("dotenv").config();

const debug = require("debug")("main");
const { getContracts } = require("./services/contracts");
const { getEventIngestor } = require("./services/events");

async function main() {
  debug("App started");

  // get contracts to listen to
  const contracts = await getContracts();

  // iterate contracts to setup event listeners
  contracts.forEach(({ network_id, contract, abi }) => {
    // iterate contract events to setup event listeners for
    abi.forEach(({ name, inputs }) => {
      // add an ingestor as an event listener
      contract.on(name, getEventIngestor(name, network_id, inputs));
    });
  });

  debug("App listening to contract events");

  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
