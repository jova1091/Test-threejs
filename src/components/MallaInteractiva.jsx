import React, { useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { BurbujaInformativa } from "./UI/BurbujaInformativa";

export function MallaInteractiva({ children, info, ...props }) {
  const gl = useThree((state) => state.gl);
  const [seleccionado, setSeleccionado] = useState(false);
  const [puntoBurbuja, setPuntoBurbuja] = useState(null);

  const manejarClic = (e) => {
    e.stopPropagation();

    const isPresenting = gl.xr.isPresenting;
    // Comprobación para evitar la activación al colocar el modelo en AR
    if (isPresenting) {
      const modelContainerGroup = e.object.parent?.parent;
      if (modelContainerGroup && modelContainerGroup.position.lengthSq() < 0.001) {
        return;
      }
    }

    // Calcula la posición de la burbuja con un offset
    const worldPoint = e.point.clone();
    worldPoint.y += 0.5; // Offset vertical
    const localPoint = e.object.worldToLocal(worldPoint);

    setPuntoBurbuja([localPoint.x, localPoint.y, localPoint.z]);
    setSeleccionado(true);
  };

  return (
    <mesh
      {...props}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      onClick={manejarClic}
    >
      {children}
      {seleccionado && puntoBurbuja && (
        <Html position={puntoBurbuja} center>
          <BurbujaInformativa
            titulo={info.titulo}
            texto={info.texto}
            alCerrar={() => {
              setSeleccionado(false);
              setPuntoBurbuja(null);
            }}
          />
        </Html>
      )}
    </mesh>
  );
}
