const RVLToken = artifacts.require("RVLToken");
const RVLFaucet = artifacts.require("RVLFaucet");
module.exports = (deployer) => {
    deployer.deploy(RVLToken, web3.utils.toWei('1000', 'ether'));
}