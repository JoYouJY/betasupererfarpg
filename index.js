

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
	/*
	document.getElementById('giveALLEventItems_').addEventListener('click', async function () {
	  // Get the input address from the text field
	  const inputAddress = document.getElementById('giveALLEventItems_address').value;
	  if (!inputAddress) {
		alert('Please enter a valid address!');
		return;
	  }
  
	  await giveALLeventsITEM_func(inputAddress);
	});*/
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
      alert("Switch to BLAZE Network before Connecting."); // Display alert pop-up
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
const contractABIWBCONTROL = [
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
				"indexed": false,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldHP",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newHP",
				"type": "uint256"
			}
		],
		"name": "BossHPChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "costS",
				"type": "uint256"
			}
		],
		"name": "LoanCostSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[5]",
				"name": "slots",
				"type": "uint256[5]"
			}
		],
		"name": "LoanSlotSet",
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
				"indexed": false,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "damage",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldMax",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newMax",
				"type": "uint256"
			}
		],
		"name": "PlayerBattle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "bossKilled",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "RoundEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "roundId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bossHP",
				"type": "uint256"
			}
		],
		"name": "RoundStarted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "inputAddress",
				"type": "address"
			}
		],
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
				"internalType": "address",
				"name": "inputAddress",
				"type": "address"
			}
		],
		"name": "accountAddressToUID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "UID",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[3]",
				"name": "_playerUnitsSlots",
				"type": "uint256[3]"
			},
			{
				"internalType": "uint256",
				"name": "encodedInvitesCode",
				"type": "uint256"
			}
		],
		"name": "battleBoss",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "battleContract",
		"outputs": [
			{
				"internalType": "contract FARPG_BattleV4",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "battleFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "encodedInvitesCode",
				"type": "uint256"
			}
		],
		"name": "decodeUID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "earlyKillHPIncrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "encodeUID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "encodedInvitesCode",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "escapeHPDecrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_end",
				"type": "uint256"
			}
		],
		"name": "getParticipantsSlice",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_playerAddresses",
				"type": "address[]"
			}
		],
		"name": "getRoundAllUserMaxDamageSlice",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "damagesSlice",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			}
		],
		"name": "getRoundInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "created",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "bossHP",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bossMaxHP",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "bossKilled",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "killedTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "participantsAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct WORLDBOSS_Control_V1.RoundInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			}
		],
		"name": "getRoundInfo_DEBUG_",
		"outputs": [
			{
				"internalType": "bool",
				"name": "created",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "bossHP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bossMaxHP",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "bossKilled",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "killedTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "participantsAmount",
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
				"name": "_roundId",
				"type": "uint256"
			}
		],
		"name": "getRoundParticipantsNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "participantsAmount",
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
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "getRoundUserMaxDamage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "skillIndex",
				"type": "uint256"
			}
		],
		"name": "getSpecialSkillBonus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "mask",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bonusPercent",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "skillIndices",
				"type": "uint256[]"
			}
		],
		"name": "getSpecialSkillBonuses",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "masks",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bonusPercents",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "getUserBattleLogsNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "battleLogsAmount",
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
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_end",
				"type": "uint256"
			}
		],
		"name": "getUserBattleLogsSlice",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "damagesSlice",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "timesSlice",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[3][]",
				"name": "playerUnits",
				"type": "uint256[3][]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globalAssistCooldown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globalMaxAssistDailyLimit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globalSpamCooldown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lateKillHPIncrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "_loanerUID",
				"type": "uint256"
			}
		],
		"name": "loanerAssistLimitCheck",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "DailyAssistAttempt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "remainingTimeReset_s",
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
				"name": "_nextRoundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_baseHP",
				"type": "uint256"
			},
			{
				"internalType": "uint256[3]",
				"name": "_bossUnits",
				"type": "uint256[3]"
			}
		],
		"name": "nextRound",
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
		"inputs": [],
		"name": "penalty1_RewardPercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "penalty1_StaggerfromStart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "penalty2_RewardPercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "penalty2_StaggerfromStart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
		"inputs": [],
		"name": "roundDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roundStartTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setBattleFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_currentRoundId",
				"type": "uint256"
			}
		],
		"name": "setCurrentRoundId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_assistCooldown",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxAssistDailyLimit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_spamCooldown",
				"type": "uint256"
			}
		],
		"name": "setGlobalConfig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_earlyKill",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lateKill",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_escapeDecrease",
				"type": "uint256"
			}
		],
		"name": "setHPIncrements",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "costS",
				"type": "uint256"
			}
		],
		"name": "setLoanCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[5]",
				"name": "slots",
				"type": "uint256[5]"
			}
		],
		"name": "setLoanSlot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[3]",
				"name": "_ids",
				"type": "uint256[3]"
			}
		],
		"name": "setMinionIDsInRegistry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
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
		"name": "setMinionStatusInRegistry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
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
		"name": "setMinionTimeInRegistry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "atk",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "def",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "spd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "intel",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gs",
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
		"name": "setMinionUnitInRegistry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "encodedAssistantUID",
				"type": "uint256"
			}
		],
		"name": "setOneAssistantEncodedUID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_p1Stagger",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_p2Stagger",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_p1Reward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_p2Reward",
				"type": "uint256"
			}
		],
		"name": "setPenaltiesAndRoundDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "skillIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mask",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bonusPercent",
				"type": "uint256"
			}
		],
		"name": "setSpecialSkillBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "skillIndices",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "masks",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bonusPercents",
				"type": "uint256[]"
			}
		],
		"name": "setSpecialSkillBonuses",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "specialSkillBonuses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "mask",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bonusPercent",
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
				"name": "_roundId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bossHP",
				"type": "uint256"
			},
			{
				"internalType": "uint256[3]",
				"name": "_bossUnitIds",
				"type": "uint256[3]"
			},
			{
				"internalType": "uint256",
				"name": "startTimeStamp",
				"type": "uint256"
			}
		],
		"name": "startRound",
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
		"inputs": [],
		"name": "treasury",
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
				"name": "_battleContract",
				"type": "address"
			}
		],
		"name": "updateBattleAddress",
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
		"name": "updateRegistryContractAAddress",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_newTreasury",
				"type": "address"
			}
		],
		"name": "updateTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wbRegistry",
		"outputs": [
			{
				"internalType": "contract WORLDBOSS_Registry_V1",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"name": "withdrawAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddressWBCONTROL = "0x6ec51a59Ab5EDd58DAE7fBE82A05cC3450019C8D"; 
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
document.getElementById('battleBoss_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputaddress0 = JSON.parse(document.getElementById('WBCTRLbattleBoss_address').value);
	const cinputuint1 = JSON.parse(document.getElementById('WBCTRLbattleBoss_uint').value);
	const cinputvalue2 = document.getElementById('WBCTRLbattleBoss_value').value;
	//no js parse because i want to use parseEther later in tx

  console.log("debug1");
	// Call the function to send the transaction
	await battleBossWBCTRL_func(cinputaddress0,cinputuint1,cinputvalue2);
 });
// Function to send the transaction
async function battleBossWBCTRL_func(inputaddress0,inputuint1,inputvalue2) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.battleBoss(inputaddress0, inputuint1, { value: ethers.parseEther(inputvalue2) });
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
//------------
document.getElementById('transferOwnership_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputaddress0 = document.getElementById('WBCTRLtransferOwnership_address').value;

  console.log("debug1");
	// Call the function to send the transaction
	await transferOwnershipWBCTRL_func(cinputaddress0);
 });
