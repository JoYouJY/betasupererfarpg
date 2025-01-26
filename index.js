

var providerNEW;
var signerNEW;
var userAccountNEW;
var AAornot;
const MasterChainID = 57054; //250 is Fantom Mainnet, 64165old s testnet, 57054blaze

 const call_type = {
  CONNECT: 1,
  SEND_CONTRACT: 2,
  FULL_SCREEN: 3,
  NEW_ACCOUNT: 4,
  CONNECT_AA: 5,
  GET_BALANCE: 6,
  INSTALL_PROMPT: 7
};

const response_type = {
  ERROR   : 1,
  HASH    : 2,
  RECEIPT : 3,
  ACCOUNT_NUMBER: 4,
  READ_RESPONSE: 5,
  ROTATE: 6,
  UPDATE: 7,
  WALLET: 8,
  KEY: 9,
  RECOVERY: 10,
  BALANCE: 11,
  AA_CONNECTED: 12
};

var GLOBALWALLETADDRESS;

let currentAccount = null;

// document.getElementById('btn-connectwallet').addEventListener("click", function(event) {
//   ConnectWallet()
// }, {once: false});

// const web3 = new Web3(Web3.givenProvider) ;
// const from = await web3.eth.getAccounts();
/* ORIGINAL CONNECT WALLET WEB3*/ 
async function ConnectWallet(){
  

  if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    
    //provider = ethers.getDefaultProvider()
    //providerNEW = new ethers.JsonRpcProvider('https://rpcapi.sonic.fantom.network/');

  } else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    providerNEW = new ethers.BrowserProvider(window.ethereum)
    
    const network = await providerNEW.getNetwork();
    var chainId = network.chainId;
    // Convert chainId to a number before comparison
    chainId = parseInt(chainId, 10);
    

    // Check if chain ID is not 250
    if (chainId !== MasterChainID) {
      switchToFantom();
      alert("Switch to Fantom Network before Connecting."); // Display alert pop-up
      return;
    }
    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user. 
    // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    //const selectedAccount = accounts[0];

    //signerNEW = providerNEW.getSigner(selectedAccount);
    //console.log(signerNEW);
    //userAccountNEW = await signerNEW.getAddress();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    currentAccount = accounts[1];
        signerNEW = await providerNEW.getSigner(currentAccount);
    //signerNEW = await providerNEW.getSigner();
    console.log(signerNEW);
  } 

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    if (error.code === 4001) {
      window.location.href = 'ethereum:';
    } else {
      
    }
  }

  userAccountNEW = await signerNEW.getAddress();


  console.log('ConnectWallet function executed');
            // Simulating wallet connection logic
            //const walletAddress = "0x1234...abcd"; // Replace with actual wallet address after connection

            // Update button text and disable further clicks
            const button = document.getElementById('walletButton');
            button.innerText = `Connected: ${userAccountNEW}`;
            button.disabled = true;
            button.style.backgroundColor = '#28a745';
            button.style.cursor = 'default';

  AAornot = false;
  GLOBALWALLETADDRESS = userAccountNEW;
 
  
}
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** *///**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** *///**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "BattleRythm",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "Won",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "randret",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "hp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "attack",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "defense",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "intelligence",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "genestrength",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "range",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "special",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct S.Unit[6]",
				"name": "unitgroup",
				"type": "tuple[6]"
			},
			{
				"indexed": false,
				"internalType": "uint256[3]",
				"name": "oponentid",
				"type": "uint256[3]"
			},
			{
				"indexed": false,
				"internalType": "uint256[3]",
				"name": "attackerid",
				"type": "uint256[3]"
			}
		],
		"name": "BattleResultV2",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "PlayerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "hp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "attack",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "defense",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "speed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "intelligence",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "genestrength",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "range",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "special",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct S.Unit",
				"name": "AfterUnit",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "family",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stage",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct S.Status",
				"name": "AfterStatus",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "bond",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stamina",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "hunger",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct S.Time",
				"name": "AfterTime",
				"type": "tuple"
			}
		],
		"name": "StatChangedResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "oldUsername",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newUsername",
				"type": "string"
			}
		],
		"name": "UsernameChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "Battle",
		"outputs": [
			{
				"internalType": "contract BattleV4",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "GiveAllBetaPets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "GiveAllBetaShinningPets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "slot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "GiveChosenPetsOnSlot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "accountAddressToProceed",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[6]",
				"name": "slots",
				"type": "uint256[6]"
			}
		],
		"name": "battleSimulation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newUsername",
				"type": "string"
			}
		],
		"name": "changeUsername",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractRAM",
		"outputs": [
			{
				"internalType": "contract FARPG_RAMInterface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractStorage",
		"outputs": [
			{
				"internalType": "contract FARPG_StorageInterface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getAddressFromUsername",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUsernameFromAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "slot",
				"type": "uint256"
			}
		],
		"name": "petTiming",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bond",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stamina",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endurance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "petunitsMAX",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "attack",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "defense",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "speed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "intelligence",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "genestrength",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "range",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "special",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "registerPlayer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "removeAllBetaPets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "resetAllQuests",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "quest",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "number",
				"type": "uint8"
			}
		],
		"name": "setMainQuest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "number_expansionrequest",
				"type": "uint256"
			}
		],
		"name": "slotLimit_expansionCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "slotLimit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expansionCost",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateBattleV4Address",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateRAMContractAAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateStorageContractAAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contractAddress = "0xb45ee2a458ADee72eC6E04B7C8607eC5F0f9320E"; 

