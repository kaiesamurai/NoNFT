import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

async function getNftTokenAmount(
  signingClient: SigningCosmWasmClient,
  globalState: any
) {
  return await signingClient
    .queryContractSmart(globalState.cw721, { num_tokens: {} })
    .then((response) => {
      let tokenId = response.count + 1;
      console.log("Latest TokenID", tokenId);
      return tokenId;
    })
    .catch((error) => {
      alert(`Error! ${error.message}`);
      console.log(
        "Error signingClient.queryContractSmart() num_tokens: ",
        error
      );
    });
}

export default getNftTokenAmount;
