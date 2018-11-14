# BlockNap Manager Server
# Version 0.2.0

 1.Create account in https://infura.io/
    
 2.Create wallet in https://www.myetherwallet.com/
    
 3.Get ether in http://faucet.ropsten.be:3001/
    
 4.Clone repository.
    
 5.Install nodeJS libraries. Execute "npm install" in folder.
    
 6.Edit configuration file

 - ADDRESS_WALLET = Address of wallet create
 - PRIVATE_KEY_WALLET = Private key of wallet
 - PRIVATE_KEY_INFURA = Private key of infura

```json
 {
   "account": "ADRESS_WALLET",
   "port": 8887,
   "private": "PRIVATE_KEY_WALLET",
   "smart_contracts": [
     {
       "name":"BlockNap",
       "sol":"BlockNap.sol",
       "js":"BlockNap.js",
       "listener":"logTest",
       "oracle":"httpWeather"
     }
   ],
   "provider_config": "PRIVATE_KEY_INFURA",
   "provider":"infura_ropsten",
   "provider_web3":"https://ropsten.infura.io/PRIVATE_KEY_INFURA",
   "gas": "0x1e8480",
   "gasPrice": "0x15",
   "path_smart_contracts": "./SmartContract",
   "path_js": "../../SmartContract",
   "db": "postgresql://root@localhost:26257/blocknap?sslmode=disable",
   "oracle_manager":"http://localhost:8888/oracle/v1/add/",
   "oracle_enable":true,
   "listen_manager":"http://localhost:8889/listen/v1/add/",
   "listen_enable":true
 }
```


7.Execute init.sh
