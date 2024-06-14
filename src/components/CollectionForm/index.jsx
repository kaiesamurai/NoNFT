import React, { useState } from "react";
import styles from "./Styles.module.css";
import { executeContract } from "../../utils/executeSmartContract";
import { useSigningClient } from "react-keplr";
import { globalStateAtom } from "../../jotai/activeCollection";
import { useAtom } from "jotai/react";
import dappState from "../../store/dappState";

const CW721_CODE_ID = process.env.NEXT_PUBLIC_CW721_CODE_ID;
const CW721Factory = process.env.NEXT_PUBLIC_CW_FACTORY;
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE;

export default function CollectionForm() {
  const { walletAddress, signingClient } = useSigningClient();
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
  let [txHash, setTxHash] = useState(0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "collectionName") {
      setCollectionName(value);
    } else if (name === "collectionSymbol") {
      setCollectionSymbol(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collection Name:", collectionName);
    console.log("Collection Symbol:", collectionSymbol);

    let newSmartContractData = {
      minter: walletAddress,
      name: collectionName,
      symbol: collectionSymbol,
    };
    const base64Str = btoa(JSON.stringify(newSmartContractData));
    let instantiateMessage = {
      instantiate_stored_contract: {
        code_id: Number(CW721_CODE_ID),
        admin: walletAddress,
        init_msg: base64Str,
        label: "NFText-CW721-COLLECTION",
      },
    };

    dappState.setState("Minting...");
    dappState.setOn();
    executeContract(
      signingClient,
      walletAddress, // MARKETPLACE should be here if we want to trade the collections but then we got a problem with query by user
      CW721Factory,
      instantiateMessage,
      undefined,
      undefined,
      (result) => {
        let txHashResp = result.transactionHash;
        alert(`Success! TxHash: ${txHashResp}`);
        setTxHash(txHashResp);
        console.log(result);
        setGlobalState({
          cw721: globalState.cw721,
          collectionName: globalState.collectionName,
          trigger: Math.random(),
        });
        dappState.setOff();
      },
      (error) => {
        dappState.setOff();
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      }
    );

    setShowModal(false);
  };

  return (
    <>
      <button onClick={toggleModal}>+</button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Add Collection</h2>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              Collection Name:
              <input
                type="text"
                name="collectionName"
                value={collectionName}
                onChange={handleInputChange}
                placeholder="collectionName"
                className={styles.inputField}
              />
              Collection Symbol:
              <input
                type="text"
                name="collectionSymbol"
                value={collectionSymbol}
                onChange={handleInputChange}
                placeholder="collectionSymbol"
                className={styles.inputField}
              />
              <div className={styles.buttonContainer}>
                <button type="submit">Add Collection</button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
