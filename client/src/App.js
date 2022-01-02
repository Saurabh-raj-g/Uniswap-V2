import React, { useState, useEffect } from "react";
import Web3 from "web3";
import './css/App.css';

import 'D:/Bootstrap4/conFusion/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './components/MainComponent';
import { } from 'C:/Users/vivek/node_modules/react-router-dom';
import {  BrowserRouter as Router,Switch, Route, Redirect  } from 'C:/Users/vivek/node_modules/react-router-dom';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
//import WalletCard from "./components/WalletComponent";
import PoolPage from './components/PoolComponent';
import VotePage from './components/VoteComponent';

import TokenAabi from './contracts/TokenA.json'; 
import TokenBabi from './contracts/TokenB.json'; 
import Liquidityabi from './contracts/Liquidity.json'; 
import Swapabi from './contracts/Swap.json'; 

const App = () => {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);
  const [Currentaccount, setCurrentaccount] = useState("");
  const [isCurrentaccount, setIsCurrentaccount] = useState(false);

  const [tokenAContract, setTokenAContract] = useState();
  const [tokenBContract, setTokenBContract] = useState();
  const [liquidityContract, setLiquidityContract] = useState();
  const [swapContract, setSwapContract] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const LoadBlockchaindata = async () => {
    
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    setIsCurrentaccount(true);
    const networkId = await web3.eth.net.getId();

    const TokenAData = TokenAabi.networks[networkId];
    const TokenBData = TokenBabi.networks[networkId];
    const LiquidityData = Liquidityabi.networks[networkId];
    const SwapData = Swapabi.networks[networkId];

    if (TokenAData && TokenBData && LiquidityData && SwapData) {
      const TokenAContract1 = new web3.eth.Contract(
        TokenAabi.abi,
        TokenAData.address
      );
      const TokenBContract1 = new web3.eth.Contract(
        TokenBabi.abi,
        TokenBData.address
      );
      const LiquidityContract1 = new web3.eth.Contract(
        Liquidityabi.abi,
        LiquidityData.address
      );
      const SwapContract1 = new web3.eth.Contract(
        Swapabi.abi,
        SwapData.address
      );
     
      setTokenAContract(TokenAContract1);
      setTokenBContract(TokenBContract1);
      setLiquidityContract(LiquidityContract1);
      setSwapContract(SwapContract1);
    } else {
      window.alert("the smart contract is not deployed current network");
    }
  };
  const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', LoadBlockchaindata);

	window.ethereum.on('chainChanged', chainChangedHandler);
  //render() { 
    return (
      
      <Router>
      
      <Header account = {Currentaccount} web3Status = {isCurrentaccount}
               loadWeb3 = {loadWeb3} LoadBlockchaindata ={LoadBlockchaindata} />
      
      <Switch >
                <Route  path='/swap' exact component={()=><Main account = {Currentaccount} web3Status = {isCurrentaccount} 
                                                      tokenAContract ={tokenAContract} tokenBContract = {tokenBContract}
                                                      swapContract = {swapContract} />} />
                <Route  path='/pool' exact component={()=><PoolPage account = {Currentaccount} web3Status = {isCurrentaccount} 
                                                      tokenAContract ={tokenAContract} tokenBContract = {tokenBContract}
                                                      swapContract = {swapContract} 
                                                       liquidityContract ={liquidityContract}/>} />
                <Route  path='/vote' exact component={VotePage} />
                
                <Redirect exact to="/swap"/>
             
       </Switch>
        
       <div style={{display:"flex", marginTop:200,  }}className="d-block d-md-none col offset-md-2">
         <div style={{display:"flex", marginBottom:0,  }}>
            <Footer />
         </div>
         
        </div>
      </Router>
       
    );
 // }
 
}

export default App;
