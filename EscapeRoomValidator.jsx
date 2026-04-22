import React, { useState, useEffect } from 'react';

// Aquí están configuradas las 10 puertas con sus códigos y pistas (Nivel 6to Primaria)
const PUERTAS_DATA = {
  1: {
    codigo: "7",
    pista: "Anomalía 01: El fallo de tipeo se esconde bajo las teclas de control en la primera fila."
  },
  2: {
    codigo: "1080",
    pista: "Anomalía 02: Revisa la parte posterior del portal visual (monitor) en la segunda escuadra."
  },
  3: {
    codigo: "255",
    pista: "Anomalía 03: El bloque de memoria física (armario) tiene un archivo corrupto en sus repisas interiores."
  },
  4: {
    codigo: "27",
    pista: "Anomalía 04: Detectamos un error de fricción bajo la alfombrilla del ratón en la tercera órbita."
  },
  5: {
    codigo: "10",
    pista: "Anomalía 05: El trono del Administrador (silla del profesor) alberga un código de reinicio en su base."
  },
  6: {
    codigo: "55",
    pista: "Anomalía 06: La torre de procesamiento (CPU) de la cuarta fila expulsa secretos por su rejilla de ventilación."
  },
  7: {
    codigo: "26",
    pista: "Anomalía 07: Un fragmento de código quedó atrapado en el estrecho vacío entre dos monitores que se tocan."
  },
  8: {
    codigo: "400",
    pista: "Anomalía 08: Sumérgete bajo el escritorio central del Host. El parche de seguridad está adherido a la madera."
  },
  9: {
    codigo: "44",
    pista: "Anomalía 09: El firewall físico ha sido comprometido. Mira en lo más alto del marco de la puerta de entrada."
  },
  10: {
    codigo: "49",
    pista: "Anomalía 10: Un dispositivo señalador inactivo (mouse de repuesto) guarda la última clave de restauración."
  }
};

export default function EscapeRoomTerminal() {
  const [ordenPuertas, setOrdenPuertas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [inputCodigo, setInputCodigo] = useState('');
  const [mostrarPista, setMostrarPista] = useState(false);
  const [mensajeError, setMensajeError] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Al cargar la app, desordena las 10 puertas aleatoriamente
  useEffect(() => {
    const puertas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = puertas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puertas[i], puertas[j]] = [puertas[j], puertas[i]];
    }
    setOrdenPuertas(puertas);
  }, []);

  if (ordenPuertas.length === 0) return null;

  // Pantalla de Victoria
  if (juegoTerminado) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-6 selection:bg-green-900">
        <div className="text-center animate-pulse border-4 border-green-500 p-8 md:p-12 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">¡FELICIDADES!</h1>
          <p className="text-xl md:text-3xl uppercase tracking-widest">
            Ganaron felicidades por ingresar a las puertas y escapar.
          </p>
          <div className="mt-8 text-6xl">🔓</div>
        </div>
      </div>
    );
  }

  const puertaActual = ordenPuertas[indiceActual];
  const datosActuales = PUERTAS_DATA[puertaActual];

  const validarCodigo = (e) => {
    e.preventDefault();
    if (inputCodigo.trim() === datosActuales.codigo) {
      setMensajeError(false);
      setInputCodigo('');
      setMostrarPista(false);

      if (indiceActual + 1 >= ordenPuertas.length) {
        setJuegoTerminado(true);
      } else {
        setIndiceActual(indiceActual + 1);
      }
    } else {
      setMensajeError(true);
      setInputCodigo('');
      setTimeout(() => setMensajeError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4 relative">

      {/* Contenedor Principal */}
      <div className="w-full max-w-md border-4 border-green-500 p-8 bg-gray-900 bg-opacity-50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">

        {/* Cabecera de Progreso */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-green-500 pb-4">
          <span className="text-lg">PROGRESO: {indiceActual + 1}/10</span>
          <span className="text-sm animate-pulse">SISTEMA ACTIVO</span>
        </div>

        {/* Puerta Actual */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">PUERTA {puertaActual}</h2>
          <p className="text-sm text-green-300">INGRESA EL CÓDIGO PARA AVANZAR</p>
        </div>

        {/* Formulario de Ingreso */}
        <form onSubmit={validarCodigo} className="flex flex-col gap-4">
          <input
            type="text"
            value={inputCodigo}
            onChange={(e) => setInputCodigo(e.target.value)}
            className="w-full bg-black border-2 border-green-500 text-green-400 text-center text-3xl p-4 focus:outline-none focus:border-green-300 focus:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            placeholder="****"
            autoFocus
          />

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setMostrarPista(true)}
              className="flex-1 bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-3 font-bold transition-colors text-lg"
            >
              [ PISTA ]
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 text-black hover:bg-green-400 py-3 font-bold transition-colors text-lg"
            >
              VALIDAR
            </button>
          </div>
        </form>

        {/* Mensaje de Error */}
        {mensajeError && (
          <div className="mt-6 text-red-500 text-center font-bold animate-bounce text-xl">
            ERROR: ACCESO DENEGADO
          </div>
        )}
      </div>

      {/* Modal de Pista */}
      {mostrarPista && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full border-4 border-amber-500 bg-black p-6">
            <h3 className="text-2xl text-amber-500 mb-4 font-bold text-center border-b-2 border-amber-500 pb-2">
              UBICACIÓN DETECTADA
            </h3>
            <p className="text-amber-400 text-lg leading-relaxed mb-8 text-center">
              "{datosActuales.pista}"
            </p>
            <button
              onClick={() => setMostrarPista(false)}
              className="w-full bg-amber-500 text-black py-3 font-bold hover:bg-amber-400 text-lg"
            >
              CERRAR Y BUSCAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}