Blockchain Final Project Idea:
Making going to an amusement park much more exclusive. Based on the concept of NFT’s it will create a more unique experience. It will allow the owner entry into the park for a year and will offer a fast pass, a private lounge with a restaurant and bar so buyers won’t have to wait for service or wait in line for a restaurant - depending on who selling ticket provides in discription. (depend where doing ie Disney could be really magical…). It would also allow buyers to stay past closing hours so they can experience going on the rides exclusively without anyone else which would add to the exclusivity and be a memorable experience. There would be limited amount. Only park managers could sell them but if someone buys one then can re-sell. To get into the park there would have to be a show of the NFT and ownership (use metamask – prove with wallet of public key) and at the front the owner would receive a wristband (based on fast track braclets from disney) which would allow them the perks described on thie ticket (employees will be notified of special perks when arrive due to managers selling tickets and setting up facilities). Scan the barcode given on the ticket and verify that the ticket ownership is indeed theirs.  

Directory Structure:
contracts: Smart contracts contain TICKET.sol and TICKETMarket.sol
pages: contains pages of the website
scripts: know where deployed to: get ticket address and ticketmarket address
styles: give access to css styles
test: contains test.js for the 5 unit tests


Installing Dependencies instructions:
To run in a local envrionment the following dependencies will need to be downloaded:

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
cd blockchian-developer-bootcamp-final-project
Create a file called .secret There add in your private key for any metamask account. It doesn't matter if there is nothing on it. 
In terminal run: npx hardhat test (if want to test)
Then run: npx hardhat node
In another terminal run: npx hardhat run scripts/deploy.js --network localhost
The terminal should show 2 addresses: ticketMarket contract deployed to 'address given' and ticket contract deployed to 'address give'. Copy these addresses and paste then im the config.js file in given spots. 
Then put private key in the secret document.
Then in terminal run: npm run dev
Get website (http://localhost:3000) given and put in a browser - test ethers are given in terminal with hardhat node

Deploy Contracts to Mumbai Test Network:
Add the Mumbai network to your metamask account: 
Network Name: Mumbai
Network URL: https://matic-mumbai.chainstacklabs.com
Chain ID: 8001

Under pages, in index.js add "https://polygon-mumbai.infura.io/v3/2eaabcdf283441e6a7de5afb872cf1af" into the JsonRpcProvider function on line 25
After run nxp hardhat run scripts/deploy.js --network mumbai
Then change the ticketaddress and ticketmarketaddress in the config.js file. 
Then run: npm run dev
Get webstie given (http://localhost:3000) and put in a browser - if want test matic can get from: https://faucet.polygon.technology/

Screencast:
https://www.loom.com/share/239bd5de68584507b46057861e4db0b8
In the example photo given there is a room for a barcode to be put on the ticket as an example for the park managers to put on. 

Front-end URL on github pages:
https://kathy999555.github.io/blockchain-developer-bootcamp-final-project/


Possible Improvements:
- could make sell tickets private so only park can sell these exclusive tickets
- make photo optional as technically don't need barcode but could make entrace easier
- add qr code to be scanned at ticket booth at park
- add more information about the park and logo
