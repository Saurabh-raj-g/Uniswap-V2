import React, { useState } from "react";
import   Brightness7Icon  from "@material-ui/icons/Brightness7";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Table, Modal, ModalHeader, ModalBody } from 'C:/Users/vivek/node_modules/reactstrap';
import '../css/main.css';
import SimpleStorageContract from "../contracts/SimpleStorage.json";


import { ethers , BigNumber} from 'ethers';
import { MaxUint256 } from '@ethersproject/constants';

// const serverUrl = "https://5pjvwj6tbqnd.usemoralis.com:2053/server"; //Server url from moralis.io
// const appId = "chYu9gSxPZuZBBS7kIrzDugwe771hbCHfIdaJoXL";

import TokenAContract from '../contracts/TokenA.json'; 
import TokenBContract from '../contracts/TokenB.json'; 

import SwapContract from '../contracts/Swap.json'; 


const Main = ({account , web3Status ,tokenAContract ,tokenBContract, swapContract}) =>{
 
    const swapAddress = 0xcc45f8D62B57d5032ce570c6c13760b81dF74ab0 ;
    const tokenAAddress =0xb33EDD6448eC2F93d0728DB8223EDc8Bb3cF2E6c ;
    const tokenBAddress = 0x2E2582e7aA28fa9374c2b32890C1CFF066f86028 ;

  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount , setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	
	

   
   const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [TokenA1, setTokenA1] = useState();
    const [TokenB1, setTokenB1] = useState();
    const [Weth1, setWeth1] = useState();

    const [isWeth1, setisWeth1] = useState(false);
    const [isTokenA1, setisTokenA1] = useState(false);
    const [isTokenB1, setisTokenB1] = useState(false);

    const [TokenA2, setTokenA2] = useState();
    const [TokenB2, setTokenB2] = useState();
    const [Weth2, setWeth2] = useState();

    const [isWeth2, setisWeth2] = useState(false);
    const [isTokenA2, setisTokenA2] = useState(false);
    const [isTokenB2, setisTokenB2] = useState(false);

   
    const [token1Amount, settoken1Amount] = useState();
    const [token2Amount, settoken2Amount] = useState();

    
    const[ t1 ,st1] = useState();
    const[ t2 ,st2] = useState();

  const valid = /^[+-]?\d*(?:[.,]\d*)?$/ ;
 
  const WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  const toggleModal1 = () =>{
    setIsModalOpen1(!isModalOpen1);
  }
  const toggleModal2 = () =>{
    setIsModalOpen2(!isModalOpen2);
  }
  

  const  getWeth1 = () => {
    setWeth1(WETH);
    setisWeth1(true);
    setTokenA1();
    setisTokenA1(false);
    setTokenB1();
    setisTokenB1(false);

    setIsModalOpen1(!isModalOpen1);
 }
   const  getTokenA1 = () => {
      setTokenA1(tokenAAddress);
      setisTokenA1(true);
      setWeth1();
      setisWeth1(false);
      setTokenB1();
      setisTokenB1(false);

      setIsModalOpen1(!isModalOpen1);
   }
   const  getTokenB1 = () => {
      setTokenB1(tokenBAddress);
      setisTokenB1(true);
      setWeth1();
      setisWeth1(false);
      setTokenA1();
      setisTokenA1(false);

      setIsModalOpen1(!isModalOpen1);
      
  }
  const  getWeth2 = () => {
    setWeth2(WETH);
    setisWeth2(true);
    setTokenA2();
    setisTokenA2(false);
    setTokenB2();
    setisTokenB2(false);

    setIsModalOpen2(!isModalOpen2);
 }
   const  getTokenA2 = () => {
    setTokenA2(tokenAAddress);
    setisTokenA2(true);
    setWeth2();
    setisWeth2(false);
    setTokenB2();
    setisTokenB2(false);

    setIsModalOpen2(!isModalOpen2);
   }
   const  getTokenB2 = () => {
    setTokenB2(tokenBAddress);
    setisTokenB2(true);
    setWeth2();
    setisWeth2(false);
    setTokenA2();
    setisTokenA2(false);

    setIsModalOpen2(!isModalOpen2);
  }
   
  function gettoken1(){
    
    if(isWeth1){
      st1(Weth1);
    }else if(isTokenA1){
      st1(TokenA1);
    }else if(isTokenB1){
      st1(TokenB1);
    }
    return t1;
  }
  function gettoken2(){
   
    if(isWeth2){
      st2(Weth2);
    }else if(isTokenA2){
      st2(TokenA2);
    }else if(isTokenB2){
      st2(TokenB2);
    }
    return t2;
  }


   function gettoken1Amount(event){
    
    if(valid.test(event.target.value)){
      settoken1Amount(event.target.value);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      // alert(signer);
      // const swapContract = new ethers.Contract(swapAddress, SwapContract.abi, signer)
  
  
      const tokenamountMin =  swapContract.methods.getAmountOutMin(
        tokenAAddress,
        tokenBAddress,
              token1Amount*(10**18) ).call({from: account});
      settoken2Amount(ethers.utils.formatEther(tokenamountMin));
    }

  }
  function gettoken2Amount(event){
    
    if(valid.test(event.target.value)){
      settoken2Amount(event.target.value);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      // alert(signer);
      // const swapContract = new ethers.Contract(swapAddress, SwapContract.abi, signer)
  
  
      const tokenamountMin =  swapContract.methods.getAmountOutMin(
        tokenAAddress,
        tokenBAddress,
              token2Amount*(10**18) ).call({from:account});
      settoken1Amount(ethers.utils.formatEther(tokenamountMin));
    }

  }

 
 
  
  const connected =  () =>{
      return window.ethereum.isConnected();
  }
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
				
			})
			.catch(error => {
				setErrorMessage(error.message);
                alert({errorMessage});
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
            alert({errorMessage});
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance).substring(0,5));
		})
		.catch(error => {
			setErrorMessage(error.message);
            alert({errorMessage});
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

//         ************                  ***************** *
   function swaping(){
    // const [account] =  window.ethereum.request({ method: 'eth_requestAccounts' })
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // alert(signer);
    
    // const swapContract = new ethers.Contract(swapAddress, SwapContract.abi, signer)
    
    swapContract.methods.swap(
      tokenAAddress,
      tokenBAddress, 
      token1Amount*(10**18),
      token2Amount*(10**18),
      account[0]
    ).send({from: account, gas:300000});
   }

//         ************                  ***************** *
  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );
     

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };
 
  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call({ from: accounts[0] }); 

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };
  

  //render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      
   <div>
     <div class="container">
        <div class="row">
            <main class="col col-md-6 offset-md-3 card-full" >
              <div className="swap-header1 swap-header2 swap-header3">
                <h5>Swap</h5>
                <button type="button"  class="btn btn-default" >
                <span > {<Brightness7Icon/>}</span>
                </button>
              </div>  
              <div className="swap-page1">
                <div className="swap-page2">
                  <div>
                  
                     <div className="swapbox">
                       <div className="swapbox1">
                         <div className="swapbox-input1">
                           <button onClick= {toggleModal1} className="token-select token-select1 token-select2 token-select3">
                             <span className="span-button">
                               <div  className="span-token-symb span-token-symb1 span-token-symb2">
                                 <img style ={{marginRight:"0.5rem",width: 24, height: 24,
                                         boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",boxSizing: "border-box",
                                           borderRadius: 24}}src="/logo192.png" alt="pic"/>
                                  { isWeth1 ?
                                         <span style={{margin: "0px 0.25rem",
                                               fontSize: 18}}>Weth</span>
                                          : 
                                            [
                                               isTokenA1 ?
                                                <span style={{margin: "0px 0.25rem",
                                                     fontSize: 18}}>EnjA</span>
                                                : [  isTokenB1 ?
                                                     <span style={{margin: "0px 0.25rem",
                                                        fontSize: 18}}>EnjB</span>
                                                      : 
                                                        <span style={{margin: "0px 0.25rem",
                                                          fontSize: 18}}>Select Token</span>
                                                  ] 
                                                    
                                                 
                                             
                                            ]
                                  }

                               </div>
                                <KeyboardArrowDownIcon style={{width:12,  
                                     margin: "0px 0.25rem 0px 0.35rem", height:"35%"}} />

                             </span>

                           </button>
                           <input className="swap-input1-1 swap-input1-2" 
                                   type="text" placeholder="0.0"
                                   autoCorrect="off" minLength={1} maxLength={79} spellCheck="false"
                                   pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={gettoken1Amount}
                                        value={token1Amount}/>
                          </div>
                          <div className="yu pe">
                             <div className="iI cC jL">
                               <span></span>
                               <div className="EIPBx">
                                 <div className="css-djrxae">

                                 </div>

                               </div>

                              </div>

                          </div>


                       </div>
                 

                     </div>
                     <div className="swap-bt">
                        <ArrowDownwardIcon style={{width:16, height:16, viewBox:"0 0 24 24",
                              strokeWidth:2, fill:"none",strokeLinecap:"round", strokeLinejoin:"round",
                               stroke:"#6E727D", overflow:"hidden"}} />

                     </div>
                     
                     <div className="swapbox">
                       <div className="swapbox1">
                         <div className="swapbox-input1">
                           <button onClick= {toggleModal2} className="token-select token-select1 token-select2 token-select3">
                             <span className="span-button">
                               <div   className="span-token-symb span-token-symb1 span-token-symb2">
                                 <img style ={{marginRight:"0.5rem",width: 24, height: 24,
                                         boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",boxSizing: "border-box",
                                           borderRadius: 24}}src="/logo192.png" alt="pic"/>
                                  { isWeth2 ?
                                         <span style={{margin: "0px 0.25rem",
                                               fontSize: 18}}>Weth</span>
                                          : 
                                            [
                                               isTokenA2 ?
                                                <span style={{margin: "0px 0.25rem",
                                                     fontSize: 18}}>EnjA</span>
                                                : [  isTokenB2 ?
                                                     <span style={{margin: "0px 0.25rem",
                                                        fontSize: 18}}>EnjB</span>
                                                      : 
                                                        <span style={{margin: "0px 0.25rem",
                                                          fontSize: 18}}>Select Token</span>
                                                  ] 
                                                    
                                                 
                                             
                                            ]
                                  }

                               </div>
                                <KeyboardArrowDownIcon style={{width:12,  
                                     margin: "0px 0.25rem 0px 0.35rem", height:"35%"}} />

                             </span>

                           </button>
                           <input className="swap-input1-1 swap-input1-2" 
                                    type="text" placeholder="0.0"
                                   autoCorrect="off" minLength={1} maxLength={79} spellCheck="false"
                                   pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={gettoken2Amount}
                                        value={token2Amount}
                                   />
                          </div>
                          <div className="yu pe">
                             <div className="iI cC jL">
                               <span></span>
                               <div className="EIPBx">
                                 <div className="css-djrxae">

                                 </div>

                               </div>

                              </div>

                          </div>


                       </div>
                 

                     </div>

                  
                   
                  </div>

                  <div>
                    { !web3Status  ?
                    // <button onClick= {connectWalletHandler} className=" connect-wallet connect-wallet1 connect-wallet2 ">
                    //   Connect Wallet

                    // </button>
                    <button  className=" connect-wallet connect-wallet1 connect-wallet2 disable">
                      Swap
                    </button>
                    : 
                    <button onClick = {swaping} className=" connect-wallet connect-wallet1 connect-wallet2 ">
                      Swap
                    </button>
                   } 
                  </div>
                  
                </div>
              </div>

            </main>
            <div style={{marginTop:"5rem"}}></div>
        </div>
    </div>
     
    <Modal isOpen={isModalOpen1} toggle={toggleModal1}>
           <ModalHeader toggle={toggleModal1}>
                <h4 ClassName = "modal-title">Select Token</h4>
                
           </ModalHeader>
           <ModalBody >
           <Table className='table-fixed' striped>
  
  <tbody >
    <tr onClick = {getWeth1}>
      <th scope="row">
        1
      </th>
      <td>
        Weth
      </td>
    </tr>
    <tr onClick = {getTokenA1 }r>
      <th scope="row">
        2
      </th>
      <td>
        EnjA
      </td>
    </tr>
    <tr onClick = {getTokenB1 }>
      <th scope="row">
        3
      </th>
      <td>
       EnjB
      </td>
    </tr>
  </tbody>
