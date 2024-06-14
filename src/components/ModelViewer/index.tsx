import styles from "./ModelViewer.module.sass"
import styles2 from "../NFImage/NFImage.module.sass"
import SceneWithModel from "../SceneWithModel/SceneWithModel";
import { Nft } from "../../models/Nft";
import nftService from "../../services/nftService";
import Link from 'next/link'
import { useState } from "react";
import ModalWindow from "../ModalWindow";

interface Properties {
    NFT: Nft;
}

const ModelViewer = (props: Properties) => {
    const { NFT } = props;
    const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);

    return (
        <div className={styles.block}>
            <div onClick={() => setModalWindowIsOpen(true)}>
            </div>
            <div className={styles.frame}>
                <SceneWithModel file={NFT.content} />
            </div>
            {modalWindowIsOpen &&
                <ModalWindow isOpen={modalWindowIsOpen} close={() => setModalWindowIsOpen(!modalWindowIsOpen)} NFT={NFT} />
            }
        </div>
    )
}

export default ModelViewer;