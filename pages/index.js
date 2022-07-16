import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {
  ticketaddress, ticketmarketaddress
} from '../config'

import TICKET from '../artifacts/contracts/TICKET.sol/Ticket.json'
import TICKETMarket from '../artifacts/contracts/TICKETMarket.sol/TICKETMarket.json'

export default function Home() {
  const [tickets, setTickets] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadTICKETS()
  }, [])
  
  /**
   * It fetches the market items from the market contract, then fetches the token metadata from the
   * token contract, and then returns an array of objects with the token metadata and the market item
   * data
   */
  async function loadTICKETS() {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/2eaabcdf283441e6a7de5afb872cf1af")
    const tokenContract = new ethers.Contract(ticketaddress, TICKET.abi, provider)
    const marketContract = new ethers.Contract(ticketmarketaddress, TICKETMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setTickets(items)
    setLoadingState('loaded')
  }

  async function buyTicket(ticket) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ticketmarketaddress, TICKETMarket.abi, signer)
    const price = ethers.utils.parseUnits(ticket.price.toString(), 'ether')
    

    const transaction = await contract.createMarketSale(ticketaddress, ticket.tokenId, {
      value: price
    })
    await transaction.wait()
    loadTICKETS()

  }
  if (loadingState === 'loaded' && !tickets.length) return (
    <h1 className="px-20 py-10 text-3xl">No Tickets Available</h1>
  )

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              tickets.map((ticket, i) => (
                <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img src={ticket.image} />
                  <div className="p-4">
                    <p style={{ height: '64px' }} className="text-2xl font-semibold">{ticket.name}</p>
                    <div style={{ height: '70px', overflow: 'hidden' }}>
                      <p className="text-yellow-400">{ticket.description}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">{ticket.price} Eth</p>
                    <button className="w-full bg-yellow-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyTicket(ticket)}>Buy</button>
                  </div>
                </div>
              ))
              }

        </div>
      </div>
    </div>
  )
}

