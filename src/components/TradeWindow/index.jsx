import { observer } from "mobx-react-lite";
import nftStore from "../../store/nftStore";
import BuySection from "./buy";
import SellSection from "./sell";

const TradeWindow = observer(() => {
  return (
    <>
      {nftStore.typeTrade === "buy" ? (
        <BuySection />
      ) : nftStore.typeTrade === "sell" ? (
        <SellSection />
      ) : null}
    </>
  );
});

export default TradeWindow;
