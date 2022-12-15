const debug = require("debug")("load");
const { ethers } = require("ethers");
const { getProvider } = require("./provider");
const supabase = require("./supabase");

function isEvent(config) {
  return config.type === "event";
}

async function getContracts(networkId) {
  const provider = await getProvider(networkId);

  const { data: contractsConfig } = await supabase
    .from("contracts")
    .select("address,abi")
    .eq("network_id", networkId);

  debug("Database contracts: %j", contractsConfig);

  return contractsConfig.map(({ address, abi }) => {
    const eventsAbi = abi.filter(isEvent);

    debug("Contract events ABI: %j", eventsAbi);

    const contract = new ethers.Contract(address, eventsAbi, provider);
    return { address, abi: eventsAbi, contract };
  });
}

module.exports = { getContracts };
