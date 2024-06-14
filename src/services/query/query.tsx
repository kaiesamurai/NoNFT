import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate/build/cosmwasmclient";
import { Nft } from "../../models/Nft";
import dappState from "../../store/dappState";
import nftStore from "../../store/nftStore";

async function query(
  cw721Contract: string,
  client: CosmWasmClient | null,
  children: any
) {
  if (!client) return;
  dappState.setStateAndOn("Query NFTs");
  console.log("start query nft.", children);
  if (typeof children === "number") {
    children = Array.from({ length: children - 1 }, (x, i) => i + 1);
    console.log("converted:", children);
  }

  const manyMetadata = [];
  for (const prop in children) {
    manyMetadata.push(
      client.queryContractSmart(cw721Contract, {
        all_nft_info: { token_id: children[prop] + "" },
      })
    );
  }

  console.log("Metadata:", manyMetadata);

  await Promise.all(manyMetadata).then((manyMetadata) => {
    const NFTs: (Nft | null)[] = manyMetadata.map((metadata, index) => {
      console.log("process metadata:", metadata);
      let decodedMetadata = null;
      try {
        decodedMetadata = JSON.parse(
          Buffer.from(metadata.info.token_uri.slice(30), "base64").toString()
        );
      } catch (error) {
        console.error("Error while parsing metadata:", error);
        return null;
      }
      const newNFT: Nft = {
        id: decodedMetadata.id ? Number(decodedMetadata.id) : index + 1, // TODO: get real index
        creator: decodedMetadata.creator,
        owner: metadata.access.owner,
        name: decodedMetadata.title,
        type: decodedMetadata.type,
        href: `/items/${index + 1}`,
        content: decodedMetadata.content || "https://dummyimage.com/404x404",
        parent: decodedMetadata.parent,
        preview:
          decodedMetadata.preview ||
          "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file",
      };
      dappState.setOff();
      return newNFT;
    });

    console.log("query: ", NFTs);
    nftStore.setLoadedNFT(NFTs);
    return NFTs;
  });
}

export default query;
