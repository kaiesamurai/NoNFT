// Styles
import styles from "./ModeSelector.module.sass";

// Dependencies
import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import NFUploader from "./../NFUploader/NFUploader";
import NFBrowser from "./../NFBrowser/NFBrowser";
import ModeToggle, { Mode } from "./../ModeToggle/ModeToggle";
import TradeWindow from "../TradeWindow";

// Stores
import nftStore from "./../../store/nftStore";
import { isMobile } from "react-device-detect";
import { useSigningClient } from "react-keplr";

const ModeSelector = observer(() => {
  const { signingClient } = useSigningClient();
  const [modes, setModes] = useState<Mode[]>([
    {
      name: "text",
      action: () => {
        nftStore.setNftType("text");
      },
    },
    {
      name: "img",
      action: () => {
        nftStore.setNftType("img");
      },
    },
    {
      name: "3d",
      action: () => {
        nftStore.setNftType("3d");
      },
    },
  ]);

  const [modesTrading, setModesTrading] = useState<Mode[]>([
    {
      name: "buy",
      action: () => {
        nftStore.setTypeTrade("buy");
      },
    },
    {
      name: "sell",
      action: () => {
        nftStore.setTypeTrade("sell");
      },
    },
  ]);

  return (
    <>
      <div className={styles.overview}>
        {nftStore.operatingMode !== "trade" ? (
          <ModeToggle modes={modes} />
        ) : null}
        {nftStore.operatingMode === "trade" ? (
          <ModeToggle modes={modesTrading} />
        ) : null}
      </div>
      {/* TODO: replace with switchcase */}
      {nftStore.operatingMode === "create" && !isMobile && signingClient ? (
        <NFUploader modalMode={null} parentId={null} />
      ) : nftStore.operatingMode === "create" && isMobile ? (
        "Mobile devices currently not suported"
      ) : nftStore.operatingMode === "create" && !isMobile && !signingClient ? (
        "Login to be able to mint tokens"
      ) : null}

      {nftStore.operatingMode === "explore" && <NFBrowser />}
      {nftStore.operatingMode === "trade" && <TradeWindow />}
    </>
  );
});

export default ModeSelector;
