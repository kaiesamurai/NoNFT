import { makeObservable, action, observable, toJS } from "mobx";

import { TypeNft, TypeTrade } from "./../models/Nft";

type OperatingMode = "create" | "explore" | "trade";

class NFTStore {
  public operatingMode: OperatingMode = "create";
  public typeNFT: TypeNft = "text";
  public typeTrade: TypeTrade = "buy";
  public loadedNFT: Array<any> = [];
  public tree: Array<any> = [];

  public constructor() {
    makeObservable(this, {
      operatingMode: observable,
      setOperatingMode: action,

      typeNFT: observable,
      setNftType: action,

      typeTrade: observable,
      setTypeTrade: action,

      loadedNFT: observable,
      setLoadedNFT: action,

      tree: observable,
      setTree: action,
    });
  }

  public setOperatingMode(mode: OperatingMode) {
    this.operatingMode = mode;
  }

  public setNftType(type: TypeNft) {
    this.typeNFT = type;
  }

  public setLoadedNFT(data: any) {
    console.log("MOBX. setLoadedNFT:", data);
    this.loadedNFT = data;
    this.setTree();
  }

  public setTree() {
    console.log("Let's build a tree! Nfts are here:", toJS(this.loadedNFT));
    let treeProxy: any = {};

    for (const i in this.loadedNFT) {
      let curObj = this.loadedNFT[i];

      if (curObj === null) {
        continue; // continue the loop if curObj is null
      }

      if (!treeProxy[curObj.parent]) {
        treeProxy[curObj.parent] = [];
      }

      if (curObj.parent) {
        treeProxy[curObj.parent].push(curObj.id);
      }
    }
    this.tree = treeProxy;
    console.log("MOBX. Tree builded! Here it is: ", treeProxy);
  }

  public setTypeTrade(type: TypeTrade) {
    this.typeTrade = type;
    console.log("update trade type to:", this.typeTrade);
  }
}

export default new NFTStore();
