require("dotenv").config();

const debug = require("debug")("main");
const { getContracts } = require("./services/contracts");
const { getEventIngestor } = require("./services/events");

const { NETWORK_ID } = process.env;

async function main() {
  debug("App started");

  const contracts = await getContracts(NETWORK_ID);

  contracts.forEach(({ contract, abi }) => {
    abi.forEach(({ name, inputs }) => {
      contract.on(name, getEventIngestor(name, inputs));
    });
  });

  debug("App listening to contract events from network %s", NETWORK_ID);

  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
