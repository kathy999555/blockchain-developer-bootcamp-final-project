Blockchain Final Project Idea:
Making going to an amusement park much more exclusive. Based on the concept of NFT’s it will create a more unique experience depending on what the park owner is offering. For example it could allow the ticket owner entry into the park for a year, a fast pass, a private lounge with a restaurant and bar so buyers won’t have to wait for service or wait in line for a restaurant - depending on who selling ticket provides in description. Additional features would allow buyers to stay past park closing hours as one of the limited few who experience going on rides exclusively. There would be limited amount. Only park managers may sell these passes but if someone buys one then they can be sold via the Dapp. To enter the park the holder would need to show the NFT and ownership (use metamask – prove with wallet of public key) and at the entrance the owner would receive a wristband (based on fast track bracelets from Disney) which would allow them the perks described on the ticket. Park employees will need to be advised by managers of special perks on guest arrival. Scan the ticket barcode to verify that the ticket ownership is indeed theirs and not counterfeit.   

Directory Structure:
contracts: Smart contracts contain TICKET.sol and TICKETMarket.sol
pages: contains pages of the website
scripts: know where deployed to: get ticket address and ticketmarket address
styles: give access to css styles
test: contains test.js for the 5 unit tests


Installing Dependencies instructions:
To run in a local environment the following dependencies will need to be downloaded:

npm install npx
make sure have node.js
npm install yarn
yarn add ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios
tailwindcss: yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
Web3: 
- web3js: npm i -g web3
- ethers: npm i-g ethers
- Metamask: npm i @metamask/detect-provider
- Install metamask wallet in browser
.env file: npm i dotenv


Accessing or running project on local node instructions:
Clone project repository onto your local machine:
git clone https://github.com/kathy999555/blockchain-developer-bootcamp-final-project.git
cd blockchain-developer-bootcamp-final-project
Create a file called .secret There add in your private key for any metamask account. It doesn't matter if there is nothing in the account. 
In terminal run: npx hardhat test (if want to test)
Then run: npx hardhat node
In another terminal run: npx hardhat run scripts/deploy.js --network localhost
The terminal should show 2 addresses: ticketMarket contract deployed to 'address given' and ticket contract deployed to 'address give'. Copy these addresses and paste then in the config.js file in given spots. 
Then put private key in the secret document.
Then in terminal run: npm run dev
Get website (http://localhost:3000) given and put in a browser - test ethers are given in terminal with hardhat node

Deploy Contracts to Mumbai Test Network:
Add the Mumbai network to your metamask account: 
Network Name: Mumbai
Network URL: https://matic-mumbai.chainstacklabs.com
Chain ID: 8001

git clone https://github.com/kathy999555/blockchain-developer-bootcamp-final-project.git
cd blockchain-developer-bootcamp-final-project
Create a file called .secret There add in your private key for any metamask account. It doesn't matter if there is nothing in the account. 
In terminal run: npx hardhat test (if want to test)
Under pages, in index.tsx add "https://polygon-mumbai.infura.io/v3/2eaabcdf283441e6a7de5afb872cf1af" into the JsonRpcProvider function on line 31
Then run: npx hardhat node
In another terminal run: npx hardhat run scripts/deploy.js --network mumbai
The terminal should show 2 addresses: ticketMarket contract deployed to 'address given' and ticket contract deployed to 'address give'. Copy these addresses and paste then in the config.js file in given spots. 
Then put private key in the secret document.
Then in terminal run: npm run dev
Get website (http://localhost:3000) given and put in a browser -if want test matic can get from: https://faucet.polygon.technology/

Screencast:
https://www.loom.com/share/f6bdc8f18f934c12b863be51704b9d77
For park managers, in the example photo given there is a room for a barcode to be placed on the ticket.

Front-end URL on github pages:
https://blockchain-developer-bootcamp-final-project-inkpj9k7h.vercel.app


Possible Improvements:
- Could make sell tickets private so only park can sell these exclusive tickets
- Make photo optional as technically don't need barcode but could make park entrance easier
- Add QR code to be scanned at ticket booth at park
- Add more information about the park and logo
