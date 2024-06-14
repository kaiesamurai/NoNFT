# NoNFT - From Text to Virtual Worlds


## Concept

NoNFT is a decentralized studio where people can collaboratively develop 3D characters and environments. It aims to democratize the creation of digital assets by allowing anyone, regardless of artistic skills, to start with text descriptions. Artists can then build upon these descriptions by adding drawings, 3D models, skeletons, animation loops, and more, resulting in a rich, collaborative NFT creation process.

## Features

### Current Release

- Interface for minting different types of assets (text, image, and 3D)
- Supports `.png`, `.jpg`, `.gif`, and `.glb` formats
- All content is stored in IPFS (InterPlanetary File System) using [Pinata](https://www.pinata.cloud/)
- Mint NFTs based on others
- Query parent and child NFTs in a modal window (explore section)
- Exchange CONST to CW20 tokens with a sliding window
- Sell and buy NFTs for CW20 tokens
- Mint NFT collections

### In Progress

- Mint project file tokens (Blender, Maya, zBrush, etc.)
- Draw pictures directly in the browser
- Integrate CW721 with on-chain metadata and royalty
- Visualize a tree of NFTs based on each other
- Live bridge for streaming 3D content into compiled game engines (cross-platform)


## Development & Requirements

### Smart Contracts

Most smart contracts used in NoNFT are in this [repository](https://github.com/wotori-studio/NFText-CosmWasm). This dApp is built with the following CosmWasm smart contracts:
- [cw20-bonding](https://github.com/CosmWasm/cw-tokens/tree/main/contracts/cw20-bonding)
- [cw721-base](https://github.com/CosmWasm/cw-nfts/tree/test-resolver/contracts/cw721-base)
- [cw-marketplace](https://github.com/wotori-studio/CW-Marketplace)
- [instantiator](https://github.com/wotori/instantiator)

### To Run This Project:

0. Deploy all required smart contracts.
1. Install any necessary dependencies.
2. Copy and paste `env.template` and rename it to `.env`.
3. Fill out the necessary fields in `.env`.
4. Run the project.

### Network

#### Constantine

```
NEXT_PUBLIC_CHAIN_ID=constantine-2
NEXT_PUBLIC_CHAIN_NAME=constantine
NEXT_PUBLIC_CHAIN_BECH32_PREFIX=archway
NEXT_PUBLIC_CHAIN_RPC_ENDPOINT=https://rpc.constantine-2.archway.tech:443
NEXT_PUBLIC_CHAIN_REST_ENDPOINT=https://api.constantine-2.archway.tech:443
NEXT_PUBLIC_STAKING_DENOM=uconst
NEXT_PUBLIC_FAUCET=https://faucet.constantine-2.archway.tech
```

## Inspiration

The core idea is to build a decentralized studio where people can collaboratively develop 3D characters and environments. This project aims to democratize digital creation by allowing anyone to start from a text description, which artists can then bring to life through drawings and 3D models.

## What It Does

NoNFT serves as the foundation for this ambitious idea. Anyone, even those who can't paint or do 3D modeling, can start with a character or environment description. Artists can add drawings based on the text, and 3D artists can further enhance these with models, skeletons, animation loops, and more.

## How We Built It

We chose Cosmos Archway for its developer-friendly rewards system, which incentivizes the development of smart contracts and interfaces, making it easier to bring such a big idea to life.

## Challenges We Ran Into

One significant challenge was deploying Wasm smart contracts directly from the front-end on Archway, which is currently complex.

## Accomplishments That We're Proud Of

The UI reflects the core idea of the project, providing a solid foundation for future development and expansion.

## What We Learned

We gained valuable insights into Web 3.0's transformative potential, as well as technical skills in React, Next.js, Rust, IPFS, and smart contract types (CW721 & CW20).

## What's Next for NoNFT

1. Collaborate with the Archway team to enable direct front-end Wasm smart contract deployment.
2. Develop a new CW721-based smart contract with multi-owner capabilities.
3. Refine the platform and invite users for collaborative content creation.
4. Create a Unity-based mobile app for interactive content engagement.