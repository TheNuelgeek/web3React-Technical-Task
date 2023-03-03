import React from "react";
import HomePage from "./components/HomePage";import DashboardPage from "./components/dashboard/dashboard";
import UploadPage from "./components/uploadPage/UploadPage";
import LogoutPage from "./components/logout/LogoutPage";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { Routes, Route} from 'react-router-dom';

/**
 * The code imports various components and libraries, including EthereumClient, 
 * Web3Modal, and various chains. It defines a function component called App 
 * that creates instances of the Wagmi client and the Web3Modal Ethereum client. T
 * he component returns JSX code that renders v  arious routes for different pages and 
 * a Web3Modal component for connecting to a wallet.
 * 
 */


function App() {

  const chains = [goerli, mainnet, polygon, polygonMumbai ];
  const projectId = '47191616a07b6b399421f122d6f9cbf1'


  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider( {projectId} ),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId,
      version: "2", // or "2"
      appName: "web3Task",
      chains,
    }),
    provider,
  });
    
  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);  

  return ( 
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/uploadPage" element={<UploadPage />} />
        <Route exact path="/logout" element={<LogoutPage />} />
        </Routes>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        />
    </div>
      
  );
}

export default App;
