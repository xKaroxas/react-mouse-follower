import { useEffect, useState } from "react";

const FollowMouse = () => {
 const [enabled, setEnabled] = useState(false);
 const [position, setPosition] = useState({ x: 0, y: 0 });

 // pointer move
 useEffect(() => {
  console.log("Efecto", { enabled });

  const handleMove = (event) => {
   const { clientX, clientY } = event;
   console.log("HandleMove", { clientX, clientY });
   setPosition({ x: clientX, y: clientY });
  };

  if (enabled) {
   window.addEventListener("pointermove", handleMove);
  }

  // cleanup
  // -> cuando el componente se desmonta
  // -> cuando cambian las dependencias, antes de ejecutar
  //    el efecto de nuevo.
  return () => {
   // cleanup method
   console.log("Cleanup");
   window.removeEventListener("pointermove", handleMove);
  };
 }, [enabled]);

 // [] -> solo se ejecuta una vez cuandose monta el componente
 // [enabled] -> seejecuta cuandose cambia enabled y cuando se monta el componente
 // undefined -> se ejecuta cada vez que se renderiza un componente

 // change body className
 useEffect(() => {
  document.body.classList.toggle("no-cursor", !enabled);
  return () => {
   document.body.classList.remove("no-cursor");
  };
 }, [enabled]);

 return (
  <>
   <div
    style={{
     position: "absolute",
     backgroundColor: "#09f",
     border: "3px, solid #fff",
     borderRadius: "50%",
     opacity: 0.8,
     pointerEvents: "none",
     left: -20,
     top: -20,
     width: 40,
     height: 40,
     transform: `translate(${position.x}px, ${position.y}px)`,
    }}
   />
   <button onClick={() => setEnabled(!enabled)}>
    {enabled ? "Desactivar" : "Activar"}
   </button>
  </>
 );
};

function App() {
 return (
  <main>
   <FollowMouse />
  </main>
 );
}

export default App;
