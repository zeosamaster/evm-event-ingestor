const debug = require("debug")("load");
const { ethers } = require("ethers");
const { getProviders } = require("./providers");
const supabase = require("./supabase");

async function getContracts() {
  // get providers for all the configured networks
  const providers = await getProviders();

  // load contracts config from the database
  const { data: contracts } = await supabase
    .from("contracts")
    .select("network_id,address,abi");

  debug("Database contracts: %j", contracts);

  // disregard contracts for which there isn't an available provider
  const filteredContracts = contracts.filter(
    ({ network_id }) => !!providers[network_id]
  );

  // instantiate contracts for each contract config
  return filteredContracts.map(({ network_id, address, abi }) => {
    // disregard non-event ABI items
    const eventsAbi = abi.filter((item) => item.type === "event");

    debug("Contract events ABI: %j", eventsAbi);

    // get relevant JsonRpcProvider
    const provider = providers[network_id];

    // instantiate contract
    const contract = new ethers.Contract(address, eventsAbi, provider);
    return { network_id, address, abi: eventsAbi, contract };
  });
}

module.exports = { getContracts };
