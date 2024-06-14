import styles from "./ModalWindow.module.sass";
import nftStore from "../../store/nftStore";
import NFText from "../NFText/NFText";
import NFImage from "../NFImage/NFImage";
import ModelViewer from "../ModelViewer";

export default function BasedBlock(props: any) {
  let NFT = props.nft;
  return (
    <div className={styles.basedBlock}>
      <div style={{ padding: "10px" }}>
        {NFT.parent && (
          <h2 className={styles.title}>
            "{NFT.name}" based on nft id #{NFT.parent}
          </h2>
        )}
      </div>
      {nftStore.loadedNFT[NFT.parent - 1]
        ? [nftStore.loadedNFT[NFT.parent - 1]]
            .slice(0)
            .reverse()
            .map((NFT) => (
              <>
                {NFT.type === "text" ? (
                  <NFText NFT={NFT} />
                ) : NFT.type === "img" ? (
                  <NFImage NFT={NFT} />
                ) : NFT.type === "3d" ? (
                  <ModelViewer NFT={NFT} />
                ) : null}
              </>
            ))
        : null}
    </div>
  );
}