// Function to send the transaction
async function transferOwnershipWBCTRL_func(inputaddress0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.transferOwnership(inputaddress0);
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
//------------
document.getElementById('startRound_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputroundid0 = JSON.parse(document.getElementById('WBCTRLstartRound_roundid').value);
	const cinputbossHP1 = JSON.parse(document.getElementById('WBCTRLstartRound_bossHP').value);
	const cinputbossunitid32 = JSON.parse(document.getElementById('WBCTRLstartRound_bossunitid3').value);
	const cinputstartTimeStamp3 = JSON.parse(document.getElementById('WBCTRLstartRound_startTimeStamp').value);

  console.log("debug1");
	// Call the function to send the transaction
	await startRoundWBCTRL_func(cinputroundid0,cinputbossHP1,cinputbossunitid32,cinputstartTimeStamp3);
 });
// Function to send the transaction
async function startRoundWBCTRL_func(inputroundid0,inputbossHP1,inputbossunitid32,inputstartTimeStamp3) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.startRound(inputroundid0,inputbossHP1,inputbossunitid32,inputstartTimeStamp3);
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
//------------
document.getElementById('setCurrentRoundId_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputcurrentRoundId0 = JSON.parse(document.getElementById('WBCTRLsetCurrentRoundId_currentRoundId').value);

  console.log("debug1");
	// Call the function to send the transaction
	await setCurrentRoundIdWBCTRL_func(cinputcurrentRoundId0);
 });
