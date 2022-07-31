import '../styles/globals.css'
import Link from 'next/link'
import {ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();
  // If a wallet is connected, show address, chainId and disconnect button
  if (address) {
    return (
      <div>
        Address: {address}
        <br />
        Chain ID: {network[0].data.chain && network[0].data.chain.id}
        <br />
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
  }
  // If no wallet is connected, show connect wallet options
  return (
    <div>
      <button onClick={() => connectWithCoinbaseWallet()} className="px-4 py-2 rounded-md bg-blue-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white">
        Connect Coinbase Wallet
      </button>
      <button onClick={() => connectWithMetamask()} className="px-4 py-2 rounded-md bg-orange-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white">Connect MetaMask</button>
      <button onClick={() => connectWithWalletConnect()} className="px-4 py-2 rounded-md bg-blue-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white">
        Connect WalletConnect
      </button>
    </div>
  );
};
function MyApp({ Component, pageProps }) {
  const desiredChainId = ChainId.Mumbai;
  
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
  <div align="center">
    
    <nav className="border-b p-6">
      <p className="text-5xl font-bold text-red-500">Bolton Towers</p>
      
      <div className="mt-5 center-text">
        <Link href="/">
          <a className="mr-6 font-bold text-yellow-500">
            Buy Tickets
          </a>
        </Link>

        <Link href="/my-assets">
          <a className="mr-6 text-yellow-500 ">
            My Tickets
          </a>
        </Link>

        <Link href="/create-item">
          <a className="mr-6 text-yellow-500">
            Sell Ticket
          </a>
        </Link>

        <Link href="/creator-dashboard">
          <a className="mr-6 text-yellow-500">
            Tickets Created 
          </a>
        </Link>
      
        <div>
      <ConnectWallet />
    </div>
        
        
        
      </div>
    </nav>
    <Component {...pageProps} />
    <p>This is a special website to allow for the purchase of exclusive tickets to the theme park Bolton Towers.
      Here, exclusive tickets can be bought to allow special perks to be obtained in the park according to the ticket. For example, one ticket may include a fast pass, access to a private lounge and extra time at the park.
      Read the descriptions carefully before purchase and enjoy the bonuses that each ticket brings. Scan the barcode on entry to receive these bonuses. 
    </p>
  </div>
    
  </ThirdwebProvider>
  )
  
}

export default MyApp
