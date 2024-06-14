import { useEffect, useState } from "react";
import { useSigningClient } from "react-keplr";
import queryMini from "../../services/query/queryMini";
import dappState from "../../store/dappState";
import WrapBuy from "../WrapTrade/WrapBuy";
import style from "./trade.module.sass";
import { useAtom } from 'jotai/react';
import { globalStateAtom } from "../../jotai/activeCollection";

const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";

const BuySection = () => {
  const { client, walletAddress } = useSigningClient();
  const [tokensObj, setTokensObj] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [marketIDs, setMarketIDs] = useState([]);
  const [seller, setSeller] = useState([]);
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  //  Query tokens that user own. TODO: move to user profile component
  useEffect(() => {
    if (!walletAddress) return;
    client
      .queryContractSmart(globalState.cw721, {
        tokens: { owner: walletAddress },
      })
      .then((ownersTokens) => {
        console.log("OWNER`S TOKENS:", ownersTokens);
      });
  }, [client]);

  useEffect(() => {
    if (client) {
      dappState.setStateAndOn("Loading content");
      client
        .queryContractSmart(MARKETPLACE, { get_offerings: {} })
        .then((tokensForSale) => {
          console.log("tokensForSale: ", tokensForSale);
          let offerings = tokensForSale.offerings;
          let tokens = [];
          let prices = [];
          let marketIDs = [];
          let sellerList = [];
          for (const index in offerings) {
            console.log(`iteration #${index}`, offer);
            let offer = offerings[index];
            tokens.push(offer.token_id);
            prices.push(offer.list_price.amount);
            marketIDs.push(offer.id);
            sellerList.push(offer.seller);
          }
          setPriceList(prices.reverse());
          setMarketIDs(marketIDs.reverse());
          setSeller(sellerList.reverse());
          queryMini(globalState.cw721, client, tokens).then((o) =>
            setTokensObj(o)
          );
          dappState.setOff();
        });
    }
  }, [client]);

  return (
    <div>
      <div className={style.nftBrowser}>
        {tokensObj
          .slice(0)
          .reverse()
          .map((NFT, index) => (
            <>
              <WrapBuy
                NFT={NFT}
                price={priceList[index]}
                marketID={marketIDs[index]}
                seller={seller[index]}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default BuySection;
