const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

exports.compile = function (infoSC,callback) {
    var dateInit = new Date();
    console.log("> Compiling new contract")
    var compile = {};
    var input = fs.readFileSync(global.properties.path_smart_contracts+"/"+infoSC.sol);
    var output = solc.compile(input.toString(), 1);
    var dateEnd = new Date();
    console.log("> End compiling contract:" + (dateEnd - dateInit) / 1000 + "seconds");
    var contract = output.contracts;
    var bytecode = contract[":"+infoSC.name].bytecode;
    var abi = JSON.parse(contract[":"+infoSC.name].interface);
    console.log("> abi:" + contract[":"+infoSC.name].interface);
    compile.abi = abi;
    compile.bytecode = bytecode;
    callback(null,compile);
}

exports.mine = function (info, compile, callback) {
    let dateInit = new Date();
    console.log("> Creating new contract");
    let web3 = global.web3;
    let contract = new web3.eth.Contract(compile.abi.abi);
    contract.deploy({
        data: '0x' + compile.abi.bytecode,
        arguments: info
    })
        .send({
            from: web3.eth.defaultAccount,
            gas: global.properties.gas,
            gasPrice: global.properties.gasPrice
        })
        .on('error', function (error) {
            callback(error, {'address': '', 'status': 'ERROR', 'error': error});
        })
        .then(function (newContractInstance) {
            var contractAdress = newContractInstance.options.address;
            var dateEnd = new Date();
            console.log("> End creating contract:" + (dateEnd - dateInit) / 1000 + "seconds");
            console.log("> contract:https://ropsten.etherscan.io/address/" + contractAdress);
            callback(null, {"address": contractAdress, "abi": compile.abi});
        });
}
