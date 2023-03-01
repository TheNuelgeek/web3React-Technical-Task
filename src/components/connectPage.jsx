import React from "react";
import { Web3Button } from "@web3modal/react";
import {useAccount} from 'wagmi'
import DashboardPage from "./dashboard/Dashboard";

function ConnectPage(){
    const {isConnected} = useAccount();

    // React.useEffect(() => {

    // }, [isConnected])
    
    return(
        <div className="hero--page">
            { !isConnected? (
            <div> 
                <h1 className="hero--text">Web3 Task</h1>
                <Web3Button />
                <p>Connect wallet to view your dashboard</p>
            </div>
            ):(
                <DashboardPage/>
            )}
            
        </div>
    )
}

export default ConnectPage;