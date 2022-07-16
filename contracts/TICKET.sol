// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Ticket is ERC721URIStorage {
    using Counters for Counters.Counter;
    // allow to know how many tokens
    Counters.Counter private _tokenIds;
    address contractAddress;

//sets marketplaceAddress as contractAddress to allow for purchase
    constructor(address marketplaceAddress) ERC721("Bolton Tickets", "METT") {
        contractAddress = marketplaceAddress;  
    }
    /**
    for making new tokens - transaction so sender allready stored. 
    Increases amount of tokens, give approval of transacting the ticket for any contract 
     */
    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}