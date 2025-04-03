// import { img } from 'framer-motion/client';
import { useDarkMode } from "../../services/darkModeContext";

// export default function  DarkModeToggle  () {
//   const { isDarkMode, setIsDarkMode } = useDarkMode(); // Utilisation du contexte pour accéder à l'état et à la fonction de mise à jour

//   return (
//     <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
//       {isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
//     </button>
//   );
// };
// import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
      className="dark-mode-toggle"
    >
      {isDarkMode ? (
        <img src="/sun.svg" alt="jour" />
      ) : (
        <img src="/moon.svg" alt="nuit" />
      )}
    </button>
  );
}
