import React, { useState } from 'react';
import   Brightness7Icon  from "@material-ui/icons/Brightness7";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Table, Modal, ModalHeader, ModalBody } from 'C:/Users/vivek/node_modules/reactstrap';
import '../css/main.css';
import Web3 from "web3";
import { ethers , BigNumber} from 'ethers';
import { MaxUint256 } from '@ethersproject/constants';

import TokenAContract from '../contracts/TokenA.json'; 
import TokenBContract from '../contracts/TokenB.json'; 
import LiquidityContract from '../contracts/Liquidity.json'; 
import SwapContract from '../contracts/Swap.json'; 

const PoolPage = ({account , web3Status ,tokenAContract ,tokenBContract, swapContract, liquidityContract}) => {
    const liquidityAddress = "0xC6Ab1f5431D8dE95bC956574Dc7CF43331fD2fE3" ; // 0xC6Ab1f5431D8dE95bC956574Dc7CF43331fD2fE3
    const swapAddress = "0xcc45f8D62B57d5032ce570c6c13760b81dF74ab0" ; // 0xcc45f8D62B57d5032ce570c6c13760b81dF74ab0
    const tokenAAddress = "0xb33EDD6448eC2F93d0728DB8223EDc8Bb3cF2E6c" ; //0xb33EDD6448eC2F93d0728DB8223EDc8Bb3cF2E6c
    const tokenBAddress = "0x2E2582e7aA28fa9374c2b32890C1CFF066f86028" ; //0x2E2582e7aA28fa9374c2b32890C1CFF066f86028

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


    const [token1Amount, settoken1Amount] = useState(1);
    const [token2Amount, settoken2Amount] = useState(1);
   
   
    const[ t1 ,st1] = useState();
    const[ t2 ,st2] = useState();
    const WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    //const [tokenBAmount, settokenBAmount] = useState();
   const valid = /^[+-]?\d*(?:[.,]\d*)?$/ ;

  const toggleModal1 = () =>{
    setIsModalOpen1(!isModalOpen1);
  }
  const toggleModal2 = () =>{
    setIsModalOpen2(!isModalOpen2);
  }

  //         ************                  ***************** *
  const overrides = {
    gasLimit: 9999999
  }
  
  function expandTo18Decimals(n) {
    return ethers.BigNumber.from(n).mul(ethers.getSignerBigNumber.from(10).pow(18))
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
   
  const gettoken1 = async () =>{
    
    if(isWeth1){
      st1(Weth1);
    }else if(isTokenA1){
      st1(TokenA1);
    }else if(isTokenB1){
      st1(TokenB1);
    }
    return t1;
  }
  const gettoken2 = async () =>{
    
    if(isWeth2){
      st2(Weth2);
    }else if(isTokenA2){
      st2(TokenA2);
    }else if(isTokenB2){
      st2(TokenB2);
    }
    return t2;
  }
  const gettoken1Amount = async (event) =>{
    
    if(valid.test(event.target.value)){
      settoken1Amount(event.target.value);
      await gettoken1();
      await gettoken2();
      // alert(t1);
      // const provider = new ethers.providers.Web3Provider(window.etherium);
      // const signer = provider.getSigner();
     // const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ea158dea03c6442e8ce868c081c97b88'));
    //  const web3js = new Web3(window.ethereum);
    //  const m = new web3js.eth.Contract(SwapContract.abi,swapAddress);
      //const swapContract = m.at(swapAddress);
      //const swapContract = new ethers.Contract(swapAddress, SwapContract.abi, signer)
  
   ///http://saka.docsio.net/67931962/i-have-an-error-when-reading-a-method-with-web3-call
    const tokenamountMin = await swapContract.methods.getAmountOutMin(
      tokenAAddress,
      tokenBAddress,
        token1Amount ).call();
      settoken2Amount(ethers.utils.formatEther(tokenamountMin));
    }

  }
  const gettoken2Amount = async (event) =>{
    
    if(valid.test(event.target.value)){
      settoken2Amount(event.target.value);
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //  // alert(signer);

    //   const swapContract = new ethers.Contract(swapAddress, SwapContract.abi, signer)
  
    await gettoken1();
    await gettoken2();
    //alert(t1);
    const tokenamountMin =  await swapContract.methods.getAmountOutMin(
              tokenAAddress,
              tokenBAddress,
              token2Amount ).call({from: account});
      settoken1Amount(ethers.utils.formatEther(tokenamountMin));
    }

  }
 
  

   const addliquidity = async () => {
    // const [account] =  window.ethereum.request({ method: 'eth_requestAccounts' })
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    // alert(signer);
    // const liquidityContract = new ethers.Contract(liquidityAddress, LiquidityContract.abi, signer)
    
    // var d = new Date()
 //Math.floor(d / 1000) + 60 * 10

   // const pairAddress = await factory.createPair.call(tk1.address, tk2.address)
   // const pair = await factory.createPair(tk1.address, tk2.address)
   // console.log( pair);
    // await tk1.approve(router.address, MaxUint256)
    // await tk2.approve(router.address, MaxUint256)
    await gettoken1();
    await gettoken2();

     await liquidityContract.methods.addLiquidity(
      tokenAAddress,
      tokenBAddress, 
      token1Amount,
      token2Amount,
      token1Amount,
      token2Amount,
      account,
      
    ).send({from: account, gas:300000});

    alert( ` liquidity has been added `);
    // const pair = await Pair.at(pairAddress);
    // const balance = await pair.balanceOf(admin); 
    // console.log(`balance LP: ${balance.toString()}`);
  }
  const removeliquidity = async () => {
    // const [account] =  window.ethereum.request({ method: 'eth_requestAccounts' })
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // alert(signer);
    
    // const liquidityContract = new ethers.Contract(liquidityAddress, LiquidityContract.abi, signer)
    await gettoken1();
    await gettoken2();
    await liquidityContract.methods.removeLiquidity(tokenAAddress,
                   tokenBAddress,
                   0,
                   0,
                   account).send({from: account, gas:300000});

  }
   

//         ************                  ***************** *
    return (
      
        <div>
          <div class="container">
             <div class="row">
                 <main class="col col-md-6 offset-md-3 card-full" >
                   <div className="swap-header1 swap-header2 swap-header3">
                     <h5>Add Liquidity</h5>
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
                                         placeholder="0.0" type="text"
                                        autoCorrect="off" minLength={1} maxLength={79} spellCheck="false"
                                        pattern="[+-]?\d+(?:[.,]\d+)?"
                                        onChange={gettoken1Amount}
                                        value={token1Amount}
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
                                        placeholder="0.0" type="text"
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
                        //  <button  className=" connect-wallet connect-wallet1 connect-wallet2 ">
                        //    Connect Wallet
     
                        //  </button>
                        <button  className=" connect-wallet connect-wallet1 connect-wallet2 disable">
                           Add Liquidity
                         </button>
                         : 
                         <button onClick= {addliquidity} className=" connect-wallet connect-wallet1 connect-wallet2 ">
                           Add Liquidity
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
    <tr onClick = {getTokenB2 } >
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
   
}
export default PoolPage;