

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

async function presetWalletConnect() {
	// Create a JSON RPC provider for Sonic Blaze Testnet
	const provider = new ethers.JsonRpcProvider("https://rpc.blaze.soniclabs.com/", {
	  chainId: 57054,
	  name: "Sonic Blaze Testnet"
	});
  
	// Create a wallet instance from the preset private key and provider
	//0xF131E9fCb2A9497e89B469271b873a3c06617793 <-- address of the pky
	const privateKey = "0x30b2b4b604ddd7d15162575ba83edc507e79eaf1d48d9f79dfa7067545728ef8";
	const wallet = new ethers.Wallet(privateKey, provider);
	console.log("Using wallet address:", wallet.address);
  
	// Use the preset wallet as the signer for contract interactions
	signerNEW = wallet; // Assuming signerNEW is a global variable used later
  
	// Attach event listener for sending transactions
	document.getElementById('giveALLEventItems_').addEventListener('click', async function () {
	  // Get the input address from the text field
	  const inputAddress = document.getElementById('giveALLEventItems_address').value;
	  if (!inputAddress) {
		alert('Please enter a valid address!');
		return;
	  }
  
	  await giveALLeventsITEM_func(inputAddress);
	});
}
	presetWalletConnect();

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
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"inputs": [],
		"name": "Q1_1JojoTranscended_cheat",
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
		"name": "removeAllBetaPets",
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
				"name": "slot",
				"type": "uint256"
			}
		],
		"name": "removeChosenPetOnSlot",
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
				"internalType": "address",
				"name": "Relayered",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "PersonalWallet",
				"type": "address"
			}
		],
		"name": "setPersonalWalletAddressToControl",
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
				"name": "trainerID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "trainerGeneStrength",
				"type": "uint256"
			}
		],
		"name": "setTrainerGENE",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "Address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "UID",
				"type": "uint256"
			}
		],
		"name": "setUIDmain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"name": "from_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to_address",
				"type": "address"
			}
		],
		"name": "transferUID",
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
		"name": "withdraw",
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
				"internalType": "contract IFARPG_Storage",
				"name": "",
				"type": "address"
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
		"inputs": [],
		"name": "showMyUIDnow",
		"outputs": [
			{
				"internalType": "address",
				"name": "Address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "UID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0x50de6cbea6C9081273A539E75FF6648a19F2eD00"; 

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
    feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';

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
    feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';

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
    feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';

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
    feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';

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
document.getElementById('GiveChosenPetsOnSlot_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('GiveChosenPetsOnSlot_address').value;
	const slot= document.getElementById('GiveChosenPetsOnSlot_slot').value;
	const lingsid= document.getElementById('GiveChosenPetsOnSlot_LingsID').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!slot) {
	  alert('Please enter a valid quest number, like 1st quest = 1!');
	  return;
	}
	if (!lingsid) {
	  alert('Please enter a valid number! like progress, start with 0');
	  return;
	}
  
	// Call the function to send the transaction
	await GiveChosenPetsOnSlotfunc(inputAddress,slot,lingsid);
  });
  
  // Function to send the transaction
  async function GiveChosenPetsOnSlotfunc(inputAddress,slot,lingsid) {
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
	  const tx = await contract.GiveChosenPetsOnSlot(inputAddress,slot,lingsid);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
document.getElementById('removeChosenPetOnSlot_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('removeChosenPetOnSlot_address').value;
	const slot= document.getElementById('removeChosenPetOnSlot_slot').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!slot) {
	  alert('Please enter a valid quest number, like 1st quest = 1!');
	  return;
	}
	
  
	// Call the function to send the transaction
	await removeChosenPetOnSlot_func(inputAddress,slot);
  });
  
  // Function to send the transaction
  async function removeChosenPetOnSlot_func(inputAddress,slot) {
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
	  const tx = await contract.removeChosenPetOnSlot(inputAddress,slot);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
document.getElementById('setUID_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('setUID_address').value;
	const UIDinput= document.getElementById('setUID_UID').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!UIDinput) {
	  alert('Please enter a valid quest number, like 1st quest = 1!');
	  return;
	}
	
  
	// Call the function to send the transaction
	await setUID_func(inputAddress,UIDinput);
  });
  
  // Function to send the transaction
  async function setUID_func(inputAddress,UIDinput) {
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
	  const tx = await contract.setUIDmain(inputAddress,UIDinput);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
  document.getElementById('setPersonalWallet_').addEventListener('click', async function() {
	// Get the input address from the text field
	const Relayeraddress = document.getElementById('setPersonalWallet_Relayeraddress').value;
	const Personaladdress= document.getElementById('setPersonalWallet_Personaladdress').value;
	if (!Relayeraddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!Personaladdress) {
	  alert('Please enter a valid quest number, like 1st quest = 1!');
	  return;
	}
	
  
	// Call the function to send the transaction
	await setPersonalWallet_func(Relayeraddress,Personaladdress);
  });
  
  // Function to send the transaction
  async function setPersonalWallet_func(Relayeraddress,Personaladdress) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(Relayeraddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddress, contractABI, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setPersonalWalletAddressToControl(Relayeraddress,Personaladdress);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
document.getElementById('setTrainerGENE_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('setTrainerGENE_address').value;
	const trainerid= document.getElementById('setTrainerGENE_trainerID').value;
	const genestrength= document.getElementById('setTrainerGENE_genestrength').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!trainerid) {
	  alert('Please enter a valid quest number, like 1st quest = 1!');
	  return;
	}
	if (!genestrength) {
	  alert('Please enter a valid number! like progress, start with 0');
	  return;
	}
  
	// Call the function to send the transaction
	await setTrainerGENE_func(inputAddress,trainerid,genestrength);
  });
  
  // Function to send the transaction
  async function setTrainerGENE_func(inputAddress,trainerid,genestrength) {
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
	  const tx = await contract.setTrainerGENE(inputAddress,trainerid,genestrength);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
document.getElementById('getBetashinningling').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('getBetashinningling_address').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	
  
	// Call the function to send the transaction
	await getBetashinningling_func(inputAddress,);
  });
  
  // Function to send the transaction
  async function getBetashinningling_func(inputAddress) {
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
	  const tx = await contract.GiveAllBetaShinningPets(inputAddress);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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


//===================================================================================
  //==================  GIVE ITEM NFT CONTRACT! ======================
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
  const contractABIITEM = [
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
		"inputs": [],
		"name": "ItemsNFT",
		"outputs": [
			{
				"internalType": "contract Items_ERC1155Interface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
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
		"inputs": [],
		"name": "contractStorage",
		"outputs": [
			{
				"internalType": "contract IFARPG_Storage",
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
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "giveALLaerobot",
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
		"name": "giveALLheadgear",
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
		"name": "giveALLoutfit",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "giveONEitem",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "removeONEitem",
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
			},
			{
				"internalType": "uint256",
				"name": "points",
				"type": "uint256"
			}
		],
		"name": "setPoint1Credit",
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
				"name": "points",
				"type": "uint256"
			}
		],
		"name": "setPoint2Genemap",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "updateItemNFTAddress",
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
];

const contractAddressITEM = "0x7f295B288124E40C9CF39C332156213acc9a3C8b"; 
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

   /*******************************************************************/ 
   document.getElementById('giveALLoutfit_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('giveALLoutfit_address').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	
  console.log("debug1");
	// Call the function to send the transaction
	await giveALLoutfit_func(inputAddress,);
  });
  
  // Function to send the transaction
  async function giveALLoutfit_func(inputAddress) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.giveALLoutfit(inputAddress);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
	document.getElementById('giveALLheadgear_').addEventListener('click', async function() {
		// Get the input address from the text field
		const inputAddress = document.getElementById('giveALLheadgear_address').value;
		if (!inputAddress) {
		  alert('Please enter a valid address!');
		  return;
		}
		
	  
		// Call the function to send the transaction
		await giveALLheadgear_func(inputAddress,);
	  });
	  
	  // Function to send the transaction
	  async function giveALLheadgear_func(inputAddress) {
		const feedbackBox = document.getElementById('feedbackBox');
		try {
		  // Check if the address is valid using ethers.js
		  if (!ethers.isAddress(inputAddress)) {
			alert('Invalid address!');
			return;
		  }
		  feedbackBox.value = 'Sending transaction...';
		 
		  // Initialize the contract
		  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
	  
		  // Send the transaction calling the getbetapet function
		  const tx = await contract.giveALLheadgear(inputAddress);
		  console.log('Transaction sent:', tx);
		  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
	  
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
	document.getElementById('giveALLaerobot_').addEventListener('click', async function() {
		// Get the input address from the text field
		const inputAddress = document.getElementById('giveALLaerobot_address').value;
		if (!inputAddress) {
		  alert('Please enter a valid address!');
		  return;
		}
		
	  
		// Call the function to send the transaction
		await giveALLaerobot_func(inputAddress,);
	  });
	  
	  // Function to send the transaction
	  async function giveALLaerobot_func(inputAddress) {
		const feedbackBox = document.getElementById('feedbackBox');
		try {
		  // Check if the address is valid using ethers.js
		  if (!ethers.isAddress(inputAddress)) {
			alert('Invalid address!');
			return;
		  }
		  feedbackBox.value = 'Sending transaction...';
		 
		  // Initialize the contract
		  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
	  
		  // Send the transaction calling the getbetapet function
		  const tx = await contract.giveALLaerobot(inputAddress);
		  console.log('Transaction sent:', tx);
		  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
	  
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
 document.getElementById('giveONEitem_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('giveONEitem_address').value;
	const itemid = document.getElementById('giveONEitem_uint').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!itemid) {
		alert('Please enter a valid address!');
		return;
	  }
	
  
	// Call the function to send the transaction
	await giveONEitem_func(inputAddress,itemid);
  });
  
  // Function to send the transaction
  async function giveONEitem_func(inputAddress,itemid) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.giveONEitem(inputAddress,itemid);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
 document.getElementById('removeONEitem_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('removeONEitem_address').value;
	const itemid = document.getElementById('removeONEitem_uint').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!itemid) {
		alert('Please enter a valid address!');
		return;
	  }
	
  
	// Call the function to send the transaction
	await removeONEitem_func(inputAddress,itemid);
  });
  
  // Function to send the transaction
  async function removeONEitem_func(inputAddress,itemid) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.removeONEitem(inputAddress,itemid);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
 document.getElementById('setPoint1Credit_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('setPoint1Credit_address').value;
	const point = document.getElementById('setPoint1Credit_uint').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!point) {
		alert('Please enter a valid address!');
		return;
	  }
	
  
	// Call the function to send the transaction
	await setPoint1Credit_func(inputAddress,point);
  });
  
  // Function to send the transaction
  async function setPoint1Credit_func(inputAddress,point) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setPoint1Credit(inputAddress,point);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
 document.getElementById('setPoint2Genemap_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('setPoint2Genemap_address').value;
	const point = document.getElementById('setPoint2Genemap_uint').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!point) {
		alert('Please enter a valid address!');
		return;
	  }
	
  
	// Call the function to send the transaction
	await setPoint2Genemap_func(inputAddress,point);
  });
  
  // Function to send the transaction
  async function setPoint2Genemap_func(inputAddress,point) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 console.log(inputAddress);
	 console.log(point);
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressITEM, contractABIITEM, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setPoint2Genemap(inputAddress,point);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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


  

