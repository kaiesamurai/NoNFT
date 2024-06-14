import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY as string;
const secretKey = process.env
  .NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY as string;
const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL as string;

async function axiosPinataPost(data:any){
    console.log("axios recieved file:", typeof data, data)
    return await axios
        .post(apiUrl, data, {
        headers: {
            "Content-Type": `multipart/form-data;`,
            pinata_api_key: apiKey,
            pinata_secret_api_key: secretKey,
        },
        })
        .then((response) => {
        let IpfsHash = response.data.IpfsHash;
        let contentLinkAxios = `https://ipfs.io/ipfs/${IpfsHash}`;
        console.log("pinata axios response recieved...", contentLinkAxios);
        return contentLinkAxios;
    });
}

export default axiosPinataPost;