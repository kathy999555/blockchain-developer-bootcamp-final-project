In Smart Contracts the design patterns used are:
1. Inheritance and Interfaces: TICKETMarket.sol uses ReentrancyGuard for inter-contract execution and which ReentrancyGuard helps with security.
TICKET.sol uses ERC721URIStorage which allows for many functions to be called like setApprovalForAll and _mint.
TICKETMarket.sol uses ReentrancyGuard which prevents multiple transactions - a security control. 
2. Inter-Contract Execution: TICKET.sol contract calls external functions from the OpenZeppelin contracts.