//===================================================================================
  //==================  GIVE ITEM NFT CONTRACT! ======================
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
const contractABIEVENT = [
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
		"inputs": [],
		"name": "EventItemsNFT",
		"outputs": [
			{
				"internalType": "contract EventItems_ERC1155Interface",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
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
		"inputs": [],
		"name": "contractStorage",
		"outputs": [
			{
				"internalType": "contract IFARPG_Storage",
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
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "giveALLeventsITEM",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "removeONEitem",
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
		"name": "updateEventNFTAddress",
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

const contractAddressEVENT = "0x34e577214E1Fb186e12344C2Fdba79D8AB2d39c0"; 
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




 /*******************************************************************/ 
 document.getElementById('removeONEEventitem_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('removeONEEventitem_address').value;
	const itemid = document.getElementById('removeONEEventitem_uint').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	if (!itemid) {
		alert('Please enter a valid address!');
		return;
	  }
	
  
	// Call the function to send the transaction
	await removeONEitemEVENT_func(inputAddress,itemid);
  });
  
  // Function to send the transaction
  async function removeONEitemEVENT_func(inputAddress,itemid) {
	const feedbackBox = document.getElementById('feedbackBox');
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	 
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressEVENT, contractABIEVENT, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.removeONEitem(inputAddress,itemid);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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
  document.getElementById('giveALLEventItems_').addEventListener('click', async function() {
	// Get the input address from the text field
	const inputAddress = document.getElementById('giveALLEventItems_address').value;
	if (!inputAddress) {
	  alert('Please enter a valid address!');
	  return;
	}
	
  console.log("debug1");
	// Call the function to send the transaction
	await giveALLeventsITEM_func(inputAddress,);
  });
  
  // Function to send the transaction
  async function giveALLeventsITEM_func(inputAddress) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  // Check if the address is valid using ethers.js
	  if (!ethers.isAddress(inputAddress)) {
		alert('Invalid address!');
		return;
	  }
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressEVENT, contractABIEVENT, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.giveALLeventsITEM(inputAddress);
	  console.log('Transaction sent:', tx);
	  feedbackBox.value = 'Transaction sent: ' + tx.hash + '\nWaiting Receipt...';
  
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