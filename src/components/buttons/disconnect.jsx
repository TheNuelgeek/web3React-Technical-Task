import { useDisconnect } from 'wagmi'
import { Link } from 'react-router-dom';

/**
 * This code exports a React component called 
 * DisconnectBtn, which renders a button to disconnect 
 * from a web3 provider using the useDisconnect hook from 
 * the "wagmi" library. Clicking the button triggers the 
 * disconnect function, and the component also includes a 
 * Link component from "react-router-dom" to redirect the 
 * user to a logout page.
 * 
 */
function DisconnectBtn() {
  const { disconnect } = useDisconnect()

  return <Link to={'/logout'}>
    <button className='disconnect--btn' onClick={() => disconnect()}>Disconnect</button>
  </Link>
}

export default DisconnectBtn;