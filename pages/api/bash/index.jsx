// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Docs: https://nodejs.org/api/child_process.html#child-process
// Stackoverflow: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
import { execSync } from "child_process";

const archWasmCopy = "cp ./contracts/cw721/artifacts/cw721.wasm /var/tmp/.archwayd/cw721.wasm"
const archTxWasmStore = "archwayd  tx wasm store cw721.wasm --from user1 --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3"

export default function cmd(req, res) {
  const output = execSync("ls ./contracts/cw721", { encoding: "utf-8" });
  res.status(200).json({ output: output });
}
