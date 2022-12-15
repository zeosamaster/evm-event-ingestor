const { ethers } = require("ethers");
const supabase = require("./supabase");

async function getProvider(networkId) {
  const { data: networks } = await supabase
    .from("networks")
    .select("rpc_url")
    .eq("network_id", networkId);

  console.debug({ networks });

  if (!networks?.[0]?.rpc_url) {
    throw Error("Unable to get RPC URL");
  }

  return new ethers.providers.JsonRpcProvider(networks?.[0]?.rpc_url);
}

module.exports = { getProvider };
