import { useState, useEffect } from "react";

function App() {
  const [scene, setScene] = useState("inicio");
  const [audio] = useState(() => new Audio("/terror-drome.mp3"));
  const [effect] = useState(() => new Audio("/click.mp3"));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {
      console.log("El navegador bloqueó el autoplay, se activará en el primer clic.");
    });
  }, [audio]);

  const changeScene = (next) => {
    setScene(next);
    try {
      effect.currentTime = 0;
      effect.play();
    } catch (e) {
      // Si el navegador bloquea el audio, lo ignoramos y seguimos.
      console.log("No se pudo reproducir el efecto de sonido:", e);
    }
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    color: "#e0e0e0",
    fontFamily: "Orbitron, Arial, sans-serif",
    padding: "30px",
    textAlign: "center",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #ff00cc, #3333ff)",
    color: "#fff",
    transition: "transform 0.2s",
  };

  const Scene = ({ title, text, options = [], image }) => (
    <div style={containerStyle}>
      <h1 style={{ color: "#00ffff" }}>{title}</h1>
      {image && (
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "600px", margin: "20px auto", borderRadius: "8px" }}
        />
      )}
      <p style={{ maxWidth: "600px", margin: "20px auto" }}>{text}</p>
      {options.map((opt, i) => (
        <button
          key={i}
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => changeScene(opt.next)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  // Escenas principales
  if (scene === "inicio")
    return (
      <Scene
        title="🌌 Umbra"
        text="Neo‑Buenos Aires, año 2087. La ciudad respira humo y neón."
        image="/images/City Neon.jpg"
        options={[
          { label: "Explorar la ciudad", next: "explorar" },
          { label: "Buscar refugio", next: "refugio" },
        ]}
      />
    );

  if (scene === "explorar")
    return (
      <Scene
        title="Explorando la ciudad"
        text="Las avenidas están llenas de drones patrullando. Un androide misterioso se acerca."
        image="/images/Drones.jpg"
        options={[
          { label: "Hablar con el androide", next: "androide" },
          { label: "Entrar a un bar clandestino", next: "bar" },
          { label: "Ignorarlo y seguir", next: "ignorar" },
        ]}
      />
    );

  if (scene === "bar")
    return (
      <Scene
        title="Bar clandestino"
        text="El humo de cigarrillos electrónicos y luces de neón llenan el lugar. Un hacker te ofrece acceso a datos prohibidos."
        image="/images/Bar.jpg"
        options={[
          { label: "Aceptar la oferta", next: "finalEsperanza" },
          { label: "Rechazar y salir", next: "explorar" },
        ]}
      />
    );

  if (scene === "refugio")
    return (
      <Scene
        title="Refugio"
        text="Entrás en una estación abandonada del subte. Oís voces en un mercado clandestino cercano."
        image="/images/Refugio.jpg"
        options={[
          { label: "Acercarte al mercado", next: "mercado" },
          { label: "Explorar túneles oscuros", next: "tuneles" },
          { label: "Esconderte en la oscuridad", next: "comunidad" },
        ]}
      />
    );

  if (scene === "tuneles")
    return (
      <Scene
        title="Túneles oscuros"
        text="Los túneles del subte parecen interminables. Algo se mueve en la oscuridad."
        image="/images/Tuneles.jpg"
        options={[
          { label: "Seguir adelante", next: "finalOscuro" },
          { label: "Volver al refugio", next: "refugio" },
        ]}
      />
    );

  if (scene === "androide")
    return (
      <Scene
        title="Encuentro con el androide"
        text="El androide te observa con ojos brillantes. Te ofrece ayuda, pero no sabes si confiar."
        image="/images/Androide.jpg"
        options={[
          { label: "Confiar en él", next: "finalSorpresa" },
          { label: "Desconfiar", next: "finalTraicion" },
        ]}
      />
    );

  if (scene === "ignorar")
    return (
      <Scene
        title="Ignoras al androide"
        text="El androide se aleja. Un dron te sigue desde las alturas."
        image="/images/Ignorar.jpg"
        options={[
          { label: "Escapar corriendo", next: "finalSupervivencia" },
          { label: "Dejarte atrapar", next: "finalOscuro" },
        ]}
      />
    );

  if (scene === "mercado")
    return (
      <Scene
        title="Mercado clandestino"
        text="El mercado vibra con intercambios ilegales. Te ofrecen armas o información."
        image="/images/Mercado.jpg"
        options={[
          { label: "Comprar un arma", next: "mercadoArma" },
          { label: "Comprar información", next: "mercadoInfo" },
        ]}
      />
    );

  if (scene === "mercadoArma")
    return (
      <Scene
        title="Arma adquirida"
        text="Con el arma en mano, te sentís más seguro."
        image="/images/Arma.jpg"
        options={[{ label: "Unirte a la rebelión", next: "finalRebelde" }]}
      />
    );

  if (scene === "mercadoInfo")
    return (
      <Scene
        title="Información adquirida"
        text="Los datos revelan secretos de las corporaciones."
        image="/images/Info.jpg"
        options={[{ label: "Compartir con la resistencia", next: "finalEsperanza" }]}
      />
    );

  // Finales con reinicio
  if (scene === "finalRebelde")
    return (
      <Scene
        title="Final Rebelde"
        text="Te unís a la rebelión y luchás contra las corporaciones."
        image="/images/FinalRebelde.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "finalOscuro")
    return (
      <Scene
        title="Final Oscuro"
        text="Los drones te capturan. La ciudad sigue bajo control."
        image="/images/FinalOscuro.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "finalSupervivencia")
    return (
      <Scene
        title="Final Supervivencia"
        text="Lográs escapar con vida, pero el futuro sigue incierto."
        image="/images/FinalSupervivencia.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "finalEsperanza")
    return (
      <Scene
        title="Final Esperanza"
        text="La resistencia gana fuerza gracias a tu ayuda."
        image="/images/FinalEsperanza.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "finalTraicion")
    return (
      <Scene
        title="Final Traición"
        text="El androide te entrega a las corporaciones."
        image="/images/FinalTraicion.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "finalSorpresa")
    return (
      <Scene
        title="Final Sorpresa"
        text="El androide te salva y se une a tu causa."
        image="/images/FinalSorpresa.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  if (scene === "comunidad")
    return (
      <Scene
        title="Final Comunidad"
        text="Encontrás un grupo de sobrevivientes que te aceptan."
        image="/images/FinalComunidad.jpg"
        options={[{ label: "Volver al inicio", next: "inicio" }]}
      />
    );

  // Fallback por si algo inesperado ocurre
  return (
    <Scene
      title="Error"
      text="Algo raro pasó. Volvemos al inicio."
      image="/images/City Neon.jpg"
      options={[{ label: "Volver al inicio", next: "inicio" }]}
    />
  );
}

export default App;
