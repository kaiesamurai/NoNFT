import { calculateFee } from "@cosmjs/stargate";

export async function instantiateContract(
  signingClient,
  walletAddress,
  CW721_CODE_ID,
  newSmartContractData,
  label,
  onSuccess,
  onError
) {
  const result = await signingClient
    .instantiate(
      walletAddress,
      Number(CW721_CODE_ID),
      newSmartContractData,
      label,
      calculateFee(600_000, "20uconst"),
      {
        memo: "Created on NFText platform.",
        funds: [],
      }
    )
    .then((result) => {
      alert("Successfully minted!", result);
      onSuccess(result);
    });
  return result;
}
