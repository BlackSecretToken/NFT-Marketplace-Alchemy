# NFT Marketplace end to end


To set up the repository and run the marketplace locally, run the below
```bash
npm install
npm start
```
// Deploy Contract
npx hardhat run --network goerli scripts/deploy.js
// Verify Contract
npx hardhat verify --network goerli 0xa8a8f22EDb4b1C0D1679dAc529Aafb752849714b 
