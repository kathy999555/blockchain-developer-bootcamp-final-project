const hre = require("hardhat");


async function main() {
  
  const TICKETMarket = await hre.ethers.getContractFactory("TICKETMarket");
  const ticketMarket = await TICKETMarket.deploy();
  await ticketMarket.deployed();
  console.log("Ticket Market deployed to:", ticketMarket.address);

  const TICKET = await hre.ethers.getContractFactory("Ticket");
  const ticket = await TICKET.deploy(ticketMarket.address);
  await ticket.deployed();
  console.log("Ticket deployed to:", ticket.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });