import React, { useState, useEffect } from "react";
import {useAccount, useBalance} from 'wagmi'
import DisconnectBtn from "../buttons/disconnect";

function DashboardPage() {
  const { address, isConnected, isDisconnected } = useAccount()
  const { data, isError, isLoading } = useBalance({ address: address})

  const bal = parseFloat(data?.formatted).toFixed(4)
  // useEffect(() => {

  // }, [address]);

  return (
    <header className="dashboard">
      <div>
        <h1>Dashboard</h1>
        <p>Wallet Address: {address}</p>
        <p>Balance: {bal} {data?.symbol}</p>
        <DisconnectBtn />
      </div> 
    </header>
  );
}

export default DashboardPage;
