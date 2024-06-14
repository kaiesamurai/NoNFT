import { useEffect, useState } from "react";
import { useSigningClient } from "react-keplr";
import { calculateFee } from "@cosmjs/stargate";
import executeContract from "../../utils/executeSmartContract";
import {
  findUserCollections,
  findCollectionsData,
  getCollectionDataHibrid,
  getCollectionDataHibridV2,
  getCollectionDataHibridV3,
} from "../../utils/findCollections";
import { CollectionForm } from "../CollectionForm";
import { instantiateContract } from "../../utils/instantiateSmartContract";

const CW721_CODE_ID = process.env.NEXT_PUBLIC_CW721_CODE_ID;
const CW721Factory = process.env.NEXT_PUBLIC_CW_FACTORY;
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE;

export default function UserPage() {
  const { walletAddress, signingClient } = useSigningClient();
  let [txHash, setTxHash] = useState(0);
  let [newContract, setNewContract] = useState(0);
  const [userCollections, setUserCollections] = useState([]);

  let [collections, setCollections] = useState([
    {
      name: "Sample Collection 1",
      symbol: "SC1",
      contractAddress: "contract_address_1",
      nfts: [
        {
          id: "1",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "2",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "3",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "4",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
      ],
    },
    {
      name: "Sample Collection 2",
      symbol: "SC2",
      contractAddress: "contract_address_2",
      nfts: [
        {
          id: "1",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "2",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
      ],
    },
  ]);

  async function directInstantiate() {
    let newSmartContractData = {
      minter: walletAddress,
      name: "DirectTest",
      symbol: "DirectTest",
    };
    console.log("instantiating...");
    console.log("instantiating smart contract...", newSmartContractData);
    let resp = await instantiateContract(
      signingClient,
      walletAddress,
      CW721_CODE_ID,
      newSmartContractData,
      "NFT_CW721_CONTRACT",
      (message) => console.log("callback", message),
      (message) => console.log("callback", message)
    );
    // signingClient
    //   .instantiate(
    //     walletAddress,
    //     Number(CW721_CODE_ID),
    //     newSmartContractData,
    //     "My cool label",
    //     calculateFee(600_000, "20uconst"),
    //     {
    //       memo: "Let's see if the memo is used",
    //       funds: [],
    //     }
    //   )
    //   .then((result) => {
    //     alert("Successfully minted!", result);
    //   });
  }

  function instantiateCW721() {
    console.log("instantiate new collection", signingClient);
    let newSmartContractData = {
      minter: walletAddress,
      name: "Akira27",
      symbol: "Akira",
    };
    const base64Str = btoa(JSON.stringify(newSmartContractData));
    let instantiateMessage = {
      instantiate_stored_contract: {
        code_id: Number(CW721_CODE_ID),
        admin: walletAddress,
        init_msg: base64Str,
        label: "test",
      },
    };
    console.log("smart contract data: ", newSmartContractData, base64Str);

    executeContract(
      signingClient,
      walletAddress, // MARKETPLACE should be here if we want to trade the collections
      CW721Factory,
      instantiateMessage,
      undefined,
      undefined,
      (result) => {
        let txHashResp = result.transactionHash;
        alert(`Success! TxHash: ${txHashResp}`);
        setTxHash(txHashResp);
        console.log(result);
      },
      (error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      }
    );
  }

  function getAddress() {
    console.log("Getting address...");
    signingClient.getTx(txHash).then((response) => {
      let data = JSON.parse(response.rawLog)[0].events;
      let newContractAddress = data[1].attributes[0].value;
      setNewContract(newContractAddress);
      console.log("all data: ", data);
      console.log("address: ", newContractAddress);
      console.log(`Success! New contract: ${newContractAddress}`);
    });
  }

  function mintNFT() {
    console.log("Minting...");
    let mintMessage = {
      mint: {
        token_id: "1",
        owner: `${walletAddress}`,
        token_uri: `data:application/json;base64, test`,
      },
    };
    executeContract(
      signingClient,
      walletAddress,
      newContract,
      mintMessage,
      undefined,
      undefined,
      (result) => {
        alert("Successfully minted!", result);
      },
      (error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      }
    );
  }

  async function searchInstantiated() {
    let resp = await signingClient.searchTx({
      sentFromOrTo: walletAddress,
    });
    // const queryRequest = {
    //   tags: [
    //     { key: "sender", value: "osmo1a8dq0wced6q29rppdug7yvk8ek0dsrqwypcjy8" },
    //     { key: "action", value: "send" },
    //   ],
    // };

    // let resp = await signingClient.searchTx(queryRequest);
    console.log(resp);
  }

  useEffect(() => {
    console.log("recieved signingClient");
  }, [signingClient]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <p>txHash: {txHash}</p>
      <p>new contract address: {newContract}</p>
      <button onClick={directInstantiate}>direct instantiate</button>
      <button onClick={searchInstantiated}>search optimized</button>
      <button onClick={instantiateCW721}>execute</button>
      <button onClick={getAddress}>address</button>
      <button onClick={mintNFT}>mint</button>
      <button
        onClick={async () => {
          let data = await findUserCollections(walletAddress, signingClient);
          setUserCollections(data);
          console.log(data);
        }}
      >
        find
      </button>
      <button
        onClick={async () => {
          console.log("load collections data");
          let data = await findCollectionsData(userCollections, signingClient);
          console.log(data);
        }}
      >
        load collections data
      </button>
      <button
        onClick={() => {
          console.log("getting data");
          getCollectionDataHibrid(walletAddress, signingClient);
        }}
      >
        search slow (hybrid)
      </button>
      <button
        onClick={async () => {
          console.log("getting data");
          let data = await getCollectionDataHibridV2(
            walletAddress,
            signingClient
          );
          console.log("recieved response:", data);
        }}
      >
        search slow (hybrid-v2)
      </button>
      <button
        onClick={async () => {
          console.log("getting data");
          let data = await getCollectionDataHibridV3(
            walletAddress,
            signingClient
          );
          console.log("recieved response:", data);
        }}
      >
        search slow (hybrid-v3)
      </button>

      <div style={{ marginBottom: "20px" }}>
        <h2>Create a new NFT Collection</h2>
        <button onClick={instantiateCW721}>Mint Collection</button>
      </div>
      <div>
        <h2>{walletAddress} NFT Collections:</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {collections.map((collection, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid black",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>
                {collection.name} ({collection.symbol})
              </h3>
              <p>Contract address: {collection.contractAddress}</p>
              <button onClick={mintNFT}>Mint NFT to {collection.symbol}</button>
              <div>
                <h4>NFTs in this collection:</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {collection.nfts.map((nft, nftIndex) => (
                    <div
                      key={nftIndex}
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={nft.image}
                        alt={`NFT ${nft.id}`}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          height: "100%",
                          width: "auto",
                          transform: "translate(-50%, -50%)",
                          minWidth: "100%",
                          minHeight: "100%",
                        }}
                      />
                      <p>Owner: {nft.owner}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
