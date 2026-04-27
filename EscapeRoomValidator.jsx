import React, { useState, useEffect } from 'react';

// Datos nivel: 1ro Secundaria (DECO Avanzado + Temática Anime) - Pensado para grupos de 5
const PUERTAS_DATA = {
  1: {
    adivinanza: "Caza sin boca y se mueve sin patas. Un láser rojo en su vientre guía su camino en la oscuridad de su pequeña alfombra. El gremio lo usa para apuntar.",
    respuestas: ["raton", "mouse"],
    problemaMate: "[MISIÓN DE INFILTRACIÓN] Un escuadrón ninja debe cruzar un campo minado. El líder nota que la cantidad de trampas desactivadas excede en 12 a las trampas activas. Si el quíntuple de las activas equivale al triple de las desactivadas, ¿cuántas trampas había en total en el campo?",
    codigo: "48"
  },
  2: {
    adivinanza: "Un ejército de más de 100 soldados, todos con un símbolo único, dispuestos en filas perfectas. Si presionas a su comandante 'Enter', la orden mágica se ejecuta.",
    respuestas: ["teclado"],
    problemaMate: "[DEFENSA DEL MECHA] El escudo de energía de un mecha es un rectángulo de 100 m² de área. Si en plena batalla su largo aumenta en un 20% y su ancho disminuye en un 20%, el área total sufre una alteración. ¿Cuál es la nueva área del escudo en m²?",
    codigo: "96"
  },
  3: {
    adivinanza: "Un portal oscuro que despierta con energía eléctrica. No tiene ojos, pero te muestra miles de mundos en alta resolución si sabes cómo encender su núcleo.",
    respuestas: ["pantalla", "monitor"],
    problemaMate: "[EL DESPERTAR DEL KI] Al iniciar un torneo, los niveles de ki de Goku y Vegeta están en una relación de 5 a 3. Durante el combate, Goku eleva su ki en 400 y Vegeta en 600, logrando así igualar sus poderes. ¿Cuál era el nivel de ki inicial de Vegeta?",
    codigo: "300"
  },
  4: {
    adivinanza: "El núcleo de la bestia de metal. Ruge con ventiladores cuando su poder de procesamiento de maná alcanza el límite. Aquí yace el verdadero cerebro de la operación.",
    respuestas: ["cpu", "procesador", "torre", "gabinete"],
    problemaMate: "[ACADEMIA DE MAGIA] En un gremio, 1/3 de los magos domina el fuego, 1/4 domina el agua, y los 25 magos restantes dominan el rayo. Si los maestros representan exactamente el 10% del total de magos en el gremio, ¿cuántos maestros hay?",
    codigo: "6"
  },
  5: {
    adivinanza: "El gran sello de madera y metal. Custodia reliquias olvidadas, cables y componentes antiguos. Solo revela sus secretos a quienes no temen al polvo de las eras.",
    respuestas: ["armario", "casillero", "estante", "mueble"],
    problemaMate: "[RANGO DE CAZADOR] Una bóveda ninja requiere una contraseña. Esta clave es el menor número posible de shurikens tal que: si los agrupas de 4 en 4, de 5 en 5, o de 6 en 6, siempre te sobra 1. Pero si los agrupas de 7 en 7, no sobra ninguno. (Ayuda: Usa el MCM).",
    codigo: "301"
  },
  6: {
    adivinanza: "Sus pequeñas antenas canalizan el ki invisible del mundo. Si sus luces verdes parpadean, hay paz; si se apagan, todos en el aula gritan por la conexión perdida.",
    respuestas: ["wifi", "wi-fi", "internet", "red", "router", "modem"],
    problemaMate: "[VELOCIDAD RELÁMPAGO] Killua y Gon entrenan en una pista circular de 3600 metros. Killua corre a 15 m/s y Gon a 9 m/s. Si parten al mismo tiempo desde el mismo punto, pero en direcciones opuestas, ¿cuántos segundos tardarán en encontrarse por segunda vez?",
    codigo: "300"
  },
  7: {
    adivinanza: "Consume hojas en blanco como tributo y sangre de colores como combustible. A cambio, plasma tus memorias y pergaminos digitales en el plano físico.",
    respuestas: ["impresora"],
    problemaMate: "[LA AMENAZA COLOSAL] El escuadrón captura a un titán cuya altura es 'X' metros. Al resolver el código de su nuca descubren esto: Si al doble de (X + 5) lo divides entre 3, y a eso le restas 2, obtienes la raíz cuadrada de 64. ¿Cuánto mide el titán?",
    codigo: "10"
  },
  8: {
    adivinanza: "Dos escudos acolchados para tus oídos. No te protegen de espadazos, sino que te aíslan del ruido exterior para encerrarte en tu propio universo sonoro.",
    respuestas: ["audifonos", "auriculares", "cascos"],
    problemaMate: "[TÉCNICA DE RESPIRACIÓN] Tanjiro domina una técnica aumentando su esfuerzo diario en progresión aritmética. El día 1 entrena 2 horas; el día 2, 5 horas; el día 3, 8 horas... y así sucesivamente. ¿Cuántas horas EN TOTAL habrá entrenado luego de completar sus primeros 10 días?",
    codigo: "155"
  },
  9: {
    adivinanza: "Soporta el peso de toda la batalla sin quejarse. Tiene cuatro pilares firmes y sobre su superficie descansa el guerrero, su portal y sus herramientas de hackeo.",
    respuestas: ["mesa", "escritorio", "carpeta"],
    problemaMate: "[JUTSU DE ILUSIÓN] Para romper el Genjutsu debes usar el razonamiento inductivo. Halla la suma de las cifras del resultado de elevar al cuadrado un número formado por diez cifras '3'. Es decir: (333,333,3333)².",
    codigo: "90"
  },
  10: {
    adivinanza: "La biblioteca infinita en la palma de tu mano. No tiene páginas de papel, pero en su oscuro interior guarda terabytes de recuerdos, episodios y archivos secretos.",
    respuestas: ["disco duro", "disco", "disco solido", "ssd", "hdd", "usb", "memoria", "pendrive"],
    problemaMate: "[ALQUIMIA EQUIVALENTE] En el mercado de Amestris: 3 onzas de plata cuestan lo mismo que 5 onzas de cobre. Además, 2 onzas de cobre valen lo mismo que 3 onzas de hierro. Si quieres cambiar 10 onzas de hierro, ¿cuántas onzas de plata exactas te darán?",
    codigo: "4"
  }
};

