import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    ticketmarketaddress, ticketaddress
} from '../config'

import TICKET from '../utils/Ticket.json'
import TICKETMarket from '../utils/TICKETMarket.json'

export default function CreatorDashboard() {
    const [tickets, setTickets] = useState([])
    const [sold, setSold] = useState([])

    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadTickets( )
    }, [])
    async function loadTickets() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const tokenContract = new ethers.Contract(ticketaddress, TICKET.abi, provider)
        const marketContract = new ethers.Contract(ticketmarketaddress, TICKETMarket.abi, signer)
        const data = await marketContract.fetchItemsCreated()
    
        const items = await Promise.all(data.map(async i => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId)
          const meta = await axios.get(tokenUri)
          let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
          }
          return item
        }))
        const soldItems = items.filter(i => i.sold)
        setSold(soldItems)
        setTickets(items)
        setLoadingState('loaded')
    }
    return (
        <div>
            <div className="p-4">
                <h2 className="text-2xl py-2">Tickets Created</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        tickets.map((ticket, i) => (
                            <div key={i} className="border shadow rounded-xl overflow-hidden">
                                <img src={ticket.image} className="rounded"/>
                                <div className="p-4 bg-black">
                                    <p className="text-2xl font-bold text-white">{ticket.price} Eth</p>   
                                </div>
                            </div>
                        ))
                    }
                    </div>
            </div>
            <div className="px-4">
                {
                    Boolean(sold.length) && (
                        <div>
                            <h2 className="text-2xl py-2">Tickets Sold</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                            {
                                sold.map((ticket, i) => (
                                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                                        <img src={ticket.image} className="rounded"/>
                                        <div className="p-4 bg-black">
                                            <p className="text-2xl font-bold text-white">Price - {ticket.price} Eth</p>   
                                        </div>
                                    </div>
                                ))
                            } 
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}