import React from "react";

/**
 *  This is a functional component called LogoutPage that 
 *  renders a simple message and a link to the login page.
 * 
 *  It also includes a function called clearWagmiCache that 
 *  removes the 'wagmi.cache' item from local storage. 
 *  This function is called when the user clicks on the link
 *  to go back to the login page.
 * 
 */

function LogoutPage(){
    
    function clearWagmiCache(){
        localStorage.removeItem('wagmi.cache')
    }

    return(
        <div className="logout--pg">
            <p>You are successfully <br/> logged out from your wallet
            session </p>
            <a className="logout--btn" href="/" onClick={() => clearWagmiCache()}> Login page</a>
        </div>
    )
}

export default LogoutPage;