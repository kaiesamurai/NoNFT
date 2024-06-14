import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import globalStyles from "../../globalStyles/styles.module.sass";
import { useState } from "react";
import { useSigningClient } from "react-keplr";
import { calculateFee } from "@cosmjs/stargate";
import styles from "./styles.module.sass";
import dappState from "../../store/dappState";
import { useAtom } from "jotai/react";
import { globalStateAtom } from "../../jotai/activeCollection";

const CW20 = process.env.NEXT_PUBLIC_CW20 || "";
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE || "";
const MULTIPLIER = Number(process.env.NEXT_PUBLIC_MULTIPLIER) || 1;

const WrapSell = (props: any) => {
  const NFT = props.NFT;
  const { walletAddress, signingClient } = useSigningClient();
  const [price, setPrice] = useState(0);
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  const handleSell = () => {
    dappState.setState("pushing to market");
    dappState.setOn();
    console.log("lets sell this:", NFT);
    const msg = `{"list_price":{"address":"${CW20}","amount":"${
      price * MULTIPLIER
    }"}}`;
    const encodedMsg = Buffer.from(msg).toString("base64");
    if (!signingClient) return;

    signingClient
      ?.execute(
        walletAddress,
        globalState.cw721,
        {
          send_nft: {
            contract: MARKETPLACE,
            token_id: String(NFT.id),
            msg: encodedMsg,
          },
        },
        "auto"
      )
      .then((res) => {
        console.log(res);
        alert("Success");
        dappState.setOff();
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log("Error: ", error);
        dappState.setOff();
      });
  };

  const handleChange = (event: any) => {
    setPrice(event.target.value);
  };
  return (
    <div>
      {NFT.type === "text" && <NFText NFT={NFT} />}
      {NFT.type === "img" && <NFImage NFT={NFT} />}
      {NFT.type === "3d" && <NFImage NFT={NFT} />}
      <div className={styles.center}>
        <div style={{ margin: "7px" }}>
          <input
            onChange={(event) => handleChange(event)}
            style={{ width: "50px" }}
          ></input>{" "}
          CW20*
        </div>
        <div>
          <button
            className={globalStyles.customButtonActive}
            onClick={handleSell}
          >
            sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrapSell;
