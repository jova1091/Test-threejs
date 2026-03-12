import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR as XRComponent, createXRStore } from "@react-three/xr";

import { Navegacion } from "./components/UI/Navegacion";
import { EscenaArquitectura } from "./components/UI/EscenaArquitectura";
import { BotonAR } from "./components/UI/BotonAR";

import "./App.css";

const store = createXRStore();

function App() {
  const [modeloActual, setModeloActual] = useState("casa");

  return (
    <div className="app-container">
      {/* Pasamos el estado y la función de actualización como props */}
      <Navegacion modeloActual={modeloActual} setModeloActual={setModeloActual} />

      <BotonAR store={store} />

      <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]} camera={{ position: [5, 5, 5] }}>
        <XRComponent store={store}>
          <ambientLight intensity={0.5} />
          <EscenaArquitectura modeloActual={modeloActual} />
          <OrbitControls makeDefault key={modeloActual} />
        </XRComponent>
      </Canvas>
    </div>
  );
}

export default App;
