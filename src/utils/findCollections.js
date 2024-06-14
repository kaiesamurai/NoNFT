const CW721_CODE_ID = process.env.NEXT_PUBLIC_CW721_CODE_ID;

export async function findUserCollections(walletAddress, signingClient) {
  const response = await signingClient.getContracts(CW721_CODE_ID);
  const userCollectionArray = [];

  console.log("parsing all users contract instantiated with: ", CW721_CODE_ID);
  for (const address of response) {
    const result = await signingClient.getContract(address);
    if (result.admin == walletAddress) {
      // TODO: There may be a feature where the user can query the instantiated contract by him only, to reduce the response.
      userCollectionArray.push(result.address);
    }
  }
  console.log("found user`s contract: ", userCollectionArray);

  return userCollectionArray;
}

export async function findCollectionsData(collectionsAddresses, signingClient) {
  console.log("fetching collection data");
  const data = [];

  for (const address of collectionsAddresses) {
    const result = await signingClient.queryContractSmart(address, {
      contract_info: {},
    });
    result["address"] = address;
    data.push(result);
  }
  console.log("recieved collection data", data);
  return data;
}

export async function getCollectionDataHibrid(walletAddress, signingClient) {
  // to make this work faster this could be done in one single thread with .then(... .then(...)) combining two functions in on
  // check previous revision of this file, where there is no async realisation
  const userCollections = await findUserCollections(
    walletAddress,
    signingClient
  );
  const collectionData = await findCollectionsData(
    userCollections,
    signingClient
  );
  return collectionData;
}

export function getCollectionDataHibridV2(walletAddress, client) {
  /* The fasters function for parsing user collection at the moment of writing...
   */
  let userContracts = [];
  return client.getContracts(CW721_CODE_ID).then((response) => {
    const promises = response.map((address) => {
      // console.log("Parsing address", address);
      return client.getContract(address).then((contractInfo) => {
        if (contractInfo.admin === walletAddress) {
          // console.log("Found user contract...");
          userContracts.push(address);
        }
      });
    });
    return Promise.all(promises).then(() =>
      Promise.all(
        userContracts.map((address) =>
          client
            .queryContractSmart(address, { contract_info: {} })
            .then((result) => ({ ...result, address }))
        )
      )
    );
  });
}

export async function getCollectionDataHibridV3(walletAddress, signingClient) {
  /*
  This refactored version of the function should (but actually not) be functionally equivalent 
  to the original version (getCollectionDataHibridV2), but should be easier to read and modify, 
  especially if you need to add additional logic or error handling in the future.
  */
  const userContracts = [];
  const response = await signingClient.getContracts(CW721_CODE_ID);

  for (const address of response) {
    const contractInfo = await signingClient.getContract(address);
    if (contractInfo.admin === walletAddress) {
      userContracts.push(address);
    }
  }

  const collectionData = await Promise.all(
    userContracts.map((address) =>
      signingClient
        .queryContractSmart(address, { contract_info: {} })
        .then((result) => ({ ...result, address }))
    )
  );

  return collectionData;
}
