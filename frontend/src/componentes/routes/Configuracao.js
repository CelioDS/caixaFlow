import style from "./Configuracao.module.css";
import ChangeColor from "../function/ChangeColor";
import FontSize from "../function/FontSize";
import { useEffect } from "react";

export default function Configuracao() {
  useEffect(() => {
    document.title = "Configuracao - fluxo de caixa";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className={style.main}>
      <h1>Configuracao</h1>
      <br />
      <FontSize />
      <ChangeColor />
    </main>
  );
}
