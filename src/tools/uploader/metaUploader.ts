import axios from "axios";

export default async function uploadPinataMeta(ipfsFileUrl: string, meta: any) {
  /*
  Old function for meta upload to IPFS. It's not reasonable as we can store meta just  as base64 in uri
  */
  const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY as string;
  const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY as string;
  const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL as string;

  let description = `${meta.description.substr(0, 25)}...`;
  let metaProxy = {
    name: meta.name,
    description: description,
    external_url: "https://wotori.com",
    image: ipfsFileUrl,
    attributes: [
      {
        trait_type: "type",
        value: meta.type,
      },
    ],
  };
  let file = new Blob([JSON.stringify(metaProxy)], {
    type: "text/plain;charset=utf-8",
  });
  const formData = new FormData();
  formData.append("file", file, "meta.json");

  const response = await axios.post(apiUrl, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary= ${formData}`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: secretKey,
    },
  });
  return await response.data;
}
