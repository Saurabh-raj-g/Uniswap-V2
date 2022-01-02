//import React, { Component } from 'react';
import React, {useState, Component  } from 'react';
import '../css/header.css';
import getWeb3 from "../getWeb3";
import Web3 from "web3";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Card,  CardHeader,NavbarBrand } from 'C:/Users/vivek/node_modules/reactstrap';
import Footer from './FooterComponent';

import { useWeb3React } from "@web3-react/core"


import { ethers , BigNumber} from 'ethers';
import { MaxUint256 } from '@ethersproject/constants';

const Header = ({account , web3Status ,loadWeb3 ,LoadBlockchaindata}) =>{
	/*
	constructor(props){
		super(props);
		this.state = {  
			web33: null, 
			accounts: null, 
			userBalance: null 
		};
       this.connectWalletHandler = this.connectWalletHandler.bind(this);
	   this.access = this.access.bind(this);
	}
	
	 access(){
		if (typeof window.ethereum !== 'undefined') {
			// Instance web3 with the provided information
			const web3 = new Web3(window.ethereum);
			
		  try {
			// Request account access
			 window.ethereum.enable();
			return true
		  } catch(e) {
			// User denied access
			return false
		  }
		}
	 }

	 connectWalletHandler =  () => {
	  if(typeof window.ethereum !== 'undefined'){
		try {
			// Get network provider and web3 instance.
			
			window.ethereum.enable();
			const web3 = new Web3(window.ethereum);
			// Use web3 to get the user's accounts.
			
			var accounts1 =  web3.eth.getAccounts();
			
			//const userBalance =  web3.eth.getBalance(accounts[0]);
			//userBalance = web3.toDecimal(userBalance);
	  
			// Get the contract instance.
			// const networkId = await web3.eth.net.getId();
			// const deployedNetwork = SolidityDriveContract.networks[networkId];
			// const instance = new web3.eth.Contract(
			//   SolidityDriveContract.abi,
			//   deployedNetwork && deployedNetwork.address
			// );
	  
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ 
				web33: web3, 
				accounts : accounts1
			});
			//alert(this.accounts[0]);
			console.log(this.accounts);
			// web3.currentProvider.publicConfigStore.on('update', async () => {
			//   const changedAccounts =  web3.eth.getAccounts();
			// //   const changedbalance =  web3.eth.getBalance(changedAccounts[0]);
			// //   changedbalance = web3.toDecimal(changedbalance);
			//   this.setState({
			// 	  accounts: changedAccounts,
			// 	  //userBalance : changedbalance,
			// 	});
			  
			//})
		  } catch (error) {
			// Catch any errors for any of the above operations.
			alert(
			  `Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		  }

	  }
	};
    */

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount , setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	
	
   
	const connected =  () =>{
		return window.ethereum.isConnected();
	}
   
		const connectWalletHandler =  () => {
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
		//let cc = newAccount.substring(0,5) + newAccount.substring(newAccount.length()-4,newAccount.length()-1);
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
  
   // render(){  
        return(
            <div className="header ">
               <div className='header-item'>
			   <NavbarBrand href="/swap"><img className="nav-logo"  src="/logo192.png" style ={{width: 24, height: 24}} alt="logo"/></NavbarBrand>
                    <span className ="d-none d-md-block">< Footer /></span>
                   <div className='header-span-item'>
                     <Card style={{borderRadius:24}}>
                       <CardHeader style={{backgroundColor: "yellow",borderRadius:24 }}>
                         <img src="/logo192.png" style ={{width: 24, height: 21}} alt="pic"/>
                         <span>Ethereum</span>
                       </CardHeader>
                     </Card>
                        { !web3Status  ? 
                        <button type = "button"className=" connect-wallet01 connect-wallet02 connect-wallet03 my-2 my-sm-0" onClick={loadWeb3 } onClick={LoadBlockchaindata}>
                          Connect Wallet
                         </button>
                         :
						 <div  className = "connect-wallet01 connect-wallet02 connect-wallet03">
							  
						      <span className ="text-right">{account}</span>
						 </div>
						}
						
                      <button type="button"  class="btn  icon icon1" >
                        <span > {<MoreHorizIcon/>}</span>
                      </button>
					  
                   </div>
                </div>
            </div>

        );
   //} // render end
}

export default Header;