// Function to send the transaction
async function setCurrentRoundIdWBCTRL_func(inputcurrentRoundId0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setCurrentRoundId(inputcurrentRoundId0);
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
//------------
document.getElementById('setSpecialSkillBonus_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputskillIndex0 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonus_skillIndex').value);
	const cinputmask1 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonus_mask').value);
	const cinputbonusPercent2 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonus_bonusPercent').value);

  console.log("debug1");
	// Call the function to send the transaction
	await setSpecialSkillBonusWBCTRL_func(cinputskillIndex0,cinputmask1,cinputbonusPercent2);
 });
// Function to send the transaction
async function setSpecialSkillBonusWBCTRL_func(inputskillIndex0,inputmask1,inputbonusPercent2) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setSpecialSkillBonus(inputskillIndex0,inputmask1,inputbonusPercent2);
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
//------------
document.getElementById('setSpecialSkillBonuses_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputskillIndexArray0 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonuses_skillIndexArray').value);
	const cinputmaskArray1 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonuses_maskArray').value);
	const cinputbonusPercentArray2 = JSON.parse(document.getElementById('WBCTRLsetSpecialSkillBonuses_bonusPercentArray').value);

  console.log("debug1");
	// Call the function to send the transaction
	await setSpecialSkillBonusesWBCTRL_func(cinputskillIndexArray0,cinputmaskArray1,cinputbonusPercentArray2);
 });
// Function to send the transaction
async function setSpecialSkillBonusesWBCTRL_func(inputskillIndexArray0,inputmaskArray1,inputbonusPercentArray2) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setSpecialSkillBonuses(inputskillIndexArray0,inputmaskArray1,inputbonusPercentArray2);
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
//------------
document.getElementById('setBattleFee_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputfee0 = document.getElementById('WBCTRLsetBattleFee_fee').value;
	//cannot JSON parse because i want to use parseEther later in tx

  console.log("debug1");
	// Call the function to send the transaction
	await setBattleFeeWBCTRL_func(cinputfee0);
 });
// Function to send the transaction
async function setBattleFeeWBCTRL_func(inputfee0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  console.log(ethers.parseEther(inputfee0));
	  const tx = await contract.setBattleFee(ethers.parseEther(inputfee0));
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
//------------
document.getElementById('endRound_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field

  console.log("debug1");
	// Call the function to send the transaction
	await endRoundWBCTRL_func();
 });
// Function to send the transaction
async function endRoundWBCTRL_func() {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.endRound();
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
//------------
document.getElementById('setLoanCost_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputcostS0 = document.getElementById('WBCTRLsetLoanCost_costS').value;

  console.log("debug1");
	// Call the function to send the transaction
	await setLoanCostWBCTRL_func(cinputcostS0);
 });
// Function to send the transaction
async function setLoanCostWBCTRL_func(inputcostS0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setLoanCost(ethers.parseEther(inputcostS0));
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
//------------
document.getElementById('setLoanSlot_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputslots0 = JSON.parse(document.getElementById('WBCTRLsetLoanSlot_slots').value);

  console.log("debug1");
	// Call the function to send the transaction
	await setLoanSlotWBCTRL_func(cinputslots0);
 });
// Function to send the transaction
async function setLoanSlotWBCTRL_func(inputslots0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setLoanSlot(inputslots0);
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
//------------
document.getElementById('setOneAssistantEncodedUID_WBCTRL').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputindex0 = JSON.parse(document.getElementById('WBCTRLsetOneAssistantEncodedUID_index').value);
	const cinputencodedAssistantUID1 = JSON.parse(document.getElementById('WBCTRLsetOneAssistantEncodedUID_encodedAssistantUID').value);

  console.log("debug1");
	// Call the function to send the transaction
	await setOneAssistantEncodedUIDWBCTRL_func(cinputindex0,cinputencodedAssistantUID1);
 });
