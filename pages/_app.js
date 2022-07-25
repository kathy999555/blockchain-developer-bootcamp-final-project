import '../styles/globals.css'
import Link from 'next/link'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

const supportedChainIds = [1,137]; //137
const connectors = {
  injected: {}
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      
    
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
      
        
        
        
        
      </div>
    </nav>
    <Component {...pageProps} />
    <p>This is a special website to allow for the purchase of exclusive tickets to the theme park Bolton Towers.
      Here, exclusive tickets can be bought to allow special perks to be obtained in the park according to the ticket. For example, one ticket may include a fast pass, access to a private lounge and extra time at the park.
      Read the descriptions carefully before purchase and enjoy the bonuses that each ticket brings. Scan the barcode on entry to receive these bonuses. 
    </p>
  </div>
    </ThirdwebWeb3Provider>
    
  
  )
  
}

export default MyApp
