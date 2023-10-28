const Web3 = require('web3');

const web3 = new Web3('http://192.168.0.184:8545'); //  Geth node URL
const balance = web3.eth.getBalance("0xFb8F644164a4c77c5f3E1A0A01696DD91a6682E1");

// Test connection
web3.eth.getBlockNumber()
    .then(blockNumber => {
        console.log('Connected to Geth node. Current block number:', blockNumber);
        console.log('Account Balance:', balance);
    })
    .catch(error => {
        console.error('Error connecting to Geth node:', error);
    });

async function executeCommands() {
  try {
    // Get the latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log('Latest Block Number:', latestBlockNumber);

    // Get the balance of an address
    const balance = await web3.eth.getBalance('0xFb8F644164a4c77c5f3E1A0A01696DD91a6682E1'); // accnt address
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

    // Get the gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Gas Price:', gasPrice);

    // Get the network ID
    const networkId = await web3.eth.net.getId();
    console.log('Network ID:', networkId);

    // Get the peer count
    const peerCount = await web3.eth.net.getPeerCount();
    console.log('Peer Count:', peerCount);

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);
  } catch (error) {
    console.error('Error:', error);
  }
}

executeCommands();

