import React, { useState, useEffect } from 'react';

// ==========================================
// CONFIGURACIÓN DE CÓDIGOS DE ESCAPE ROOM
// Puedes cambiar estos valores fácilmente. 
// Las claves representan el número de nivel.
// ==========================================
const LEVEL_CODES = {
  1: "600",
  2: "270",
  3: "12",
  4: "60",
  5: "40",
  6: "3",
  7: "80",
  8: "210",
  9: "60",
  10: "100"
};

const TOTAL_LEVELS = Object.keys(LEVEL_CODES).length;

const EscapeRoomValidator = () => {
  const [level, setLevel] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [gameWon, setGameWon] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Importar fuente VT323 de Google Fonts dinámicamente para el estilo retro
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=VT323&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Limpieza al desmontar
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleValidation = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isValidating) return;

    setIsValidating(true);
    setFeedback({ message: ">>> AUTENTICANDO CON EL SISTEMA...", type: "validating" });

    // Simular retraso para hacer la validación más emocionante y dinámica
    setTimeout(() => {
      const currentCode = LEVEL_CODES[level];

      // Normalizar inputs (ignorar mayúsculas, minúsculas y espacios en blanco)
      const normalizedInput = inputValue.trim().toUpperCase().replace(/\s+/g, '');
      const normalizedCode = String(currentCode).toUpperCase().replace(/\s+/g, '');

      if (normalizedInput === normalizedCode) {
        if (level === TOTAL_LEVELS) {
          setFeedback({ message: "CÓDIGO ACEPTADO. DESBLOQUEANDO ACCESO FINAL...", type: "success" });
          setTimeout(() => {
            setGameWon(true);
            setIsValidating(false);
          }, 1500);
        } else {
          setFeedback({ message: `CÓDIGO ACEPTADO. PREPARANDO NIVEL ${level + 1}...`, type: "success" });
          setTimeout(() => {
            setLevel((prev) => prev + 1);
            setInputValue("");
            setFeedback({ message: "", type: "" });
            setIsValidating(false);
          }, 2000);
        }
      } else {
        setFeedback({ message: "ACCESO DENEGADO - CÓDIGO INCORRECTO", type: "error" });
        setInputValue("");
        setTimeout(() => {
          setFeedback({ message: "", type: "" });
          setIsValidating(false);
        }, 2000);
      }
    }, 1200); // 1.2 segundos de animación "validando"
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleValidation();
    }
  };

  // PANTALLA DE VICTORIA (JEFE FINAL DERROTADO)
  if (gameWon) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-950 text-amber-400 p-4"
        style={{ fontFamily: "'VT323', monospace" }}
      >
        <div className="text-center animate-pulse">
          <h1 className="text-6xl md:text-8xl mb-8 tracking-widest drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
            ¡FELICIDADES!
          </h1>
          <h2 className="text-4xl md:text-6xl mb-12">
            GANARON EL JUEGO
          </h2>

          {/* ASCII ART DEL TROFEO */}
          <pre className="text-2xl md:text-3xl text-green-500 mb-8 leading-none drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
            {`
       ___________
      '._==_==_=_.'
      .-\\:      /-.
     | (|:.     |) |
      '-|:.     |-'
        \\::.    /
         '::. .'
           ) (
         _.' '._
        \`"""""""\`
            `}
          </pre>

          <p className="text-3xl md:text-5xl text-cyan-400 animate-bounce drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mt-12">
            [ SISTEMA DESBLOQUEADO ]
          </p>
        </div>
      </div>
    );
  }

  // PANTALLA PRINCIPAL DEL JUEGO
  return (
    <div
      className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4"
      style={{ fontFamily: "'VT323', monospace" }}
    >
      {/* Contenedor Principal tipo Terminal Retro/Arcade */}
      <div className="w-full max-w-2xl border-4 border-green-500 bg-black p-8 md:p-12 relative shadow-[0_0_25px_rgba(34,197,94,0.2)]">

        {/* Adorno superior simulando la barra de consola CRT */}
        <div className="absolute top-0 left-0 w-full border-b-4 border-green-500 bg-green-950 flex px-2 py-1 space-x-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <div className="w-4 h-4 border-2 border-green-500"></div>
          <div className="w-4 h-4 border-2 border-green-500 mr-auto"></div>
          <span className="text-green-500 text-xl leading-none pt-1">SYS.VER.10.x</span>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-green-500 text-4xl md:text-5xl mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
            NIVEL {level} / {TOTAL_LEVELS}
          </h2>

          {/* Zona de Feedback (Mensajes de error o éxito) */}
          <div className="h-8 mb-8 flex items-center justify-center">
            {feedback.message && (
              <p className={`text-3xl md:text-4xl tracking-wider ${feedback.type === 'error'
                  ? 'text-red-500 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_3] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'
                  : feedback.type === 'validating'
                    ? 'text-amber-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                    : 'text-green-400 animate-pulse drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]'
                }`}>
                {feedback.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="INGRESA EL CÓDIGO_"
              className="w-full bg-black border-4 border-cyan-500 text-cyan-400 text-5xl md:text-7xl p-6 text-center uppercase focus:outline-none focus:border-amber-400 focus:text-amber-400 transition-colors placeholder-cyan-900 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-50"
              autoFocus
              disabled={isValidating || feedback.type === 'success'}
            />

            <button
              onClick={handleValidation}
              disabled={isValidating || feedback.type === 'success'}
              className={`w-full uppercase bg-black border-4 text-4xl md:text-5xl p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-widest ${isValidating
                  ? 'border-amber-500 text-amber-500 animate-pulse'
                  : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black active:bg-green-700 active:border-green-700'
                }`}
            >
              {isValidating ? 'VALIDANDO...' : 'VALIDAR'}
            </button>
          </div>

          <div className="mt-8 text-green-800 text-2xl animate-pulse text-left">
            {">"} Esperando input del usuario... <span className="inline-block w-3 h-6 bg-green-500 animate-ping align-middle"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscapeRoomValidator;
