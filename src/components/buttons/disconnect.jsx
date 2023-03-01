import { useDisconnect } from 'wagmi'


function DisconnectBtn() {
  const { disconnect } = useDisconnect()
 
  return <button className='disconnect--btn' onClick={() => disconnect()}>Disconnect</button>
}

export default DisconnectBtn;