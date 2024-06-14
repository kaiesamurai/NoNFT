// Styles
import styles from "./NFBrowser.module.sass";

// Dependencies
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

// Contexts
import { useSigningClient } from "react-keplr";

// Components
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";

// Stores
import nftStore from "../../store/nftStore";
import getNftTokenAmount from "../../services/tokenId";
import query from "../../services/query/query";
import { useAtom } from "jotai/react";
import { globalStateAtom } from "../../jotai/activeCollection";

const NFBrowser = observer(() => {
  const { client } = useSigningClient();
  const [amount, setAmount] = useState();
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
  console.log("Browser client: ", client);

  useEffect(() => {
    console.log("LOOK AT ME:", client);
    console.log("global state", globalState);

    const getAmount = async (client) => {
      if (!client) return;
      let amountData = await getNftTokenAmount(client, globalState);
      console.log("current amount is:", amountData);
      setAmount(amountData);
    };

    if (client) {
      getAmount(client);
    }
  }, [client, globalState.cw721]);

  useEffect(() => {
    const queryNft = async (client) => {
      query(globalState.cw721, client, amount);
    };

    if (client && amount > 1) {
      queryNft(client);
    } else {
      nftStore.setLoadedNFT([]);
    }
  }, [amount]);

  let ignoreList = []; // TODO: move this to cloud variables
  return (
    <div className={styles.nftBrowser}>
      {nftStore.loadedNFT
        .slice(0)
        .filter((NFT) => (NFT ? NFT.type === nftStore.typeNFT : null))
        .reverse()
        .map((NFT) =>
          !ignoreList.includes(NFT.id) ? (
            <>
              {NFT.type === "text" && <NFText NFT={NFT} />}

              {NFT.type === "img" && <NFImage NFT={NFT} />}

              {NFT.type === "3d" && <NFImage NFT={NFT} />}
            </>
          ) : null
        )}
    </div>
  );
});

export default NFBrowser;
