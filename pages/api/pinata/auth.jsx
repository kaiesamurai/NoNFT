import axios from "axios";

const auth = (req, res) => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      return res.status(200).json({
        status: response.status,
        message: response.data.message,
      });
    })
    .catch(function (error) {
      return res.status(400).json({
        status: "error",
      });
    });
};

export default auth;