const normalizarTexto = (texto) => {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

export default function EscapeRoomTerminal() {
  const [ordenPuertas, setOrdenPuertas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [inputCodigo, setInputCodigo] = useState('');
  const [mostrarPista, setMostrarPista] = useState(false);
  const [mensajeError, setMensajeError] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Estados del modal de adivinanza
  const [adivinanzaResuelta, setAdivinanzaResuelta] = useState(false);
  const [inputAdivinanza, setInputAdivinanza] = useState('');
  const [errorAdivinanza, setErrorAdivinanza] = useState(false);

  // Estados para animaciones UI/UX
  const [animandoPuerta, setAnimandoPuerta] = useState(false); // Transición de la puerta principal
  const [desencriptando, setDesencriptando] = useState(false); // Transición al acertar adivinanza

  useEffect(() => {
    const puertas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = puertas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puertas[i], puertas[j]] = [puertas[j], puertas[i]];
    }
    setOrdenPuertas(puertas);
  }, []);

  if (ordenPuertas.length === 0) return null;

  if (juegoTerminado) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-6 selection:bg-green-900">
        <div className="text-center animate-pulse border-4 border-green-500 p-8 md:p-12 shadow-[0_0_40px_rgba(34,197,94,0.6)] bg-green-900/20 backdrop-blur-sm rounded-lg transition-all duration-1000 transform scale-100">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">¡SISTEMA SUPERADO!</h1>
          <p className="text-xl md:text-3xl uppercase tracking-widest text-green-300">
            Felicidades, lograron descifrar todos los enigmas y escapar del aula de cómputo.
          </p>
          <div className="mt-8 text-7xl animate-bounce">🔓</div>
        </div>
      </div>
    );
  }

  const puertaActual = ordenPuertas[indiceActual];
  const datosActuales = PUERTAS_DATA[puertaActual];

  const validarCodigo = (e) => {
    e.preventDefault();
    if (animandoPuerta) return; // Previene doble submit durante animación

    if (inputCodigo.trim() === datosActuales.codigo) {
      setMensajeError(false);
      setAnimandoPuerta(true); // Inicia animación de cambio de puerta

      // Retraso de 1.2 segundos para la animación antes de cambiar el índice
      setTimeout(() => {
        setInputCodigo('');
        setMostrarPista(false);
        setAdivinanzaResuelta(false);
        setInputAdivinanza('');

        if (indiceActual + 1 >= ordenPuertas.length) {
          setJuegoTerminado(true);
        } else {
          setIndiceActual(indiceActual + 1);
        }
        setAnimandoPuerta(false); // Termina la animación y entra la nueva puerta
      }, 1200);

    } else {
      setMensajeError(true);
      setInputCodigo('');
      setTimeout(() => setMensajeError(false), 2000);
    }
  };

  const validarAdivinanza = (e) => {
    e.preventDefault();
    if (desencriptando) return; // Bloquear si ya está animando

    const intento = normalizarTexto(inputAdivinanza);

    if (datosActuales.respuestas.includes(intento)) {
      setErrorAdivinanza(false);
      setDesencriptando(true); // Iniciar animación hacker

      // Simula tiempo de "desencriptación" de 1.5s
      setTimeout(() => {
        setDesencriptando(false);
        setAdivinanzaResuelta(true);
      }, 1500);

    } else {
      setErrorAdivinanza(true);
      setInputAdivinanza('');
      setTimeout(() => setErrorAdivinanza(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Patrón de fondo estilo matrix muy sutil */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 via-transparent to-transparent pointer-events-none"></div>

      {/* Contenedor Principal (Con animación al cambiar de puerta) */}
      <div className={`w-full max-w-md border-4 border-green-500 p-8 bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-700 ease-in-out transform relative
        ${animandoPuerta ? 'opacity-0 scale-95 translate-y-8 blur-sm pointer-events-none' : 'opacity-100 scale-100 translate-y-0 blur-none'}
      `}>

        {/* Capa sobrepuesta durante la animación de puerta */}
        {animandoPuerta && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
            <h2 className="text-2xl text-green-500 font-bold animate-pulse text-center">
              [ DESBLOQUEANDO... ]
            </h2>
          </div>
        )}

        {/* Cabecera de Progreso */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-green-500/50 pb-4">
          <span className="text-lg font-semibold text-green-300">PROGRESO: {indiceActual + 1}/10</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm">ONLINE</span>
          </div>
        </div>

        {/* Puerta Actual */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-wider">PUERTA {puertaActual}</h2>
          <p className="text-sm text-green-400/80 uppercase tracking-widest">Requiere Código Numérico</p>
        </div>

        {/* Formulario de Ingreso Principal */}
        <form onSubmit={validarCodigo} className="flex flex-col gap-4">
          <input
            type="text"
            value={inputCodigo}
            onChange={(e) => setInputCodigo(e.target.value)}
            disabled={animandoPuerta}
            className="w-full bg-black border-2 border-green-500 text-green-400 text-center text-4xl p-4 focus:outline-none focus:border-green-300 focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all rounded-sm"
            placeholder="****"
            autoFocus={!mostrarPista}
          />

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setMostrarPista(true)}
              className="flex-1 bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] py-3 font-bold transition-all duration-300 text-lg rounded-sm"
            >
              [ HACKEAR ]
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-black hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] py-3 font-bold transition-all duration-300 text-lg rounded-sm"
            >
              EJECUTAR
            </button>
          </div>
        </form>

        {/* Mensaje de Error Código */}
        {mensajeError && (
          <div className="mt-6 text-red-500 text-center font-bold animate-shake text-xl bg-red-900/20 py-2 border border-red-500/50">
            [!] ACCESO DENEGADO [!]
          </div>
        )}
      </div>

      {/* Modal de Adivinanza / Problema Matemático */}
      {mostrarPista && (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className={`max-w-md w-full border-2 ${adivinanzaResuelta ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'} bg-black p-8 relative overflow-hidden transition-all duration-500`}>

            {/* Capa de animación "Desencriptando" */}
            {desencriptando && (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-10 border-4 border-green-500">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl text-green-500 font-bold animate-pulse">DESENCRIPTANDO...</h3>
                <p className="text-green-400 mt-2 text-sm">Validando parámetros lógicos</p>
              </div>
            )}

            {!adivinanzaResuelta ? (
              // FASE 1: Adivinanza (Estado Inicial)
              <div className={desencriptando ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                <h3 className="text-2xl text-amber-500 mb-6 font-bold text-center border-b border-amber-500/50 pb-3 tracking-widest">
                  FIREWALL DETECTADO
                </h3>
                <p className="text-amber-100 text-lg leading-relaxed mb-8 text-center italic bg-amber-900/20 p-4 rounded-sm border-l-4 border-amber-500">
                  "{datosActuales.adivinanza}"
                </p>

                <form onSubmit={validarAdivinanza} className="flex flex-col gap-5">
                  <input
                    type="text"
                    value={inputAdivinanza}
                    onChange={(e) => setInputAdivinanza(e.target.value)}
                    className="w-full bg-black border border-amber-500 text-amber-400 text-center text-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    placeholder="Escribe tu respuesta..."
                    autoFocus
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setMostrarPista(false)}
                      className="w-1/3 border border-red-500/80 text-red-500 py-2 font-bold hover:bg-red-500 hover:text-black transition-all duration-300"
                    >
                      ABORTAR
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-amber-600 text-black py-2 font-bold hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all duration-300"
                    >
                      DESCIFRAR
                    </button>
                  </div>
                </form>

                {errorAdivinanza && (
                  <div className="mt-5 text-red-500 text-center font-bold animate-bounce bg-red-900/30 py-2">
                    DATO INVÁLIDO
                  </div>
                )}
              </div>
            ) : (
              // FASE 2: Problema Matemático (Desbloqueado)
              <div className="animate-[fadeIn_0.8s_ease-out]">
                <h3 className="text-2xl text-cyan-400 mb-4 font-bold text-center border-b border-cyan-500/50 pb-3 tracking-widest">
                  ¡VULNERABILIDAD HALLADA!
                </h3>
                <div className="text-cyan-100 text-lg leading-relaxed mb-8">
                  <p className="mb-4 text-center text-sm text-cyan-300/80">Has encontrado el dispositivo correcto. Resuelve este algoritmo para obtener el código maestro:</p>
                  <div className="bg-cyan-950/40 p-5 border border-cyan-500/30 rounded-sm shadow-inner">
                    <span className="font-bold text-white text-xl block text-center">
                      {datosActuales.problemaMate}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMostrarPista(false)}
                  className="w-full bg-cyan-600 text-black py-3 font-bold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] text-lg transition-all duration-300 rounded-sm uppercase tracking-widest"
                >
                  VOLVER A LA TERMINAL
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Definición de animaciones customizadas en Tailwind */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}} />
    </div>
  );
}