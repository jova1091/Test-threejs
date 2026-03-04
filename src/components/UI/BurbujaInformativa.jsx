// src/components/BurbujaInformativa.jsx
export function BurbujaInformativa({ titulo, texto, alCerrar }) {
  return (
    <div className="content-bubble">
      <h4>{titulo}</h4>
      <p>{texto}</p>
      <button className="button-bubble" onClick={alCerrar}>
        Cerrar
      </button>
    </div>
  );
}
