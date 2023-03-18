import React from "react";
import { Web3Button } from "@web3modal/react";
import {useAccount} from 'wagmi'
import DashboardPage from "./dashboard/dashboard";
import cloudImg from './image/cloud.svg'

/*
    This is a React component named HomePage that displays a 
    hero section on the page with a title and a Web3Button. 
    The component checks if the user is connected to a wallet 
    and displays a message to connect the wallet if not. If the 
    user is connected, the component renders the DashboardPage. 
    The useAccount hook from the wagmi library is used to get 
    the isConnected and address values.
*/
function HomePage(){
    const {isConnected, address} = useAccount();

    return(
        <div className="hero--page">
            {address !== '' && !isConnected  ? (
            <div> 
                <h1 className="hero--text">Tao Kloud</h1>
                <Web3Button />
                <p className="hero--sl--text">Connect wallet to view your dashboard</p>
                <img src={cloudImg} alt="" className="alt-img"/>
                <p>Built By <a href="https://twitter.com/theNuelgeek" target="_blank" rel="noreferrer">Nuelgeek</a></p>
            </div>
            ):(
                <DashboardPage/>
            )}
            
        </div>
    )
}

export default HomePage;