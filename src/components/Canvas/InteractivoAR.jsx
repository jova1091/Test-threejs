import { useRef, useState } from "react";
import { useXR, useXRHitTest } from "@react-three/xr";

export function InteractivoAR({ children }) {
  const reticleRef = useRef();
  const [modelPos, setModelPos] = useState(null);

  // Accedemos al estado de la sesión de XR
  const session = useXR((state) => state.session);
  const isPresenting = !!session;

  // El Hit Test sigue funcionando igual: posiciona el aro en el mundo real
  useXRHitTest((hitMatrix) => {
    if (reticleRef.current && !modelPos) {
      hitMatrix.decompose(reticleRef.current.position, reticleRef.current.quaternion, reticleRef.current.scale);
    }
  });

  // Función para fijar el modelo
  const colocarModelo = () => {
    if (reticleRef.current) {
      setModelPos(reticleRef.current.position.clone());
    }
  };

  return (
    <>
      {/* 1. El Retículo (Aro buscador) */}
      {isPresenting && !modelPos && (
        <mesh ref={reticleRef} rotation-x={-Math.PI / 2} onClick={colocarModelo}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      )}

      {/* 2. El modelo arquitectónico */}
      {/* El contenedor del modelo + Stage */}
      <group position={modelPos || [0, 0, 0]}>{children}</group>
    </>
  );
}