// Function to send the transaction
async function setOneAssistantEncodedUIDWBCTRL_func(inputindex0,inputencodedAssistantUID1) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressWBCONTROL, contractABIWBCONTROL, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.setOneAssistantEncodedUID(inputindex0,inputencodedAssistantUID1);
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
//------------


const contractABIBETA_getBetaPet_ALLnew = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			}
		],
		"name": "GiveAllBetaPetsNEW",
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
		"name": "GiveAllBetaPetsNEWShinning",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "minttoaddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "itemid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "itemqty",
				"type": "uint256"
			}
		],
		"name": "mintEventIDQty",
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
		"inputs": [],
		"name": "renounceOwnership",
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
				"name": "_newContractAAddress",
				"type": "address"
			}
		],
		"name": "updateEVENTContractAAddress",
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
		"name": "contractEVENT",
		"outputs": [
			{
				"internalType": "contract FARPG_EventInterface",
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
	}
]

const contractAddressBETA_getBetaPet_ALLnew = "0x5252FF8f507859ffa0253A4a3B5BA9e6Aa298147"; 
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

document.getElementById('GiveAllBetaPetsNEW_getBETAnew').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputaddress0 = document.getElementById('getBETAnewGiveAllBetaPetsNEW_address').value;

  console.log("debug1");
	// Call the function to send the transaction
	await GiveAllBetaPetsNEWgetBETAnew_func(cinputaddress0);
 });
// Function to send the transaction
async function GiveAllBetaPetsNEWgetBETAnew_func(inputaddress0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressBETA_getBetaPet_ALLnew, contractABIBETA_getBetaPet_ALLnew, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.GiveAllBetaPetsNEW(inputaddress0,
		{ gasLimit: 15000000 });
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
//------------
document.getElementById('GiveAllBetaPetsNEWShinning_getBETAnew').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputaddress0 = document.getElementById('getBETAnewGiveAllBetaPetsNEWShinning_address').value;

  console.log("debug1");
	// Call the function to send the transaction
	await GiveAllBetaPetsNEWShinninggetBETAnew_func(cinputaddress0);
 });
// Function to send the transaction
async function GiveAllBetaPetsNEWShinninggetBETAnew_func(inputaddress0) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressBETA_getBetaPet_ALLnew, contractABIBETA_getBetaPet_ALLnew, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.GiveAllBetaPetsNEWShinning(inputaddress0,
		{ gasLimit: 25000000 });
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
//------------
document.getElementById('mintEventIDQty_getBETAnew').addEventListener('click', async function() {
	// Get the input address from the text field
	const cinputminttoaddress0 = document.getElementById('getBETAnewmintEventIDQty_minttoaddress').value;
	const cinputitemid1 = JSON.parse(document.getElementById('getBETAnewmintEventIDQty_itemid').value);
	const cinputitemqty2 = JSON.parse(document.getElementById('getBETAnewmintEventIDQty_itemqty').value);

  console.log("debug1");
	// Call the function to send the transaction
	await mintEventIDQtygetBETAnew_func(cinputminttoaddress0,cinputitemid1,cinputitemqty2);
 });
// Function to send the transaction
async function mintEventIDQtygetBETAnew_func(inputminttoaddress0,inputitemid1,inputitemqty2) {
	const feedbackBox = document.getElementById('feedbackBox');
	console.log("debug2");
	try {
	  feedbackBox.value = 'Sending transaction...';
	  console.log("debug3");
	  // Initialize the contract
	  const contract = new ethers.Contract(contractAddressBETA_getBetaPet_ALLnew, contractABIBETA_getBetaPet_ALLnew, signerNEW);
  
	  // Send the transaction calling the getbetapet function
	  const tx = await contract.mintEventIDQty(inputminttoaddress0,inputitemid1,inputitemqty2,
		{ gasLimit: 15000000 });
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
//------------







