const ethers = require('ethers');
const providers = require('ethers').providers;
const utils = require('ethers').utils;
const Web3 = require('web3');


exports.openAccount = function (callback) {
    var pro = global.properties;
    const web3 = new Web3(new Web3.providers.HttpProvider(pro.provider_web3));
    const account = web3.eth.accounts.privateKeyToAccount(pro.private);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    console.log("> account.address:https://ropsten.etherscan.io/address/"+account.address);
    console.log("> gas:"+web3.utils.hexToNumber(pro.gas)+" Limit");
    console.log("> gasPrice:"+web3.utils.hexToNumber(pro.gasPrice)+" Wei");
    global.web3 = web3;
    callback(null, 'openAccount');
}


function getProvider() {
    console.log("> get provider");
    var pro = global.properties;
    if (pro.provider=="infura_ropsten") {
        return  new providers.InfuraProvider(providers.networks.ropsten,pro.provider_config)
    } else if ("json_rpc") {
        return new providers.JsonRpcProvider(pro.provider_config, network);
    }
}


exports.setWallet = function (callback) {
    console.log("> get wallet")
    var pro = global.properties;
    var provider = getProvider();
    wallet = new ethers.Wallet(pro.private, provider);
    wallet.provider = provider;
    global.wallet = wallet;
    callback(null, 'setWallet');
}