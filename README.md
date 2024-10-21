![banner](https://res.cloudinary.com/dwz5lx2k7/image/upload/v1729495085/tutorials/Screenshot_2024-10-21_at_9.17.07_AM_nmdryk.webp)

## JokeDapp: A Decentralized Joke Contest Dapp

### Introduction

JokeDapp is a decentralized application where users can participate in joke contests by answering multiple-choice questions. To participate, users pay a fee in Ether, and if they answer correctly, they win rewards that can be claimed directly within the app. The platform allows for a fun, interactive experience, leveraging smart contracts deployed on the Ethereum blockchain. This project showcases my skills in full-stack blockchain development, including smart contract design, frontend integration, and the use of Next.js with Web3 tools like wagmi, viem, and React Query.

### 🚀 Features

- Decentralized Joke Contests: Users answer joke questions and win rewards.
- Wallet Integration: Seamlessly connect your Ethereum wallet using MetaMask.
- Reward Claiming: Users can claim their rewards directly on the platform.
- Admin Controls: The owner can withdraw collected fees.
- Smart Contracts: Deployed on Ethereum's Sepolia testnet, ensuring trust and security.
- Real-time Updates: Dynamic updates on the number of participants, contest results, and more.

### 💻 Tech Stack

- Next.js (App Router)
- wagmi & viem for Web3 integration
- Tanstack React Query for data fetching and caching
- Solidity for writing smart contracts
- Foundry for testing and deployment
- Makefile and .env for streamlined environment management and build processes

### 📦 Installation & Setup

To set up the project locally, follow these steps:

1. Clone the repo:

```bash
git clone https://github.com/kilamaelie/jokes-dapp.git
cd jokes-dapp
```

2. Install dependencies:xw

```bash
cd client
yarn dev
```

3. Set up the environment:

- Create a .env.local file in the root directory and populate it with the following variables for client :

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 # for example
```

- Create a .env file in the root directory and populate it with the following variables for contract:

```bash
RPC_URL_LOCAL=http://127.0.0.1:8545
SEPOLIA_RPC_URL=https//_____  # add yours
SEPOLIA_PRIVATE_KEY=
LOCAL_PRIVATE_KEY==
```

4. Makefile for Build Automation:

- This project uses a Makefile to simplify various development tasks like compiling smart contracts, running tests, and more. You can use commands like:

```bash

make compile  # Compile the smart contracts
make test     # Run smart contract tests
make deploy-test # Deploy the contracts to the blockchain locally
make deploy-t # Deploy the contracts to the blockchain locally
make deploy-sepolia # Deploy the contracts to the blockchain remotely

```

5. Run the app:

```bash
yarn dev

```

6. Compile and deploy the contracts (if needed):

```bash
forge build
make deploy-sepolia
```

### 🛠 Architecture

Frontend: Built with Next.js, wagmi, and viem to provide a smooth Web3 experience.
Smart Contracts: Written in Solidity and deployed on the Ethereum Sepolia testnet.
Data Fetching: React Query is used to efficiently fetch and cache contract data.
Environment Variables: Managed through a .env file for secure configuration.

### 🔧 Makefile Commands

A Makefile has been provided to streamline common operations. Here are the available commands:

- make compile: Compiles the Solidity contracts using Foundry.
- make test: Runs the smart contract tests.
- make deploy-test: Deploys the smart contracts to the Sepolia testnet.
- make clean: Cleans the build artifacts.

### 🚀 Future Features (Next Up)

coming soon

### 🤝 Contributing

We welcome contributions from other developers! If you're interested in adding features, fixing bugs, or improving the overall experience, follow these steps:

Fork the repo.

- Create your feature branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.
  Feel free to reach out if you have any questions or want to discuss new features!

### 📄 License

This project is licensed under the MIT License, meaning you are free to use, modify, and distribute the code as you see fit. Any contributions made to this project will also be licensed under the same terms.

### 🌍 Let's Connect

If you enjoyed working on this project or have ideas for improvements, feel free to connect with me:

Twitter: [![Twitter Badge](https://img.shields.io/badge/-@kilamaelie-1ca0f1?style=flat&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/kilamaelie)](https://twitter.com/kilamaelie)
LinkedIn: [![Linkedin Badge](https://img.shields.io/badge/-kilamaelie-0e76a8?style=flat&labelColor=0e76a8&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kilamaelie/)

###### If you find the content interesting and useful, feel free to use the "Buy me a coffee" link below to support me and buy me a coffee.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kilamaelie)
