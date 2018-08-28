const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');


const Web3 = require('web3');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0');
console.log('import libraries');

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7550'));
console.log('ethereum node connected');

var rpiEoa0 = '0xed3529037fd92ff2f6d223f22e3038b7d7664f78';

// contract 인스턴스를 생성한다. new web3.eth.Contract(ABI, COA, { prarams... });
var myContract = new web3.eth.Contract([ { "constant": false, "inputs": [ { "constant": false, "inputs": [ { "name": "_sensoredTankAmount", "type": "uint256" } ], "name": "stopCleaning", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x40f41099" }, { "constant": false, "inputs": [ { "name": "_filledOutAmount", "type": "uint256" }, { "name": "_sensoredTankAmount", "type": "uint256" } ], "name": "checkGasTankAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4ca0fe7a" }, { "constant": false, "inputs": [], "name": "stopFueling", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4cb40d6d" }, { "constant": false, "inputs": [], "name": "startCleaning", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x7c080cd8" }, { "constant": false, "inputs": [ { "name": "_emptyingAmount", "type": "uint256" } ], "name": "devEmptyFuel", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x8e3b9997" }, { "constant": true, "inputs": [], "name": "gasTankType", "outputs": [ { "name": "", "type": "string", "value": "Gasoline" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x901e6469" }, { "constant": true, "inputs": [], "name": "Fueling", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x9ae770e5" }, { "constant": false, "inputs": [ { "name": "_fillingFuelAmount", "type": "uint256" } ], "name": "startFueling", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x9b55f8b2" }, { "constant": true, "inputs": [], "name": "EmptyingAmount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x9cc00c4a" }, { "constant": false, "inputs": [ { "name": "_range", "type": "uint256" } ], "name": "setErrorRange", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x9f41e2ca" }, { "constant": true, "inputs": [], "name": "newFuelAmount", "outputs": [ { "name": "", "type": "uint256", "value": "300" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xa71b48a0" }, { "constant": true, "inputs": [], "name": "beforeFuelAmount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc7d25eca" }, { "constant": true, "inputs": [], "name": "gasStation", "outputs": [ { "name": "", "type": "string", "value": "Hansung" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdbb602fd" }, { "constant": true, "inputs": [], "name": "Emptying", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xfdd58722" }, { "inputs": [ { "name": "_gasStationName", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;gas Station Name", "template": "elements_input_string", "value": "Hansung" }, { "name": "_gasTankType", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;gas Tank Type", "template": "elements_input_string", "value": "Gasoline" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_gasStationName", "type": "string" }, { "indexed": false, "name": "_gasTankType", "type": "string" }, { "indexed": false, "name": "_fillingFuelAmount", "type": "uint256" }, { "indexed": false, "name": "_statusMessage", "type": "string" } ], "name": "FuelingEvent", "type": "event", "signature": "0x74a9a6c567708bb12aa9f37f2ae0416136528ad2ea8b3eac59d958f3adfc0739" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_gasStationName", "type": "string" }, { "indexed": false, "name": "_gasTankType", "type": "string" }, { "indexed": false, "name": "_emptyingFuelAmount", "type": "uint256" }, { "indexed": false, "name": "_statusMessage", "type": "string" } ], "name": "CleaningEvent", "type": "event", "signature": "0x485671fd278ed54e7f89122a9195f6ef540ca60dac48c384142f5c2da49ca1f6" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_gasStationName", "type": "string" }, { "indexed": false, "name": "_gasTankType", "type": "string" }, { "indexed": false, "name": "_statusMessage", "type": "string" } ], "name": "gasTankCheckedEvent", "type": "event", "signature": "0x516e5cafa09bac8a93d49056ffc757a345c94fc72514f7419a268962ce8cf758" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_gasStationName", "type": "string" }, { "indexed": false, "name": "_gasTankType", "type": "string" }, { "indexed": false, "name": "_statusMessage", "type": "string" }, { "indexed": false, "name": "_abnormalAmount", "type": "uint256" } ], "name": "abnormalTankCheckedEvent", "type": "event", "signature": "0x597a6675a159b1b27625328c2ed88b0ace0ba484f5f0fe3cc3c407ae23f8e21f" } ], '0xc7261209072fCE9DA683D6507CE779656C0d2bCa', {
    from: rpiEoa0,
    gasPrice: '20000000000'
});
console.log('Got contract instance');
console.log(myContract.options);

//Reading from Ardu
const parser = port.pipe(new Readline({delimiter: '\r\n'}));


const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

const provision = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    server.route({
        method:'GET',
        path:'/usedgasamount/{value}',
        handler:function(request,h) {

            console.log("Is in the server.route");
            var cntSerial = 0;
            var extractedGasAmount = request.params.value;
            console.log(extractedGasAmount);//가스 나간 총 량 => 가스 나간양 + 전에 양 == 현재 양 공식 성립해야함


            parser.on('data', function(data) {

                var length = data.length;

                // 데이터가 시작되는 인덱스의 위치는 7, 설계하는 프로토콜에 따라 달라질 것이다.
                var sensor_value = data.slice(8, length);
                // 컨트랙트에 실제로 반영되는 값은 int값이기 때문에 파싱 과정을 진행해준다.
                var waterHeight = parseInt(sensor_value);

                var t0 = "0";


                if (cntSerial++ === 0) {
                    if(data[0] === t0) {
                            myContract.methods.checkGasTankAmount(extractedGasAmount, waterHeight).send({from: rpiEoa0})
                            .then(console.log('call setString(' + extractedGasAmount + " " + waterHeight + ')'));
                    } else {
                        console.log('error');
                        console.log('data: ' + data);
                        console.log('data[0] ' + data[0]);
                    }
                }
            });
            
            return 0;

        }
     });
    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();