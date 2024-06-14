import styles from "./DataPlatform.module.sass";

import { useState } from "react";
import { observer } from "mobx-react-lite";

import devStore from "./../../../../store/devStore";

enum DataPlatformState {
  Close = 0,
  Open = (devStore.DATA_PLATFORMS.length-1) * 36
}

const DataPlatform = observer(() => {
  const [dataPlatformPanel, setDataPlatformPanel] = useState<DataPlatformState>(DataPlatformState.Close);
  const [arrowStyle, setArrowStyle] = useState(styles.close);

  function openDataPlatformPanel() {
    setDataPlatformPanel(DataPlatformState.Open);
    setArrowStyle(styles.open);
  }
    
  function closeDataPlatformPanel() {
    setDataPlatformPanel(DataPlatformState.Close);
    setArrowStyle(styles.close);
  }

  return (
    <section style={{marginTop: "15px"}}>
      <h1 className={styles.title}>Data platform</h1>
      <button 
        type="button" 
        className={styles.currentPlatform}
        onClick={() => { 
          if (dataPlatformPanel === 0) openDataPlatformPanel();
          else closeDataPlatformPanel();
        }}
      >
        <span className={styles.name}>{devStore.dataPlatform}</span>
        <div className={`${styles.arrow} ${arrowStyle}`}></div>
      </button>
      
      <div className={styles.panel} style={{height: dataPlatformPanel}}>
        {dataPlatformPanel !== 0 && devStore.DATA_PLATFORMS
          .filter(platformName => platformName !== devStore.dataPlatform)
          .map((platformName, index) => 
            <input 
              key={index}
              value={platformName}
              className={styles.platform}
              type="button"
              onClick={() => { 
                devStore.setDataPlatform(platformName); 
                if (dataPlatformPanel === 0) openDataPlatformPanel();
                else closeDataPlatformPanel();
              }}
            />
          )
        }
      </div>
    </section>
  )
});

export default DataPlatform;
