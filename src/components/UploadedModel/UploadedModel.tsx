import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

interface Properties {
  file: string;
  scale: [number, number, number];
  position: [number, number, number];
}

export default function UploadedModel(props: Properties) {
  const { file, scale, position } = props;

  const { scene, animations } = useGLTF(file);
  const { ref, actions, names } = useAnimations(animations);

  useEffect(() => {
    startAnimation();
  }, [file, actions, names]);

  function startAnimation(index: number = 0): void {
    if (index < animations.length && actions[names[index]]) {
      actions[names[index]].reset().fadeIn(0.5).play()
    }
  }

  return (
    <group ref={ref} scale={scale} position={position} dispose={null}>
      <primitive object={scene} />
    </group>
  );
} 
