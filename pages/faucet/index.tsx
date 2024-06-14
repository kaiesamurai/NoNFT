import axios from "axios";
import { useState } from "react";

export default function Index() {
  let [address, setAddress] = useState("");
  let [responseData, setResponseData] = useState("");

  const handleRequest = () => {
    let url = "https://faucet.constantine-1.archway.tech";
    let request = {
      denom: "uconst",
      address: address,
    };
    axios.post(url, request).then((response) => {
      let message = JSON.stringify(response.data.transfers[0]);
      setResponseData(message);
    });
  };

  const hadleUnputChange = (event: React.ChangeEvent<HTMLInputElement>) => setAddress(event.target.value);
  
  return (
    <>
      <input onChange={(event) => hadleUnputChange(event)}></input>
      <button onClick={handleRequest}>request funds</button>
      {responseData && <p>{responseData}</p>}
    </>
  );
}
