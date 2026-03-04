import { useState, Fragment } from "react";

const MODELOS = [
  { id: "casa", modulo: "1", nombre: "La Casa" },
  { id: "columna", modulo: "2", nombre: "Columnas" },
  { id: "museo", modulo: "3", nombre: "Museo" },
];

export function Navegacion({ modeloActual, setModeloActual }) {
  const [abierto, setAbierto] = useState(true);

  return (
    <>
      {/* Botón para abrir/cerrar (siempre visible) */}
      <button className="toggle-menu" onClick={() => setAbierto(!abierto)} style={{ left: abierto ? "225px" : "20px" }}>
        {abierto ? "✕" : "☰"}
      </button>

      <nav className={`sidebar ${abierto ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h3>Arquitectura AR</h3>
        </div>
        <div className="menu-items">
          {MODELOS.map((m) => (
            <Fragment key={m.id}>
              <h3 className="menu-module">Módulo {m.modulo}</h3>
              <button onClick={() => setModeloActual(m.id)} className={modeloActual === m.id ? "btn-active" : "btn-inactive"}>
                {m.nombre}
              </button>
              <hr />
            </Fragment>
          ))}
        </div>
      </nav>
    </>
  );
}
