import nftStore from "../../store/nftStore";
import NFImage from "../NFImage/NFImage";
import NFText from "../NFText/NFText";
import styles from "./ModalWindow.module.sass";

export default function ChildrenBlock(props: any) {
  let NFT = props.nft;
  return (
    <div className={styles.childrenBlock}>
      <h2 className={styles.title}>
        {nftStore.tree[NFT.id] && `NFTs based on "${NFT.name}":`}
      </h2>
      {/* TODO: queried sm contract data with childrens*/}
      <div>
        {nftStore.loadedNFT
          ? nftStore.loadedNFT
              .slice(0)
              .reverse()
              .map((mNFT) =>
                nftStore.tree[NFT.id] ? (
                  mNFT && nftStore.tree[NFT.id].includes(mNFT.id) ? (
                    <>
                      {mNFT.type === "text" ? (
                        <NFText NFT={mNFT} />
                      ) : mNFT.type === "img" ? (
                        <NFImage NFT={mNFT} />
                      ) : mNFT.type === "3d" ? (
                        <NFImage NFT={mNFT} />
                      ) : null}
                    </>
                  ) : null
                ) : null
              )
          : null}
      </div>
    </div>
  );
}
