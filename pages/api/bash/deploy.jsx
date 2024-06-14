// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Docs: https://nodejs.org/api/child_process.html#child-process
// Stackoverflow: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
import { execSync } from "child_process";

const archWasmCopy =
  "cp ./contracts/cw721/artifacts/cw721.wasm /var/tmp/.archwayd/cw721.wasm";
const archTxWasmStore =
  "docker run -t --volume=/var/tmp/.archwayd:/root/.archway archwaynetwork/archwayd tx wasm store cw721.wasm --from testwallet --keyring-backend=test --chain-id constantine-1 --node https://rpc.constantine-1.archway.tech:443 --gas-prices 0.002uconst --gas auto --gas-adjustment 1.3 -y";
const command = "docker";

export default async function cmd(req, res) {
  const output = await execSync(archTxWasmStore, { encoding: "utf-8" });
  const consoleResponse = output.match(/[^\r\n]+/g)[1];
  res.status(200).json({ output: consoleResponse });
}
