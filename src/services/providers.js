const debug = require("debug")("load");
const { ethers } = require("ethers");
const supabase = require("./supabase");

async function getProviders() {
  // load networks from the database
  const { data: networks } = await supabase
    .from("networks")
    .select("network_id,rpc_url");

  debug("Database networks: %j", networks);

  // create a JsonRpcProvider for each network
  return networks.reduce(
    (res, { network_id, rpc_url }) => ({
      ...res,
      [network_id]: new ethers.providers.JsonRpcProvider(rpc_url),
    }),
    {}
  );
}

module.exports = { getProviders };
