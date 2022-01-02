import React, { Component } from 'react';
import { Card,  CardHeader,NavItem, } from 'C:/Users/vivek/node_modules/reactstrap';
import { Link } from 'C:/Users/vivek/node_modules/react-router-dom';
import CallMadeIcon from '@material-ui/icons/CallMade';
class Footer extends Component {
    render(){
        return(
            <div  style={{display:"flex",height:50, backgroundColor: "yellow",borderRadius: 20,
                 zIndex:3, boxShadow:"rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px"
                 ,verticalAlign:"middle",width: "fit-content",justifyContent: "center",
                 }}>
              <div  style={{display:"flex",width: "auto",  justifyContent: "space-between", 
                  paddingBottom: 2,}} >
              <NavItem style= {{marginLeft: 8}} >
                 <Link to='/swap' className="nav-link"  > Swap</Link>
              </NavItem>
              <NavItem style= {{marginLeft: 8}}>
                  <Link to='/pool' className="nav-link" > Pool</Link>
              </NavItem>
              <NavItem style= {{marginLeft: 8}}>
                 <Link to='/vote' className="nav-link"  > Vote</Link>
              </NavItem>
              <NavItem style= {{marginLeft: 8}}>
                <Link  to='https://info.uniswap.org/#/' target="_blank"  >
                     Chart <span  ><CallMadeIcon/></span></Link>
              </NavItem>
              </div>
            </div>

        );
    }
}
export default Footer;