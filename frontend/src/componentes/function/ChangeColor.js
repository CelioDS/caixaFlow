import { useRef, useState } from "react";

export default function ChangeColor() {
  const ref = useRef();
  const [caixa, setCaixa] = useState(localStorage.getItem("caixa") || "#0099ff");
  const [entrada, setEntrada] = useState(localStorage.getItem("entrada") || "#008000");
  const [saida, setSaida] = useState(localStorage.getItem("saida") || "#800303fb");

  function handleColor(event) {
    const { name, value } = event.target;

    // Salvando a cor no localStorage
    localStorage.setItem(name, value);

    // Atualizando o estado correspondente
    switch (name) {
      case "caixa":
        setCaixa(value);
        break;
      case "entrada":
        setEntrada(value);
        break;
      case "saida":
        setSaida(value);
        break;
      default:
        break;
    }
  }

  return (
    <form ref={ref}>
      <div>
        <label htmlFor="caixa">caixa</label>
        <input
          type="color"
          name="caixa"
          id="caixa"
          value={caixa}
          onChange={handleColor}
        />
      </div>
      <div>
        <label htmlFor="saida">saida</label>
        <input
          type="color"
          name="saida"
          id="saida"
          value={saida}
          onChange={handleColor}
        />
      </div>
      <div>
        <label htmlFor="entrada">entrada</label>
        <input
          type="color"
          name="entrada"
          id="entrada"
          value={entrada}
          onChange={handleColor}
        />
      </div>
    </form>
  );
}
