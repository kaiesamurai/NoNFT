import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
import ModelViewer from "../../src/components/ModelViewer";
import NFImage from "../../src/components/NFImage/NFImage";
import NFText from "../../src/components/NFText/NFText";
import { Nft } from "../../src/models/Nft";
import { useAtom } from "jotai/react";
import { globalStateAtom } from "../../src/jotai/activeCollection";

const rpcEndpoint = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string;

const NFTPage = () => {
  const [token_id, setId] = useState<string | null>();
  const [client, setClient] = useState<CosmWasmClient>();
  const [nft, setNft] = useState<Nft>();
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  useEffect(() => {
    if (!token_id) {
      const queryString = window.location.search;
      const parameters = new URLSearchParams(queryString);
      const value = parameters.get("id");
      setId(value);
      console.log(value);
    }

    const getClient = async () => {
      const res = await CosmWasmClient.connect(rpcEndpoint);
      setClient(res);
      console.log("signingClient: ", client);
    };

    if (!client) {
      console.log("getting client");
      getClient();
    }
    if (token_id && client) {
      console.log("start query smart-contract");
      client
        .queryContractSmart(globalState.cw721, {
          all_nft_info: { token_id: token_id },
        })
        .then((meta) => {
          console.log("meta:", meta);
          const decodedMetadata = JSON.parse(
            Buffer.from(meta.info.token_uri.slice(30), "base64").toString()
          );

          const newNFT: Nft = {
            id: parseInt(token_id),
            creator: decodedMetadata.creator,
            owner: meta.access.owner,
            name: decodedMetadata.title,
            type: decodedMetadata.type,
            href: `/items/${token_id + 1}`,
            parent: decodedMetadata.parent,
            content:
              decodedMetadata.content || "https://dummyimage.com/404x404",
            preview:
              decodedMetadata.preview ||
              "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file",
          };
          setNft(newNFT);
          console.log("decoded meta", decodedMetadata);
        });
    }
  }, [client]);
  return (
    <div>
      {nft ? (
        <>
          {nft.type === "text" && <NFText NFT={nft} />}

          {nft.type === "img" && <NFImage NFT={nft} />}

          {nft.type === "3d" && <ModelViewer NFT={nft} />}
        </>
      ) : null}
    </div>
  );
};

export default NFTPage;
