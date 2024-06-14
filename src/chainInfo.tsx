// https://docs.keplr.app/api/suggest-chain.html
import { ChainInfo } from "@keplr-wallet/types";
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "";
const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME || "";
const RPC = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || "";
const REST = process.env.NEXT_PUBLIC_CHAIN_REST_ENDPOINT || "";
const BECH32 = process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX || "";
const DENOM = process.env.NEXT_PUBLIC_DENOM || "";
const DENOM_MIN = process.env.NEXT_PUBLIC_DENOM_MIN || "";

console.log(
  "all network vars: ",
  CHAIN_ID,
  CHAIN_NAME,
  RPC,
  REST,
  BECH32,
  DENOM,
  DENOM_MIN
);

const chainInfo: ChainInfo = {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  rpc: RPC,
  rest: REST,
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: BECH32,
    bech32PrefixAccPub: BECH32 + "pub",
    bech32PrefixValAddr: BECH32 + "valoper",
    bech32PrefixValPub: BECH32 + "valoperpub",
    bech32PrefixConsAddr: BECH32 + "valcons",
    bech32PrefixConsPub: BECH32 + "valconspub",
  },
  currencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MIN,
      coinDecimals: 18,
      coinGeckoId: "undefined",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MIN,
      coinDecimals: 18,
      coinGeckoId: "undefined",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: DENOM,
    coinMinimalDenom: DENOM_MIN,
    coinDecimals: 18,
    coinGeckoId: "undefined",
  },
};

export default chainInfo;
