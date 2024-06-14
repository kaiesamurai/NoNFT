import { makeObservable, action, observable } from "mobx";

import { PlatformName } from "./../models/Nft";

class DevStore {
  public readonly DATA_PLATFORMS: PlatformName[] = ["Blockchain", "Database"];
  public dataPlatform: PlatformName = "Blockchain";

  public constructor() {
    makeObservable(this, {
      dataPlatform: observable,
      setDataPlatform: action
    });
  }

  public setDataPlatform(platformName: PlatformName) {
    this.dataPlatform = platformName;
  }
}

export default new DevStore();