//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** *///**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** *///**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */
//**********IMPORTANT************** */

//################################### AA ####################################
/**/
document.getElementById('getBetapetButton').addEventListener('click', async function() {
  // Get the input address from the text field
  const inputAddress = document.getElementById('betapetaddress').value;

  if (!inputAddress) {
    alert('Please enter a valid address!');
    return;
  }

  // Call the function to send the transaction
  await getBetapetfunc(inputAddress);
});

// Function to send the transaction
async function getBetapetfunc(inputAddress) {
  try {
    const feedbackBox = document.getElementById('feedbackBox');
    // Check if the address is valid using ethers.js
    if (!ethers.isAddress(inputAddress)) {
      alert('Invalid address!');
      return;
    }
    feedbackBox.value = 'Sending transaction...';
   
    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signerNEW);

    // Send the transaction calling the getbetapet function
    const tx = await contract.GiveAllBetaPets(inputAddress);
    console.log('Transaction sent:', tx);
    feedbackBox.value = 'Transaction sent: ' + tx.hash;

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

   // Success message
   feedbackBox.value += '\nTransaction successful!';
    
  } catch (error) {
    console.error('Error sending transaction:', error);
    feedbackBox.value = 'Error sending transaction: ' + error.message;
  }
}

/*******************************************************************/
document.getElementById('RemoveAllBetapetButton').addEventListener('click', async function() {
  // Get the input address from the text field
  const inputAddress = document.getElementById('removeallpetaddress').value;

  if (!inputAddress) {
    alert('Please enter a valid address!');
    return;
  }

  // Call the function to send the transaction
  await removeallBetapetfunc(inputAddress);
});

// Function to send the transaction
async function removeallBetapetfunc(inputAddress) {
  const feedbackBox = document.getElementById('feedbackBox');
  try {
    // Check if the address is valid using ethers.js
    if (!ethers.isAddress(inputAddress)) {
      alert('Invalid address!');
      return;
    }
    feedbackBox.value = 'Sending transaction...';
   
    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signerNEW);

    // Send the transaction calling the getbetapet function
    const tx = await contract.removeAllBetaPets(inputAddress);
    console.log('Transaction sent:', tx);
    feedbackBox.value = 'Transaction sent: ' + tx.hash;

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

     // Success message
     feedbackBox.value += '\nTransaction successful!';
    
  } catch (error) {
    console.error('Error sending transaction:', error);
    feedbackBox.value = 'Error sending transaction: ' + error.message;
  }
}

/*******************************************************************/
document.getElementById('resetallquest').addEventListener('click', async function() {
  // Get the input address from the text field
  const inputAddress = document.getElementById('resetallquestaddress').value;

  if (!inputAddress) {
    alert('Please enter a valid address!');
    return;
  }

  // Call the function to send the transaction
  await resetallquestfunc(inputAddress);
});

// Function to send the transaction
async function resetallquestfunc(inputAddress) {
  const feedbackBox = document.getElementById('feedbackBox');
  try {
    // Check if the address is valid using ethers.js
    if (!ethers.isAddress(inputAddress)) {
      alert('Invalid address!');
      return;
    }
    feedbackBox.value = 'Sending transaction...';
   
    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signerNEW);

    // Send the transaction calling the getbetapet function
    const tx = await contract.resetAllQuests(inputAddress);
    console.log('Transaction sent:', tx);
    feedbackBox.value = 'Transaction sent: ' + tx.hash;

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

     // Success message
     feedbackBox.value += '\nTransaction successful!';
    
  } catch (error) {
    console.error('Error sending transaction:', error);
    feedbackBox.value = 'Error sending transaction: ' + error.message;
  }
}

/*******************************************************************/
document.getElementById('setaquest').addEventListener('click', async function() {
  // Get the input address from the text field
  const inputAddress = document.getElementById('setaquestaddress').value;
  const quest= document.getElementById('whichquest').value;
  const number= document.getElementById('whatnumber').value;
  if (!inputAddress) {
    alert('Please enter a valid address!');
    return;
  }
  if (!quest) {
    alert('Please enter a valid quest number, like 1st quest = 1!');
    return;
  }
  if (!number) {
    alert('Please enter a valid number! like progress, start with 0');
    return;
  }

  // Call the function to send the transaction
  await setaquestfunc(inputAddress,quest,number);
});

// Function to send the transaction
async function setaquestfunc(inputAddress,quest,number) {
  const feedbackBox = document.getElementById('feedbackBox');
  try {
    // Check if the address is valid using ethers.js
    if (!ethers.isAddress(inputAddress)) {
      alert('Invalid address!');
      return;
    }
    feedbackBox.value = 'Sending transaction...';
   
    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signerNEW);

    // Send the transaction calling the getbetapet function
    const tx = await contract.setMainQuest(inputAddress,quest,number);
    console.log('Transaction sent:', tx);
    feedbackBox.value = 'Transaction sent: ' + tx.hash;

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

     // Success message
     feedbackBox.value += '\nTransaction successful!';
    
  } catch (error) {
    console.error('Error sending transaction:', error);
    feedbackBox.value = 'Error sending transaction: ' + error.message;
  }
}