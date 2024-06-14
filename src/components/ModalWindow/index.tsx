// Styles
import styles from "./ModalWindow.module.sass";

// Models
import { Nft } from "../../models/Nft";

// Dependencies
import { useEffect, useState } from "react";
import axios from "axios";

// Stores
import devStore from "../../store/devStore";
import nftStore from "../../store/nftStore";

// Comps
import NFTBlock from "./NftBlock";
import BasedBlock from "./BasedBlock";
import CreateBasedBlock from "./CreateBased";
import ChildrenBlock from "./ChildrendBlock";

interface Properties {
  isOpen: boolean;
  close(): void;
  NFT: Nft;
}

const ModalWindow = (props: Properties) => {
  const { isOpen, close, NFT } = props;

  const [modalWindowIsOpen, setModalWindowIsOpen] = useState(isOpen);
  const [text, setText] = useState<string>();

  useEffect(() => {
    console.log("hello from modal. This is selected NFT:", NFT);
    setModalWindowIsOpen(isOpen);
    getText();

    if (
      NFT.type !== "text" &&
      NFT.type !== "img" &&
      NFT.type !== "3d" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(`Received unknown NFT type: ${NFT.type}`);
    }
  }, [modalWindowIsOpen, nftStore.loadedNFT]);

  function closeModalWindow(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const targetClassName = (event.target as HTMLElement).className;
    const clickedToBackground = targetClassName === styles.background;
    const clickedToCloseButton = targetClassName === styles.close;
    if (clickedToBackground || clickedToCloseButton) {
      close();
    }
  }

  function getText(): void {
    if (
      process.env.NODE_ENV === "production" ||
      devStore.dataPlatform === "Blockchain"
    ) {
      axios.get(NFT.content).then((response) => setText(response.data));
    } else if (
      process.env.NODE_ENV === "development" &&
      devStore.dataPlatform === "Database"
    ) {
      setText(NFT.content);
    }
  }

  return (
    <div
      className={styles.background}
      onClick={(event) => closeModalWindow(event)}
    >
      <input type="button" className={styles.close} />
      <div className={`${styles.window} ${styles.navwrapper}`}>
        <div className={`${styles.interface}`}>
          <NFTBlock nft={NFT} text={text} />
          <BasedBlock nft={NFT} />
          <CreateBasedBlock nft={NFT} />
          <ChildrenBlock nft={NFT} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
