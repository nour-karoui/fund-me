const RVLFaucet = artifacts.require("RVLFaucet");
const RVLToken = artifacts.require("RVLToken");
module.exports = (deployer) => {
    deployer.deploy(RVLFaucet, RVLToken.address);
}