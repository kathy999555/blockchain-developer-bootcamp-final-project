import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    ticketmarketaddress, ticketaddress
} from '../config'

import TICKET from '../utils/Ticket.json'
import TICKETMarket from '../utils/TICKETMarket.json'

export default function MyAssets() {
    const [tickets, setTickets] = useState([])
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
        const data = await marketContract.fetchMyTICKETS()
    
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
    if (loadingState === 'loaded' && !tickets.length) return (
        <h1 className="py-10 px-20 text-3xl">No Tickets Owned</h1>
    )
    return (
        <div className="flex justify-center">
            <div className="p-4">
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
        </div>
    )
}