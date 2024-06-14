import { useState } from "react";
import NFUploader from "../NFUploader/NFUploader";
import styles from "./ModalWindow.module.sass";

export default function CreateBasedBlock(props: any) {
  let NFT = props.nft;
  const [mode, setMode] = useState<string>("text");

  function handleModeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setMode(event.target.value);
    console.log("Modal mode: ", mode);
  }

  return (
    <div className={styles.createBasedBlock}>
      <h2 className={styles.header}>Create new NFT based on "{NFT.name}":</h2>
      <select
        name="modes"
        className="{styles.modes}"
        value={mode}
        onChange={(e) => {
          handleModeChange(e);
        }}
      >
        <option value="text">text</option>
        <option value="img">img</option>
        <option value="3d">3d</option>
      </select>
      <NFUploader modalMode={mode} parentId={NFT.id} />
    </div>
  );
}
