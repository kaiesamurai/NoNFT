import { observer } from "mobx-react-lite";
import dappState from "../../store/dappState";
import styles from "./styles.module.css";

export default observer(function Loading(props) {
  return dappState.display ? (
    <div className={styles.container}>
      <div className={styles.bgColor}>
        <p className={styles.loading}>{dappState.state}</p>
      </div>
    </div>
  ) : null;
});
