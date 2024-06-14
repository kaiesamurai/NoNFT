import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import globalStyles from "../../globalStyles/styles.module.sass";
import { useSigningClient } from "react-keplr";
import { calculateFee } from "@cosmjs/stargate";
import styles from "./styles.module.sass";
import { isMobile } from "react-device-detect";
import dappState from "../../store/dappState";

const CW20 = process.env.NEXT_PUBLIC_CW20 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";
const MULTIPLIER = Number(process.env.NEXT_PUBLIC_MULTIPLIER) || 1;

const WrapBuy = (props: any) => {
  const NFT = props.NFT;
  const PRICE = props.price;
  const MARKET_ID = props.marketID;
  const SELLER = props.seller;
  const { walletAddress, signingClient } = useSigningClient();
  console.log("This is seller:", SELLER);

  const handleBuy = () => {
    if (walletAddress) {
      dappState.setState("Buy transaction");
      dappState.setOn();
      console.log("lets buy this:", NFT);
      const msg = `{"offering_id":"${MARKET_ID}"}`;
      const encodedMsg = Buffer.from(msg).toString("base64");

      if (!signingClient) return;

      signingClient
        ?.execute(
          walletAddress,
          CW20,
          {
            send: {
              contract: MARKETPLACE,
              amount: PRICE,
              msg: encodedMsg,
            },
          },
          "auto" // TODO: move to context object
        )
        .then((res) => {
          console.log(res);
          dappState.setOff();
          alert("Successfully ordered!");
        })
        .catch((error) => {
          dappState.setOff();
          // alert(`Error! ${error.message}`);
          alert(
            `Error! Probably you don't have enough cw20 tokens. You can exchange wrapped tokens to original network tokens in sliding window with arrow on the left side.`
          );
          console.log("Error signingClient?.execute(): ", error);
        });
    } else {
      alert("Login to be able to buy NFTs");
    }
  };

  const handleWithdraw = () => {
    if (walletAddress) {
      dappState.setState("Withdraw transaction");
      dappState.setOn();
      console.log("lets withdraw this:", NFT);

      if (!signingClient) return;

      signingClient
        ?.execute(
          walletAddress,
          MARKETPLACE,
          {
            withdraw_nft: {
              offering_id: MARKET_ID,
            },
          },
          "auto"
        )
        .then(() => {
          alert("Withdaw success!");
          dappState.setOff();
        });
    }
  };

  return (
    <div>
      {NFT.type === "text" && <NFText NFT={NFT} />}
      {NFT.type === "img" && <NFImage NFT={NFT} />}
      {NFT.type === "3d" && <NFImage NFT={NFT} />}
      <div className={styles.center}>
        <div style={{ margin: "5px" }}>price: {PRICE / MULTIPLIER} CW20*</div>
        <div>
          {SELLER !== walletAddress ? (
            <button
              className={globalStyles.customButtonActive}
              onClick={() => {
                if (!isMobile) {
                  handleBuy();
                } else {
                  alert("Mobile devices currently not supported");
                }
              }}
            >
              buy
            </button>
          ) : (
            <button
              className={globalStyles.customButtonActive}
              onClick={() => {
                if (!isMobile) {
                  handleWithdraw();
                } else {
                  alert("Mobile devices currently not supported");
                }
              }}
            >
              withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WrapBuy;
