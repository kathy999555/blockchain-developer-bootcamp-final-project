const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("TICKETMarket", function () {
  beforeEach(async () => {
    const Market = await ethers.getContractFactory("TICKETMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address 

    const TICKET = await ethers.getContractFactory("Ticket")
    const ticket = await TICKET.deploy(marketAddress)
    await ticket.deployed()
    const ticketContractAddress = ticket.address
  })

  it("Should create and execute market sales", async function () {
   const Market = await ethers.getContractFactory("TICKETMarket")
   const market = await Market.deploy()
   await market.deployed()
   const marketAddress = market.address 

   const TICKET = await ethers.getContractFactory("Ticket")
   const ticket = await TICKET.deploy(marketAddress)
   await ticket.deployed()
   const ticketContractAddress = ticket.address

   let listingPrice = await market.getListingPrice()
   listingPrice = listingPrice.toString()

   const auctionPrice = ethers.utils.parseUnits('100', 'ether') 

   await ticket.createToken("https://www.mytokenlocation.com")
   await ticket.createToken("https://www.mytokenlocation2.com")

   await market.createMarketItem(ticketContractAddress, 1, auctionPrice, { value: listingPrice })
   await market.createMarketItem(ticketContractAddress, 2, auctionPrice, { value: listingPrice })

   const [_, buyerAddress] = await ethers.getSigners()

   await market.connect(buyerAddress).createMarketSale(ticketContractAddress, 1, {value: auctionPrice})
   let items = await market.fetchMarketItems()
   items = await Promise.all(items.map(async i => {
    const tokenUri = await ticket.tokenURI(i.tokenId)
    let item = {
      price: i.price.toString(),
      tokenId: i.tokenId.toString(),
      seller: i.seller,
      owner: i.owner,
      tokenUri
    }
    return item  
   }))
   console.log('items:', items)

  })

  // test address for contract
  it('Should have an address', async function () {
    const Market = await ethers.getContractFactory("TICKETMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    const TICKET = await ethers.getContractFactory("Ticket")
    const ticket = await TICKET.deploy(marketAddress)
    await ticket.deployed()
    const ticketContractAddress = ticket.address

    assert.notEqual(ticketContractAddress, 0x0)
    assert.notEqual(ticketContractAddress, '')
    assert.notEqual(ticketContractAddress, null)
    assert.notEqual(ticketContractAddress, undefined)
  })

  it('Should deploy TICKETMarket contract', async function () {
    const Market = await ethers.getContractFactory('TICKETMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    expect(marketAddress).to.not.equal(0x0)
    expect(marketAddress).to.not.equal('')
    expect(marketAddress).to.not.equal(null)
    expect(marketAddress).to.not.equal(undefined)
  })
  it('Should deploy TICKET contract', async function () {
    const Market = await ethers.getContractFactory('TICKETMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address 

    const TICKET = await ethers.getContractFactory("Ticket")
    const ticket = await TICKET.deploy(marketAddress)
    await ticket.deployed()
    const ticketContractAddress = ticket.address

    expect(ticketContractAddress).to.not.equal(0x0)
    expect(ticketContractAddress).to.not.equal('')
    expect(ticketContractAddress).to.not.equal(null)
    expect(ticketContractAddress).to.not.equal(undefined)
  })
  
  it('Should fail if listing price is not above 0', async function () {
    const Market = await ethers.getContractFactory("TICKETMarket")
    const market = await Market.deploy()
    await market.deployed()
    
    let listingPrice = await market.getListingPrice()
    assert(listingPrice > 0, "Price must be greater than 0");
  })
  
});
