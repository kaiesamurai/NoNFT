import { useAtom } from "jotai/react";
import globalStyles from "./../../globalStyles/styles.module.sass";
import { useState, useEffect } from "react";
import { globalStateAtom } from "../../jotai/activeCollection";

export interface Mode {
  name: string;
  action: () => void;
}

interface Properties {
  modes: Array<Mode>;
}

const ModeToggle = ({ modes }: Properties): JSX.Element => {
  const [indexActiveButton, setIndexActiveButton] = useState(1);
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
  useEffect(() => {
    modes[indexActiveButton].action();
  }, []);

  return (
    <>
      {modes.map((mode, index) => {
        if (
          mode.name == "trade" &&
          globalState.collectionName !== "Community"
        ) {
          return null;
        }
        let buttonMode =
          index === indexActiveButton
            ? globalStyles.customButtonActive
            : globalStyles.customButtonNotActive;
        return (
          <button
            key={index}
            className={buttonMode}
            onClick={() => {
              setIndexActiveButton(index);
              mode.action();
            }}
          >
            {mode.name}
          </button>
        );
      })}
    </>
  );
};

export default ModeToggle;
