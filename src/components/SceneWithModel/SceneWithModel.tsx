import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UploadedModel from "./../UploadedModel/UploadedModel";
import ScreenShot from "../fiber/screenshot"
import style from "./style.module.sass"
import Loader from "../r3f/Loader"
interface Properties {
  file: string;
}

export default function SceneWithModel(props: Properties) {
  const { file } = props;
  const [trigger, setTrigger] = useState(0);

  function updateTrigger(){
    console.log("mouse leave 3D canvas. Updating trigger.")
    setTrigger(Math.random())
    return 
  }

  return (
    <div className={style.child} onMouseLeave={()=>{updateTrigger()}}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <OrbitControls />

        <Suspense fallback={<Loader />}>
          <UploadedModel file={file} scale={[1, 1, 1]} position={[0, 0, 0]} />
          <ScreenShot trigger={trigger}/>
        </Suspense>

        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
      </Canvas>
      </div>
  );
}
