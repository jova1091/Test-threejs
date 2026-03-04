import React, { useEffect, useState } from "react";

export function BotonAR({ store }) {
  // Inicializamos el estado leyendo directamente del store para evitar el warning de "cascading renders"
  const [isSupported, setIsSupported] = useState(() => (store && typeof store.getState === "function" ? store.getState().isSupported : false));

  useEffect(() => {
    // Verificamos si store existe y tiene el método subscribe
    if (!store || typeof store.subscribe !== "function") return;

    // Nos suscribimos a los cambios del store de forma manual (API vanilla de Zustand)
    const unsub = store.subscribe((state) => {
      setIsSupported(state.isSupported);
    });

    return () => unsub();
  }, [store]);

  if (!store) return null;

  return (
    <button
      onClick={() => store.enterAR()}
      disabled={!isSupported} // Deshabilita la interacción nativa
      style={{
        position: "absolute",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000, // Un valor muy alto para asegurar que se vea sobre el Canvas
        padding: "12px 24px",
        backgroundColor: isSupported ? "white" : "#e0e0e0", // Gris si está deshabilitado
        color: isSupported ? "black" : "#a0a0a0",
        border: "none",
        borderRadius: "30px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        pointerEvents: "auto", // Asegura que el botón sea clickeable
        opacity: isSupported ? 1 : 0.6,
        cursor: isSupported ? "pointer" : "not-allowed",
      }}
    >
      {isSupported ? "Entrar en AR" : "AR no soportado"}
    </button>
  );
}
