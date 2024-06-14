import { makeObservable, action, observable } from "mobx";

class dappState {
  public state: String = "";
  public display: Boolean = false;

  public constructor() {
    makeObservable(this, {
      state: observable,
      setState: action,

      display: observable,
      setOn: action,
      setOff: action,
      setStateAndOn: action,
    });
  }

  public setStateAndOn(state: string){
    this.setState(state)
    this.setOn()
  }

  public setState(state: string) {
    this.state = state;
  }

  public setOn() {
    this.display = true;
  }

  public setOff() {
    this.display = false;
  }
}

export default new dappState();