</Table>
           </ModalBody>
     
         </Modal>

         <Modal isOpen={isModalOpen2} toggle={toggleModal2}>
           <ModalHeader toggle={toggleModal2}>
                <h4 ClassName = "modal-title">Select Token</h4>
                
           </ModalHeader>
           <ModalBody >
           <Table className='table-fixed' striped>
  
  <tbody >
    <tr onClick = {getWeth2}>
      <th scope="row">
        1
      </th>
      <td>
        Weth
      </td>
    </tr>
    <tr onClick = {getTokenA2 }r>
      <th scope="row">
        2
      </th>
      <td>
        EnjA
      </td>
    </tr>
    <tr onClick = {getTokenB2 }>
      <th scope="row">
        3
      </th>
      <td>
        EnjB
      </td>
    </tr>
  </tbody>
</Table>
           </ModalBody>
     
         </Modal>
   
  </div>
      
      
    );
 // }
}



export  default Main;


/*
 const serverUrl = "https://edrq8aj6uilj.grandmoralis.com:2053/server"; //Server url from moralis.io
const appId = "VHVdtVWLxbMAIqyD6ycfbFAk9cV1yhVw7U2RkKM6"; // Application id from moralis.io

let currentTrade = {};
let currentSelectSide;
let tokens;

async function init() {
  await Moralis.start({ serverUrl, appId });
  await Moralis.enableWeb3();
  await listAvailableTokens();
  currentUser = Moralis.User.current();
  if (currentUser) {
    document.getElementById("swap_button").disabled = false;
  }
}

async function listAvailableTokens() {
  const result = await Moralis.Plugins.oneInch.getSupportedTokens({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
  });
  tokens = result.tokens;
  let parent = document.getElementById("token_list");
  for (const address in tokens) {
    let token = tokens[address];
    let div = document.createElement("div");
    div.setAttribute("data-address", address);
    div.className = "token_row";
    let html = `
        <img class="token_list_img" src="${token.logoURI}">
        <span class="token_list_text">${token.symbol}</span>
        `;
    div.innerHTML = html;
    div.onclick = () => {
      selectToken(address);
    };
    parent.appendChild(div);
  }
}

function selectToken(address) {
  closeModal();
  console.log(tokens);
  currentTrade[currentSelectSide] = tokens[address];
  console.log(currentTrade);
  renderInterface();
  getQuote();
}

function renderInterface() {
  if (currentTrade.from) {
    document.getElementById("from_token_img").src = currentTrade.from.logoURI;
    document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
  }
  if (currentTrade.to) {
    document.getElementById("to_token_img").src = currentTrade.to.logoURI;
    document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
  }
}

async function login() {
  try {
    currentUser = Moralis.User.current();
    if (!currentUser) {
      currentUser = await Moralis.authenticate();
    }
    document.getElementById("swap_button").disabled = false;
  } catch (error) {
    console.log(error);
  }
}


async function getQuote() {
  if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;

  let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);

  const quote = await Moralis.Plugins.oneInch.quote({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
    fromTokenAddress: currentTrade.from.address, // The token you want to swap
    toTokenAddress: currentTrade.to.address, // The token you want to receive
    amount: amount,
  });
  console.log(quote);
  document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
  document.getElementById("to_amount").value = quote.toTokenAmount / 10 ** quote.toToken.decimals;
}

async function trySwap() {
  let address = Moralis.User.current().get("ethAddress");
  let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);
  if (currentTrade.from.symbol !== "ETH") {
    const allowance = await Moralis.Plugins.oneInch.hasAllowance({
      chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: currentTrade.from.address, // The token you want to swap
      fromAddress: address, // Your wallet address
      amount: amount,
    });
    console.log(allowance);
    if (!allowance) {
      await Moralis.Plugins.oneInch.approve({
        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        tokenAddress: currentTrade.from.address, // The token you want to swap
        fromAddress: address, // Your wallet address
      });
    }
  }
  try {
    let receipt = await doSwap(address, amount);
    alert("Swap Complete");
  } catch (error) {
    console.log(error);
  }
}

function doSwap(userAddress, amount) {
  return Moralis.Plugins.oneInch.swap({
    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
    fromTokenAddress: currentTrade.from.address, // The token you want to swap
    toTokenAddress: currentTrade.to.address, // The token you want to receive
    amount: amount,
    fromAddress: userAddress, // Your wallet address
    slippage: 1,
  });
}

init();

document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = () => {
  openModal("from");
};
document.getElementById("to_token_select").onclick = () => {
  openModal("to");
};
document.getElementById("login_button").onclick = login;
document.getElementById("from_amount").onblur = getQuote;
document.getElementById("swap_button").onclick = trySwap;

  ......from app.js earlier.........

import React, { Component } from "react";
import 'D:/Bootstrap4/conFusion/node_modules/bootstrap/dist/css/bootstrap.min.css';


import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call({ from: accounts[0] }); 

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

class App extends Component { 

  render() {
    return (
      
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      
    );
  }
}

export default App;


*/