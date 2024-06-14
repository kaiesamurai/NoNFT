import { useEffect } from "react";

const NFTPage = () => {
    
  useEffect(() => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const value = parameters.get("id");
    console.log(value);
  }, []);
  return "Hi";
};

export default NFTPage;
