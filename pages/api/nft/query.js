let token_uri_data = {
  name: "TheCat",
  description: "what a wonderful cat ...",
  image: "ipfs://QmWTvKbPeWDwNQMFgbmWzciq7NNcwsQcBgV5jLNNhPNwF6",
  external_url: "https://wotori.com",
};

export default function handler(req, res) {
  res.status(200).json({
    // this return should be directly from Archway network
    data: {
      token_uri: "ipfs://QmbSvPGYVaQ8m5fvFcPRefoFkrZ4sctytwX3xhojjUDw7B",
      token_uri_data: token_uri_data, // TODO: query data from ipfs. This key is not come from Archway network
      extension: null,
    },
  });
}
