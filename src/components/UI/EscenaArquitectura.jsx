import { ContactShadows } from "@react-three/drei";
import { InteractivoAR } from "../../components/Canvas/InteractivoAR";

import { RealisticBrokenPillars } from "../../components/Realistic_broken_pillars";
import { AbandonedWarehouseInteriorScene } from "../../components/Abandoned_warehouse_-_interior_scene";
import { Museo } from "../../components/Hintze_hall";

export function EscenaArquitectura({ modeloActual }) {
  return (
    <InteractivoAR>
      {/* Iluminación básica para reemplazar la del <Stage> */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={1} />

      {modeloActual === "casa" && <AbandonedWarehouseInteriorScene />}
      {modeloActual === "columna" && <RealisticBrokenPillars />}
      {modeloActual === "museo" && <Museo />}

      {/* Sombra de contacto para un mejor anclaje visual en el suelo */}
      <ContactShadows rotation-x={Math.PI / 2} position={[0, -1.5, 0]} opacity={0.75} width={10} height={10} blur={2} far={4} />
    </InteractivoAR>
  );
}
