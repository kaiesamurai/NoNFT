import styles from "./DeveloperMenu.module.sass";

import { useState } from "react";
import { observer } from "mobx-react-lite";

import DataPlatform from "./components/DataPlatform/DataPlatform";

enum MenuState {
  Open = 0,
  Close = -250
}

const DeveloperMenu = observer(() => {
  const [menuPosition, setMenuPosition] = useState<MenuState>(MenuState.Close);
  const [arrowStyle, setArrowStyle] = useState(styles.close);

  function openMenu() {
    setMenuPosition(MenuState.Open);
    setArrowStyle(styles.open);
  }

  function closeMenu() {
    setMenuPosition(MenuState.Close);
    setArrowStyle(styles.close);
  }

  return (
    <div className={styles.body} style={{left: menuPosition}}>
      <h1 className={styles.title}>DEVELOPER MENU</h1>

      <DataPlatform />

      <input
        type="button"
        className={`${styles.arrow} ${arrowStyle}`}
        onClick={() => {
          if (menuPosition !== 0) openMenu(); 
          else closeMenu();
        }}
      />  
    </div>
  );
});

export default DeveloperMenu;
