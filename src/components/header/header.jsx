import React from "react";
import {useAccount, useBalance} from 'wagmi'
import DisconnectBtn from "../buttons/disconnect";

/**
 *  This Header componet returns all deatils about a connected user wallet
 */
function Header(){
    const { address} = useAccount()
    const { data} = useBalance({ address: address})
  
    const balance = parseFloat(data?.formatted).toFixed(4)
    const first4 = address.substring(0, 4);
    const last4 = address.substring(address.length - 4)

    return(
        <header>
            <div className="wallet--details">
                <p className="user">Wallet Address: {first4}....{last4}</p>
                <p className="user">Bal: {balance} {data?.symbol}</p>
                <DisconnectBtn />
            </div> 
        </header>
    )
}

export default Header;