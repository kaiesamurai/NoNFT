// Styles
import styles from "./NFUploader.module.sass";
import globalStyles from "./../../globalStyles/styles.module.sass";

// Dependencies
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { calculateFee } from "@cosmjs/stargate";

// Components
import SceneWithModel from "./../SceneWithModel/SceneWithModel";

// Contexts
import { useSigningClient } from "react-keplr";

// Services
import nftService from "./../../services/nftService";

// Stores
import nftStore from "./../../store/nftStore";
import getNftTokenAmount from "../../services/tokenId";

//hooks
import axiosPinataPost from "../../services/axiosPinataPost";
import previewStore from "../../store/previewStore";
import dappState from "../../store/dappState";
import { globalState } from "mobx/dist/internal";
import { useAtom } from "jotai/react";
import { globalStateAtom } from "../../jotai/activeCollection";

interface Properties {
  modalMode: string | null;
  parentId: number | null;
}

const NFUploader = observer((props: Properties) => {
  const [nftTitle, setNftTitle] = useState("");
  const [textNft, setTextNft] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const { walletAddress, signingClient } = useSigningClient();
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  useEffect(() => {
    console.log("props: ", props);
    setSelectedFile(undefined);
  }, [signingClient, props.modalMode, nftStore.typeNFT]);

  function getFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      console.log(file);
      setSelectedFile(file);
    }
  }

  function getDescriptionForNFText(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setTextNft(event.target.value);
  }

  function writeNFTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setNftTitle(event.target.value);
  }

  async function uploadPinata() {
    console.log("uploading to pinata...");

    if (
      (((nftStore.typeNFT !== "text" && !selectedFile) ||
        (nftStore.typeNFT == "text" && !textNft)) &&
        !props.modalMode) ||
      (props.modalMode !== "text" && !selectedFile && props.modalMode) ||
      (props.modalMode == "text" && !textNft && props.modalMode)
    ) {
      return;
    }

    const metadata = JSON.stringify({
      keyvalues: {
        test: "test",
      },
    });
    let formData = new FormData();
    formData.append("pinataMetadata", metadata);

    if (
      (nftStore.typeNFT !== "text" && selectedFile && !props.modalMode) ||
      (props.modalMode !== "text" && selectedFile)
    ) {
      formData.append("file", selectedFile);
    }

    if (
      (nftStore.typeNFT === "text" && !props.modalMode) ||
      props.modalMode === "text"
    ) {
      var file = new Blob([textNft], { type: "text/plain;charset=utf-8" });
      formData.append("file", file, "nftext.txt");
    }

    console.log("axios...");
    let contentLinkAxios = await axiosPinataPost(formData);
    return contentLinkAxios;
  }

  async function createMint() {
    if (!signingClient) return;

    dappState.setState("uploading to ipfs");
    dappState.setOn();
    let previewLink;
    console.log("preview file", previewStore.previewFile);
    let file = previewStore.previewFile;
    if ((nftStore.typeNFT === "3d" || props.modalMode === "3d") && file) {
      let formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        keyvalues: {
          test: "test",
        },
      });
      formData.append("pinataMetadata", metadata);

      previewLink = await axiosPinataPost(formData);
      console.log("preview uploaded: ", previewLink);
    }

    let token_id = await getNftTokenAmount(signingClient, globalState);
    console.log("token_id", token_id);

    let contentLinkAxios = await uploadPinata();
    if (!contentLinkAxios) {
      alert("Select a file or enter text to upload.");
      return;
    } else {
      console.log("Ready for minting", contentLinkAxios);
    }

    const metadata = JSON.stringify({
      id: token_id,
      title: nftTitle,
      creator: walletAddress,
      content: contentLinkAxios,
      type: props.modalMode ? props.modalMode : nftStore.typeNFT,
      parent: props.parentId,
      preview: previewLink,
    });

    console.log("Metadata:", metadata, "tokenID:", token_id);
    const encodedMetadata = Buffer.from(metadata).toString("base64");

    if (!signingClient) {
      throw new Error(`Not valid value of signingClient: ${signingClient}`);
    }
    dappState.setState("minting");
    signingClient
      ?.execute(
        walletAddress,
        globalState.cw721,
        {
          mint: {
            token_id: token_id.toString(),
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, ${encodedMetadata}`,
          },
        },
        "auto"
      )
      .then((response: any) => {
        dappState.setOff();
        alert("Successfully minted!");
      })
      .catch((error: any) => {
        dappState.setOff();
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      });
  }

  return (
    <div className={styles.overview}>
      <input
        type="text"
        placeholder="NFT`s title"
        onChange={(event) => writeNFTitle(event)}
        className={`${styles.titleInput} ${styles.overviewChild}`}
      />

      {/* WRITE TEXT */}
      {(nftStore.typeNFT === "text" && !props.modalMode) ||
      props.modalMode === "text" ? (
        <textarea
          className={`${styles.textField} ${styles.overviewChild}`}
          onChange={(event) => getDescriptionForNFText(event)}
          placeholder="Imagine..."
        ></textarea>
      ) : null}

      {/* SELECT FILE */}
      {((nftStore.typeNFT === "img" ||
        (nftStore.typeNFT === "3d" && !selectedFile)) &&
        !props.modalMode) ||
      props.modalMode === "img" ||
      (props.modalMode === "3d" && !selectedFile) ? (
        <label
          className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
        >
          select
          <input
            className={globalStyles.hide}
            type="file"
            accept={
              (nftStore.typeNFT === "img" && !props.modalMode) ||
              props.modalMode === "img"
                ? "image/*"
                : ".glb"
            }
            onChange={(event) => getFile(event)}
          />
        </label>
      ) : (nftStore.typeNFT === "3d" && !props.modalMode) ||
        props.modalMode === "3d" ? (
        <input
          className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
          type="button"
          value="delete file"
          onClick={() => setSelectedFile(undefined)}
        />
      ) : null}

      {/* IMAGE PREVIEW */}
      {(nftStore.typeNFT === "img" && selectedFile && !props.modalMode) ||
      (props.modalMode === "img" && selectedFile) ? (
        <>
          <span className={`${styles.selectedFile} ${styles.overviewChild}`}>
            {selectedFile &&
              nftService.getLimitedString(selectedFile.name, 30, 4)}
          </span>
          <img
            style={{ display: "none" }}
            src={URL.createObjectURL(selectedFile)}
            alt="preview image"
            onLoad={(event) =>
              nftService.setImageLimits(
                event,
                window.innerWidth < 720 ? window.innerWidth - 50 : 700
              )
            }
          />
        </>
      ) : null}

      {/* MODEL PREVIEW */}
      {(nftStore.typeNFT === "3d" && selectedFile && !props.modalMode) ||
      (props.modalMode === "3d" && selectedFile) ? (
        <>
          <span className={`${styles.selectedFile} ${styles.overviewChild}`}>
            {selectedFile &&
              nftService.getLimitedString(selectedFile.name, 30, 4)}
          </span>
          <div className={styles.webGL}>
            <SceneWithModel file={URL.createObjectURL(selectedFile)} />
          </div>
        </>
      ) : null}

      {/* MINT */}
      <button
        className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
        onClick={() => createMint()}
        onMouseOver={() => {
          previewStore.setTrigger();
        }}
      >
        mint
      </button>
    </div>
  );
});

export default NFUploader;
