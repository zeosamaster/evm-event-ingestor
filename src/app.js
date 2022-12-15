require("dotenv").config();

const { getContracts } = require("./services/contracts");
const { getEventIngestor } = require("./services/events");

const { NETWORK_ID } = process.env;

async function main() {
  console.info("App started");

  const contracts = await getContracts(NETWORK_ID);

  contracts.forEach(({ contract, abi }) => {
    abi.forEach(({ name, inputs }) => {
      contract.on(name, getEventIngestor(name, inputs));
    });
  });

  console.info("Listening to contract events on network", NETWORK_ID);

  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
