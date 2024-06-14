import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate/build/cosmwasmclient";
import { Nft } from "../../models/Nft";
import dappState from "../../store/dappState";

async function queryMini(
  cw721Contract: string,
  client: CosmWasmClient | null,
  ids: Array<number>
) {
  dappState.setStateAndOn("Query content");
  if (!client) return;

  const manyMetadata = [];
  for (const id in ids) {
    let nft = await client.queryContractSmart(cw721Contract, {
      all_nft_info: { token_id: ids[id] + "" },
    });
    manyMetadata.push(nft);
  }

  let response = await Promise.all(manyMetadata)
    .then((manyMetadata) => {
      console.log("metadata:", manyMetadata);
      const NFTs: Nft[] = manyMetadata.map((metadata, index) => {
        const decodedMetadata = JSON.parse(
          Buffer.from(metadata.info.token_uri.slice(30), "base64").toString()
        );
        let newNFT = createNFT(ids[index], metadata, decodedMetadata);
        return newNFT;
      });
      console.log("queried NFTs: ", NFTs);
      dappState.setOff();
      return NFTs;
    })
    .catch((e) => console.log(e));
  return response;
}

function createNFT(index: any, metadata: any, decodedMetadata: any) {
  const nft: Nft = {
    id: decodedMetadata.id ? decodedMetadata.id : index, // TODO: get real index
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
  return nft;
}

export default queryMini;
