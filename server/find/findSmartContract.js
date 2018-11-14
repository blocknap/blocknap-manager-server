const flow = require('../manager/flow');

exports.create = function (req,res) {
    let name = req.params.name;
    console.log("> req "+JSON.stringify(req.body));
    var info = req.body;

    let infoSc= findConfSmartContract(name);
    if (infoSc != null) {
        let smartContractJS = require(global.properties.path_js+"\\"+infoSc.js);
        let paramsConstructor = smartContractJS.paramsConstructor(info);
        flow.compile(paramsConstructor,infoSc,paramsConstructor,res);
    } else {
        res.json({"result":"smart contract missing "+name});
    }
}

exports.call = function (req,res) {

    let name = req.params.name;
    let function_name = req.params.function_name;
    let address = req.params.address;
    console.log("> call name:"+name+" function_name:"+function_name+" address:"+address);
    console.log("> req "+JSON.stringify(req.body));
    var info = req.body;

    res.json({"result":"call method "+name});

}

function findConfSmartContract(name) {

    console.log("> find smart contract "+JSON.stringify(global.properties));
    let smartContracts = global.properties.smart_contracts;
    let infoSc = null;
    for (i=0;i< smartContracts.length;i++)  {
        let smartContract = smartContracts[i];
        if (smartContract.name===name) {
            infoSc = smartContract;
        }
    }
    return infoSc;
}