// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // prevents multiple transactions - security control

contract TICKETMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    // counter for each ticket and each sold ticket
    Counters.Counter private _itemIds;
    // need to know for tickets created page
    Counters.Counter private _itemsSold;

    // determine owner of contract
    address payable owner;
    // charge listing fee - owner get return on each ticket sold again
    uint256 listingPrice = 0.00050 ether; 

    // making owner of contract the sender - deployer
    constructor() {
        owner = payable(msg.sender);
    }
    // holds all values of each ticket
    struct MarketItem {
        uint256 itemId;
        address ticketContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    // ticket id mapped so can fetch each ticket with id
    mapping(uint256 => MarketItem) private idToMarketItem;
    // when ticket created 
    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed ticketContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    // return listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
    /* create market item (ticket), get price (whoever makes ticket determines price) from getListingPrice function 
    and make sure more than 0.
    increase number of tickets made
    transaction between seller and buyer
    */
    function createMarketItem(
        address ticketContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        // nonReentrant - to prevent rentry attack
        require(price > 0, "Price must be more than 0");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        // create marketItem and map it 
        idToMarketItem[itemId] = MarketItem(
            itemId,
            ticketContract,
            tokenId,
            payable(msg.sender),
            // seller = 0 as no one owns right now
            payable(address(0)),
            price,
            // false as not owned yet
            false
        );
        // give creator ownership of ticket to contract
        IERC721(ticketContract).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        emit MarketItemCreated(
            itemId,
            ticketContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /* creating a market sale - price already known. Get reference to price and tokenid - use mapping 
    Transfer value of transaction to seller. Transfer ownership from contract address to buyer.
    */
    function createMarketSale(address ticketContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(ticketContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        //Get listing price sent to creator.
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        // unsold tickets created = items created - items sold
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;
        // create array to give market items that are unsold.
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        // loop over items unsold - make sure unsold if address = 0 - no owner
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    } 

    // Returns only items that a user has purchased 
    function fetchMyTICKETS() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        // loop over all items and if item = sender address then know which tickets belong to individual
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        // array - mapping over total item count
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //Returns only items a user has created
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        // seller instead of owner
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
