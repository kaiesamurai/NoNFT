import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import previewStore from "../../store/previewStore";

function ScreenShot({ ...props }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    console.log("screenshot effect");
    storeScreenShot();
  }, [props.trigger]);

  function storeScreenShot() {
    console.log(gl);
    gl.render(scene, camera);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.6;
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.preserveDrawingBuffer = true;
    gl.domElement.toBlob(
      function (blob) {
        previewStore.setPreview(blob);
      },
      "image/png",
      1.0
    );
  }

  function downloadScreenShot() {
    console.log(gl);
    gl.render(scene, camera);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.6;
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.preserveDrawingBuffer = true;
    gl.domElement.toBlob(
      function (blob) {
        var a = document.createElement("a");
        var url = URL.createObjectURL(blob);
        a.href = url;
        a.download = "canvas.png";
        a.click();
        console.log("function is actually being used");
      },
      "image/png",
      1.0
    );
  }

  return null;
}

export default ScreenShot;
