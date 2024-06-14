import { useEffect, useState } from "react";
import { useSigningClient } from "react-keplr";
import queryMini from "../../services/query/queryMini";
import WrapSell from "../WrapTrade/WrapSell";
import styles from "./trade.module.sass";
import { isMobile } from "react-device-detect";
import { useAtom } from 'jotai/react';
import { globalStateAtom } from "../../jotai/activeCollection";

const SellSection = () => {
  const { walletAddress, client } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  useEffect(() => {
    if (!isMobile && walletAddress) {
      client
        .queryContractSmart(globalState.cw721, {
          tokens: { owner: walletAddress },
        })
        .then((response) => {
          let tokens = response.tokens;
          queryMini(globalState.cw721, client, tokens).then((o) =>
            setTokensObj(o)
          );
          console.log("got tokens ids:", tokens);
        });
    }
  }, [client]);

  return (
    <div>
      {isMobile ? (
        <p className={styles.title}>Mobile devices currently not supported</p>
      ) : null}
      {!walletAddress ? (
        <p className={styles.title}>Login to be able to mint and sell NFTs</p>
      ) : null}
      <div className={styles.nftBrowser}>
        {tokensObj !== []
          ? tokensObj
              .slice(0)
              .reverse()
              .map((NFT) => (
                <>
                  <WrapSell NFT={NFT} />
                </>
              ))
          : "You don't have nft for sell"}
      </div>
    </div>
  );
};

export default SellSection;
