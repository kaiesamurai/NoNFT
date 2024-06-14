// import { useSigningClient } from "../../context/cosmwasm";
import { useSigningClient } from "react-keplr";

export function LoginHeader({ userPageSetter, userPageState }) {
  const { walletAddress, connectWallet, signingClient, disconnect, client } =
    useSigningClient();

  function connectToWallet() {
    if (!signingClient) {
      console.log("connecting");
      connectWallet();
    } else {
      console.log("disconecting");
      disconnect();
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <div className="LoginHover">
        <p
          style={{ paddingRight: "5rem" }}
          onClick={() => {
            connectToWallet();
          }}
        >
          {walletAddress ? "Logout" : "Login"}
        </p>
        <div onClick={() => userPageSetter(!userPageState)}>
          <p>
            {walletAddress &&
              walletAddress.slice(0, 7) + "..." + walletAddress.slice(-3)}
          </p>
        </div>
      </div>
    </div>
  );
}
